import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { connectWallet, getBalance } from "../services/walletService";

const BalanceDisplay = () => {
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    async function fetchData() {
      const { account, contract } = await connectWallet();
      const userBalance = await getBalance(account, contract);
      setBalance(userBalance);
    }
    fetchData();
  }, []);

  return (
    <View>
      <Text>Your Balance: {balance} X1T</Text>
    </View>
  );
};

export default BalanceDisplay;
