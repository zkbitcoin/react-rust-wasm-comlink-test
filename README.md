1. rustup install nightly-2022-11-21
2. rustup install rustup component add rust-src --toolchain nightly-2022-11-21-x86_64-apple-darwin
3. curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
4. yarn build:wasm
5. yarn install
6. yarn build
7. yarn start
