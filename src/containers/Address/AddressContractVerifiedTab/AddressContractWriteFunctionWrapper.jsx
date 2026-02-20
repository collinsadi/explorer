import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import AddressContractVerifiedWriteFunction from "./AddressContractVerifiedWriteFunction";
import { truncateAddress } from "../../../utils";
import { useNavigate } from "react-router-dom";

const AddressContractWriteFunctionWrapper = ({ address, abi }) => {
  const [signer, setSigner] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const navigate = useNavigate();

  const connectToWallet = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const wallet = await signer.getAddress();
      setSigner(signer);
      setWalletAddress(wallet);
    } catch (error) {
      console.error("User is not connected or MetaMask is locked:", error);
      // Clear any existing wallet connection if MetaMask is locked
      setSigner(null);
      setWalletAddress(null);
    }
  };

  const connectToWeb3 = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // Check if we're on the Hardhat network
        const currentChainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        const hardhatChainId = "0x539"; // 1337 in hexadecimal

        if (currentChainId !== hardhatChainId) {
          alert("Only Hardhat network is supported for now.");
          return;
        }

        await connectToWallet();
      } catch (error) {
        console.error("Failed to connect to MetaMask:", error);
      }
    } else {
      console.log("MetaMask is not installed.");
    }
  };

  useEffect(() => {
    // Try to connect only if an account is already connected
    const checkExistingConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts && accounts.length > 0) {
          await connectToWallet();
        }
      }
    };

    checkExistingConnection();

    // Listen for account changes to detect MetaMask lock/unlock
    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        // MetaMask is locked or no account connected
        setSigner(null);
        setWalletAddress(null);
      } else {
        // Update signer and wallet address if accounts change
        connectToWallet();
      }
    };

    window.ethereum?.on("accountsChanged", handleAccountsChanged);

    return () => {
      // Clean up event listener on component unmount
      window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  const navigateToAddress = () => navigate(`/address/${walletAddress}`);

  //   @Todo: Create wallet selection for hardhat
  return (
    <div className="flex flex-col">
      <div>
        {!signer && !walletAddress ? (
          <button onClick={connectToWeb3}>Connect to Web3</button>
        ) : (
          <button onClick={navigateToAddress}>
            [Connect Web3 ({truncateAddress(walletAddress)})]
          </button>
        )}
      </div>

      <AddressContractVerifiedWriteFunction
        address={address}
        abi={abi}
        signer={signer}
      />
    </div>
  );
};

export default AddressContractWriteFunctionWrapper;
