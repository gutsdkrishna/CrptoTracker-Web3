import React, { useState } from 'react';
import Web3 from 'web3';
import './TransferToken.css';  // Import the CSS file

const ERC20_ABI= [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "message",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "keyword",
          "type": "string"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "receiver",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "message",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "keyword",
          "type": "string"
        }
      ],
      "name": "addToBlockchain",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllTransactions",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "receiver",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "message",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "keyword",
              "type": "string"
            }
          ],
          "internalType": "struct Transactions.TransferStruct[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },    
    {
      "inputs": [],
      "name": "getTransactionCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  

const TokenTransfer = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTransfer = async (e) => {
    e.preventDefault();
    setError('');
    setTransactionHash('');
    setLoading(true);

    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const tokenAddress = '0x09f7B3B2C818fcE5D54f1426cbFfC61f10C85735'; // Replace with your token contract address
        const contract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
        const accounts = await web3.eth.getAccounts();
        const amountToSend = web3.utils.toWei(amount, 'ether');

        const receipt = await contract.methods
          .addToBlockchain(recipient, amountToSend, 'message', 'keyword')
          .send({ from: accounts[0], value: amountToSend });

        setTransactionHash(receipt.transactionHash);
      } else {
        setError('MetaMask not detected.');
      }
    } catch (err) {
      setError('Transaction failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Transfer Tokens</h2>
      <form onSubmit={handleTransfer} className="form">
        <div className="inputs">
          <label className="label">Recipient Address:</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            required
            className="input"
          />
        </div>
        <div className="inputs">
          <label className="label">Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            required
            className="input"
          />
        </div>
        <div className="btn-container">
          <button
            type="submit"
            disabled={loading}
            className="button"
          >
            {loading ? 'Processing...' : 'Transfer'}
          </button>
        </div>
      </form>

      {transactionHash && (
        <div className="transaction-info">
          <p>Transaction successful!</p>
          <p>
            Transaction Hash:{' '}
            <a
              href={`https://etherscan.io/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transaction-link"
            >
              {transactionHash}
            </a>
          </p>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default TokenTransfer;
