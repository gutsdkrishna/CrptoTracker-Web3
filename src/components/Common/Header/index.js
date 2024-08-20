// src/components/Common/Header/index.js
import React from "react";
import Button from "../Button";
import TemporaryDrawer from "./drawer";
import "./styles.css";
import gradient from "../../../assets/gradient.png";

function Header() {
  return (
    <div className="sidebar">
      <h1 className="logo">
        CryptoPortfolio<span style={{ color: "var(--blue)" }}></span>
      </h1>
      <div className="nav-links">
        <a href="/">
          <p className="nav-link">Home</p>
        </a>
        <a href="/compare">
          <p className="nav-link">Compare</p>
        </a>
        <a href="/watchlist">
          <p className="nav-link">Watchlist</p>
        </a>
        <a href="/walletconnect">
          <p className="nav-link">Wallet Connect</p>
        </a>
        <a href="/transfer">
          <p className="nav-link">Transfer Tokens</p>
        </a>
        <a href="/allowance">
          <p className="nav-link">Allowance</p>
        </a>
        
      </div>
      
    </div>
  );
}

export default Header;
