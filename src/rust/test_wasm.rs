use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn test_wasm_function() -> String {
    format!("Hello World!")
}
