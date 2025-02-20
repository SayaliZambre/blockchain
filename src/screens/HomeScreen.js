
import React from "react";
import { View, Text, Button } from "react-native";
import WalletButton from "../components/WalletButton";
import BalanceDisplay from "../components/BalanceDisplay";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to X1TestCoin App!</Text>
      <WalletButton />
      <BalanceDisplay />
      <Button title="Go to Staking" onPress={() => navigation.navigate("Staking")} />
    </View>
  );
};

export default HomeScreen;
