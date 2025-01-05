module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",   // Localhost address
      port: 8545,          // Port Ganache is running on
      network_id: "*",     // Match any network id
    },
  },
  compilers: {
    solc: {
      version: "0.8.20",   // Use the correct Solidity version
    },
  },
};
