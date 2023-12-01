import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import Image from "react-native-remote-svg";
import countries from "../components/countries";

const shuffleArray = (array) => {
  // Shuffle the array using the Fisher-Yates algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const InfiniteMode = () => {
  const [currentCountry, setCurrentCountry] = useState(null);
  const [options, setOptions] = useState([]);
  const [correctCounter, setCorrectCounter] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  useEffect(() => {
    // Select a random country and shuffle the options
    const randomCountry =
      countries[Math.floor(Math.random() * countries.length)];
    const allOptions = [...countries];
    shuffleArray(allOptions);
    const newOptions = allOptions.slice(0, 3);
    newOptions.push(randomCountry);
    shuffleArray(newOptions);
    setOptions(newOptions);
    setCurrentCountry(randomCountry);
  }, []);

  const correctRatio =
    totalAttempts > 0 ? (correctCounter / totalAttempts).toFixed(2) : 0;

  const handleOptionPress = (selectedCountry) => {
    // Check if the selected country is correct
    if (selectedCountry.name === currentCountry.name) {
      // Handle correct guess (e.g., update score)
      console.log("Correct guess!");
    } else {
      // Handle incorrect guess
      console.log("Incorrect guess!");
    }

    setTotalAttempts(totalAttempts + 1);

    if (selectedCountry.name === currentCountry.name) {
      setCorrectCounter(correctCounter + 1);
      setCurrentStreak(currentStreak + 1);
      setMaxStreak(Math.max(maxStreak, currentStreak + 1));
    } else {
      setCurrentStreak(0);
    }

    // Load a new random country and shuffle the options
    const randomCountry =
      countries[Math.floor(Math.random() * countries.length)];
    const allOptions = [...countries];
    shuffleArray(allOptions);
    const newOptions = allOptions.slice(0, 3);
    newOptions.push(randomCountry);
    shuffleArray(newOptions);
    setOptions(newOptions);
    setCurrentCountry(randomCountry);
  };

  return (
    <View style={styles.container}>
      {currentCountry &&
        (console.log(currentCountry),
        (
          <React.Fragment>
            {/* <Image
              source={currentCountry.img}
              style={styles.flagImage}
              resizeMode={"cover"}
            /> */}
            <Image
              source={currentCountry.img}
              style={{ width: 400, height: 400 }}
            />
            <View style={styles.horizontalContainer}>
              <Text style={styles.horizontalText}>
                Correct: {correctCounter}
              </Text>
              <Text style={styles.horizontalText}>
                Attempts: {totalAttempts}
              </Text>
              <Text style={styles.horizontalText}>
                Correct Ratio: {correctRatio}
              </Text>
              <Text style={styles.horizontalText}>Streak: {currentStreak}</Text>
              <Text style={styles.horizontalText}>Max Streak: {maxStreak}</Text>
            </View>

            <Text style={styles.title}>Guess the Country:</Text>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleOptionPress(option)}
              >
                <Text style={styles.buttonText}>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </React.Fragment>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  horizontalText: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ADD8E6", // Light Blue
  },
  flagImage: {
    width: "auto",
    height: "auto",
    // aspectRatio: 4 / 3,
    // resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default InfiniteMode;
