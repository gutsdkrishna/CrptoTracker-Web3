import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Coin from "./pages/Coin";
import Compare from "./pages/Compare";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Common/Header";
// import WalletConnection from './components/WalletConnection';
// import React, { useState } from 'react';
// import WatchList from './components/WatchList';
// import HistoricalData from './components/HistoricalData';
// import Allowance from './components/Allowance';
// import TokenTransfer from './components/TokenTransfer';

function App() {
  // const [walletAddress, setWalletAddress] = useState('')
  
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3a80e9",
      },
    },
  });

  return (
    <div className="App">
      <Header />
      
      <div className="main-content">
        <ToastContainer />
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/coin/:id" element={<Coin />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/watchlist" element={<Watchlist />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default App;
