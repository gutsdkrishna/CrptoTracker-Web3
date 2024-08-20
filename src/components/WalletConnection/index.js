import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './styles.css';

const WalletConnect = () => {
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [tokenBalance, setTokenBalance] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const tokenAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // Replace with your ERC-20 token contract address
    const tokenABI = [
        // Replace with your ERC-20 token contract ABI
[
    {
        "constant": true,
        "inputs": [{"name": "_owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "balance", "type": "uint256"}],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{"name": "", "type": "uint8"}],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [{"name": "", "type": "string"}],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [{"name": "", "type": "string"}],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}],
        "name": "transfer",
        "outputs": [{"name": "", "type": "bool"}],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{"name": "", "type": "uint256"}],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{"name": "_from", "type": "address"}, {"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}],
        "name": "transferFrom",
        "outputs": [{"name": "", "type": "bool"}],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{"name": "_spender", "type": "address"}, {"name": "_value", "type": "uint256"}],
        "name": "approve",
        "outputs": [{"name": "", "type": "bool"}],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{"name": "_owner", "type": "address"}, {"name": "_spender", "type": "address"}],
        "name": "allowance",
        "outputs": [{"name": "remaining", "type": "uint256"}],
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [{"indexed": true, "name": "_owner", "type": "address"}, {"indexed": true, "name": "_spender", "type": "address"}, {"indexed": false, "name": "_value", "type": "uint256"}],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{"indexed": true, "name": "_from", "type": "address"}, {"indexed": true, "name": "_to", "type": "address"}, {"indexed": false, "name": "_value", "type": "uint256"}],
        "name": "Transfer",
        "type": "event"
    }
]
    ];

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                // Request account access
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
                setErrorMessage('');
                fetchBalance(accounts[0]);
                fetchTokenBalance(accounts[0]);
            } catch (error) {
                setErrorMessage('Connection failed. Please try again.');
            }
        } else {
            setErrorMessage('Please install MetaMask to use this feature.');
        }
    };

    const fetchBalance = async (account) => {
        const web3 = new Web3(window.ethereum);
        const balanceWei = await web3.eth.getBalance(account);
        const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
        setBalance(balanceEth);
    };

    const fetchTokenBalance = async (account) => {
        const web3 = new Web3(window.ethereum);
        const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
        const balance = await tokenContract.methods.balanceOf(account).call();
        const decimals = await tokenContract.methods.decimals().call(); // Assuming the token has a decimals method
        const tokenBalance = balance / Math.pow(10, decimals);
        setTokenBalance(tokenBalance);
    };

    const handleAddressInput = (e) => {
        const address = e.target.value;
        setAccount(address);
        setErrorMessage('');
        fetchBalance(address);
        fetchTokenBalance(address);
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <div className="wallet-connect">
            <h2>Connect Wallet</h2>
            <button onClick={connectWallet}>Connect MetaMask</button>
            <p>OR</p>
            <input 
                type="text" 
                placeholder="Enter wallet address" 
                onChange={handleAddressInput} 
            />
            {account && (
                <>
                    <button onClick={togglePopup} style={{ backgroundColor: 'green', color: 'white' }}>Account Connected</button>
                    {showPopup && (
                        <div className="popup">
                            <div className="popup-content">
                                <h3>Account Number</h3>
                                <p>{account}</p>
                                <h3>Balance</h3>
                                <p>{balance} ETH</p>
                                <h3>Token Balance</h3>
                                <p>{tokenBalance} Tokens</p>
                                <button onClick={togglePopup}>Close</button>
                            </div>
                        </div>
                    )}
                </>
            )}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default WalletConnect;
