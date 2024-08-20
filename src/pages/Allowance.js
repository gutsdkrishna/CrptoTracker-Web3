import React, { useState } from 'react';
import Web3 from 'web3';

const ERC20_ABI = [
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
    },
    {
        "constant": true,
        "inputs": [
            { "name": "_owner", "type": "address" },
            { "name": "_spender", "type": "address" }
        ],
        "name": "allowance",
        "outputs": [
            { "name": "", "type": "uint256" }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];
const TokenAllowance = () => {
  const [owner, setOwner] = useState('');
  const [spender, setSpender] = useState('');
  const [allowance, setAllowance] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckAllowance = async (e) => {
    e.preventDefault();
    setError('');
    setAllowance('');
    setLoading(true);

    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const tokenAddress = '0x779877A7B0D9E8603169DdbD7836e478b4624789'; // Replace with your token contract address
        const contract = new web3.eth.Contract(ERC20_ABI, tokenAddress);

        const result = await contract.methods.allowance(owner, spender).call();
        setAllowance(web3.utils.fromWei(result, 'ether'));
      } else {
        setError('MetaMask not detected.');
      }
    } catch (err) {
      setError('Error checking allowance: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Check Token Allowance</h2>
      <form onSubmit={handleCheckAllowance} className="form">
        <div className="inputs">
          <label className="label">Owner Address:</label>
          <input
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            placeholder="0x..."
            required
            className="input"
          />
        </div>
        <div className="inputs">
          <label className="label">Spender Address:</label>
          <input
            type="text"
            value={spender}
            onChange={(e) => setSpender(e.target.value)}
            placeholder="0x..."
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
            {loading ? 'Checking...' : 'Check Allowance'}
          </button>
        </div>
      </form>

      {allowance && (
        <div className="transaction-info">
          <p>Allowance: {allowance} tokens</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default TokenAllowance;
