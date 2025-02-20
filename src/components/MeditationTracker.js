import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { Accelerometer } from "react-native-sensors";

const MeditationTracker = () => {
  const [movement, setMovement] = useState(0);
  const [isMeditating, setIsMeditating] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes
  let subscription;

  useEffect(() => {
    if (isMeditating) {
      subscription = new Accelerometer({ updateInterval: 1000 })
        .subscribe(({ x, y, z }) => {
          const totalMovement = Math.abs(x) + Math.abs(y) + Math.abs(z);
          setMovement(totalMovement);
        });
    }
    return () => subscription && subscription.unsubscribe();
  }, [isMeditating]);

  useEffect(() => {
    if (isMeditating && timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [isMeditating, timer]);

  const validateMeditation = () => {
    if (movement < 0.3) {
      alert("Success! You earned 10 X1TestCoins!");
      // Call contract function to reward tokens (not implemented here)
    } else {
      alert("Failed! Too much movement.");
    }
    setIsMeditating(false);
    setTimer(300);
  };

  return (
    <View>
      <Text>Meditation Timer: {timer} sec</Text>
      <Button title="Start Meditation" onPress={() => setIsMeditating(true)} />
      {timer === 0 && <Button title="Validate" onPress={validateMeditation} />}
    </View>
  );
};

export default MeditationTracker;
