# Akropolis Network Testnet

## For frontend (in root folder)
### Install all dependencies
- ```npm i``` install frontend and contracts dependencies

### To start locally
- ```npm run dev``` for development environment in watch mode
- ```npm run prod``` for production environment in watch mode

### To build locally (see build folder)
- ```npm run build:dev``` for development environment without watch mode
- ```npm run build:prod``` for production environment without watch mode

### To start bundle analyzer
- ```npm run analyze:dev``` for development environment
- ```npm run analyze:prod``` for production environment

### To start test
- ```npm test``` or ```npm t``` for start test, before that you need start network (```npm run ganache-cli```)

## We use
- [x] Drizzle For handles instantiating web3 and contracts, fetching accounts, and keeping all of this data in sync with the blockchain.
- [x] Ox protocol - that enables the peer-to-peer exchange of assets on the Ethereum blockchain.
- [x] Typescript
- [x] React
- [x] Redux
- [x] Redux-saga for side-effects
- [x] Material-UI
