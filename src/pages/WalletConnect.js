// src/pages/WalletConnectAndBalance.js
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './WalletConnect.css'; // Import the CSS file
import Header from "../components/Common/Header";

const WalletConnectAndBalance = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3Instance.eth.getAccounts();
        setWeb3(web3Instance);
        setAccount(accounts[0]);
        localStorage.setItem("walletAddress", accounts[0]);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const disconnectWallet = () => {
    setAccount('');
    setBalance(null);
    localStorage.removeItem("walletAddress");
  };

  useEffect(() => {
    const savedAccount = localStorage.getItem("walletAddress");
    if (savedAccount) {
      setAccount(savedAccount);
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    }
  }, []);

  useEffect(() => {
    const getBalance = async () => {
      try {
        if (web3 && account) {
          const balanceWei = await web3.eth.getBalance(account);
          const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
          setBalance(balanceEth);
        }
      } catch (error) {
        console.error('Failed to fetch balance:', error);
      }
    };

    getBalance();
  }, [web3, account]);

  return (
    <div>
      <Header />
      <div className="wallet-container">
        <div className="btn-container">
          {!account ? (
            <button className="connect-button" onClick={connectWallet}>
              Connect Metamask
            </button>
          ) : (
            <>
              <h3 className="wallet-info">Connected Wallet</h3>
              <p className="wallet-address">Address: {account}</p>
              {balance !== null ? (
                <p className="wallet-balance">Balance: {balance} ETH</p>
              ) : (
                <p className="wallet-loading">Loading balance...</p>
              )}
              <button className="disconnect-button" onClick={disconnectWallet}>
                Disconnect
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletConnectAndBalance;
