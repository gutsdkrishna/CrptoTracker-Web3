// src/App.js
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Coin from "./pages/Coin";
import Compare from "./pages/Compare";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import TransferToken from "./pages/TransferToken"; // Import the new page
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Common/Header";
import Allowance from "./pages/Allowance"; // Import the new page
import WalletConnect from "./pages/WalletConnect"; // Import the new page
function App() {
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
              <Route path="/walletconnect" element={<WalletConnect />} />
              <Route path="/transfer" element={<TransferToken />} /> {/* Add the new route */}
              <Route path="/allowance" element={<Allowance />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default App;
