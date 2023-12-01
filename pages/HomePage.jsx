import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
// import Image from "react-native-remote-svg";

const HomePage = ({ navigation }) => {
  const handleTimedModePress = () => {
    // Navigate to the Timed Mode screen
    navigation.navigate("TimedMode");
  };

  const handleInfiniteModePress = () => {
    // Navigate to the Infinite Mode screen
    navigation.navigate("InfiniteMode");
  };

    const handleLeaderboardPress = () => {
      // Navigate to the Infinite Mode screen
      navigation.navigate("Leaderboard");
    };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/globe.png")} style={styles.flagImage} />

      <Text style={styles.title}>Flag Guessing Game</Text>
      <TouchableOpacity style={styles.button} onPress={handleTimedModePress}>
        <Text style={styles.buttonText}>Timed Mode</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleInfiniteModePress}>
        <Text style={styles.buttonText}>Infinite Mode</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLeaderboardPress}>
        <Text style={styles.buttonText}>Leaderboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ADD8E6", // Light Blue
  },

  flagImage: {
    resizeMode: "contain",
    width: 200,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomePage;
