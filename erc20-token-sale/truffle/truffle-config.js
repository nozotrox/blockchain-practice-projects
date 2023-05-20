require('dotenv').config({path: "./.env"});
const { MNEMONIC, PROJECT_ID } = process.env;
const MetaMaskAccountIndex = 0;
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  contracts_build_directory: "../client/src/contracts",
  networks: {
    
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },

    ganache_local: {
      provider: () => new HDWalletProvider(MNEMONIC, `http://localhost:7545`, MetaMaskAccountIndex),
      network_id: 5777,
    },
    sepolia: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://mainnet.infura.io/v3/${PROJECT_ID}`, MetaMaskAccountIndex),
      network_id: 11155111,
    },
    
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "^0.6.0",
    }
  },
};
  