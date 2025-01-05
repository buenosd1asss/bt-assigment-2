const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        { "internalType": "string", "name": "name", "type": "string" },
        { "internalType": "string", "name": "description", "type": "string" },
        { "internalType": "uint256", "name": "price", "type": "uint256" }
      ],
      "name": "addModel",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{ "internalType": "uint256", "name": "modelId", "type": "uint256" }],
      "name": "buyModel",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "modelCount",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{ "internalType": "uint256", "name": "modelId", "type": "uint256" }],
      "name": "getModel",
      "outputs": [
        { "internalType": "string", "name": "", "type": "string" },
        { "internalType": "string", "name": "", "type": "string" },
        { "internalType": "uint256", "name": "", "type": "uint256" }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  
  export default contractABI;
  