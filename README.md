# Paima Asset Portal

## Getting Started

1. Install the dependencies by running: `yarn`
2. Create `.env` file (copy from `.env.example` and fill values appropriately)
3. Start the development build by running: `yarn start`
4. Open [localhost:3000](http://localhost:3000) in your browser.

## Production

- Whitelist the production domain in the Alchemy and Blockfrost services for the keys you will be using, and turn on whitelist-only mode so that the keys cannot be abused outside our dApp.

Manually copy the files to the right machine using `rsync`

### Generating contracts ABI (EVM)

Wagmi hooks are generated straight from the contracts source code at `../evm/` (this is configured in `wagmi.config.ts`).
Run `yarn generate` to generate new hooks when contracts are changed.

### Chains support

A common hook `useGetChainType` is used throughout the dApp to differentiate chain type (Cardano and EVM). If you wish to add a different type of chain (eg. Aptos), look there.

EVM chains specifics are defined in the `src/utils/evm/chains` (supported chains and their constants), `src/utils/evm/contracts` (Hololocker contract address) and `src/utils/evm/wagmi` (wagmi providers).
Cardano chain specifics are defined in the `src/utils/cardano/validator` (validator code) and `src/utils/cardano/constants`.
