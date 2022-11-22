import {useEffect, useState} from "react";
import init from "./rust/pkg-multicore";
import useComlink from 'react-use-comlink'
import {WasmWorker} from './workers/index'

function App() {

    const {proxy} = useComlink<WasmWorker>(
        () => new Worker(new URL("./workers/index.ts", import.meta.url)),
        [] // used to recreate the worker if it change, defaults to []
    )

    const [state, setState] = useState({
        thread: undefined,
        response: ''
    })

    useEffect(() => {
        init().then(() => {
            (async () => {
                // methods, constructors and setters are async
                await proxy.initHandlersTest().then((r: { thread: any; }) => {
                    setState({...state, thread: r.thread})
                })
            })()
        })
    }, [proxy])

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
