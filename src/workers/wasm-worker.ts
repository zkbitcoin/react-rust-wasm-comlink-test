import {proxy} from "comlink";

function wrapTestExports({test_wasm_function}: { test_wasm_function: any }) {
    return ({}) => {
        const response = test_wasm_function();
        return {
            response,
        };
    };
}

export async function initHandlersTest() {

    const [thread] = await Promise.all([
        (async () => {
            // @ts-ignore
            const thread = await import('../rust/pkg-multicore/wasmlib.js');
            await thread.default();
            return wrapTestExports(thread);
        })(),
    ]);

    return proxy({
        thread,
        supportsThreads: !!thread,
    });
}
