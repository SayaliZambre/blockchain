import { ethers } from "ethers";
import { INFURA_API_URL, CONTRACT_ADDRESS } from "@env";
import X1TestCoinABI from "../contracts/X1TestCoin.json";

export async function connectWallet() {
  if (!window.ethereum) throw new Error("MetaMask not found");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, X1TestCoinABI, signer);

  return { account: accounts[0], contract };
}

export async function getBalance(address, contract) {
  const balance = await contract.balanceOf(address);
  return ethers.formatEther(balance);
}
