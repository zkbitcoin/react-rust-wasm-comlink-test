import { expose } from "comlink";

import {
  initHandlersTest,
} from "./wasm-worker";


const exportsHandlers = {
  initHandlersTest,
};
export type WasmWorker = typeof exportsHandlers ;

expose(exportsHandlers );
