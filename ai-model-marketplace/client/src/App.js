import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import contractABI from './contractABI'; // Import ABI file
import { contractAddress } from './contractAddress'; // Import contract address

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [models, setModels] = useState([]);

  useEffect(() => {
    // Load Web3 and connect to the user's wallet (Metamask)
    const loadWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWeb3(web3Instance);
      } else {
        alert("Please install MetaMask!");
      }
    };

    // Load the contract once Web3 is initialized
    const loadContract = async () => {
      if (web3) {
        const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
        setContract(contractInstance);

        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]); // Use the first account

        // Fetch models
        const totalModels = await contractInstance.methods.modelCount().call();
        const modelsData = [];
        for (let i = 0; i < totalModels; i++) {
          const model = await contractInstance.methods.getModel(i).call();
          modelsData.push(model);
        }
        setModels(modelsData);
      }
    };

    loadWeb3();
    loadContract();
  }, [web3]);

  const addModel = async (name, description, price) => {
    if (contract && account) {
      await contract.methods.addModel(name, description, price).send({ from: account });
      alert("Model added!");
    }
  };

  const buyModel = async (modelId, price) => {
    if (contract && account) {
      await contract.methods.buyModel(modelId).send({ from: account, value: price });
      alert("Model purchased!");
    }
  };

  return (
    <div>
      <h1>AI Model Marketplace</h1>
      <div>
        <h2>Available Models</h2>
        <ul>
          {models.map((model, index) => (
            <li key={index}>
              {model[0]} - {model[1]} - {web3.utils.fromWei(model[2], 'ether')} ETH
              <button onClick={() => buyModel(index, model[2])}>Buy</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Add a new Model</h2>
        <button onClick={() => addModel('Model 1', 'Description 1', web3.utils.toWei('1', 'ether'))}>Add Model 1</button>
      </div>
    </div>
  );
};

export default App;
