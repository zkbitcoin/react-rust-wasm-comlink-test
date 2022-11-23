import {useEffect, useState} from "react";
import init from "./rust/pkg-multicore";
import useComlink from 'react-use-comlink'
import {WasmWorker} from './workers/index'
import {releaseProxy} from "comlink";

function App() {

    const worker = new Worker(new URL("./workers/index.ts", import.meta.url));
    const {proxy} = useComlink<WasmWorker>(
        () => worker,
        [] // used to recreate the worker if it change, defaults to []
    )

    const [state, setState] = useState({
        thread: undefined,
        response: ''
    })

    let promise = new Promise( (resolve, reject) => {
        resolve("Promise resolved successfully");
    });

    useEffect(() => {
        init().then(() => {
            (async () => {
                //console.log("calling promise")
                //await promise.then( result => {console.log("promise resolved")})

                // methods, constructors and setters are async
                console.log("calling initHandlersTest()")
                await proxy.initHandlersTest().then((r: { thread: any; }) => {
                    console.log("initHandlersTest() promised returned")
                    setState({...state, thread: r.thread})
                })
            })()
        })
    }, [proxy])

    useEffect(() => {
        return () => {
            console.log("unmount")
            proxy[releaseProxy]();
            worker.terminate();
        }
    }, [])

    const onClick = async () => {
        if (!state.thread) {
            return;
        }
        // @ts-ignore
        const {response} = await state.thread({});
        setState({...state, response: response})
    }

    return (
            <>
                <button onClick={onClick}>run</button>
                Wasm response: {state.response}
            </>
    );
}

export default App;
