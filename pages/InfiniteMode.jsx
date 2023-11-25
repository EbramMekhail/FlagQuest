import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import countries from "../components/countries";
import Image from "react-native-remote-svg";
// const countries = [
//   { name: "Country1", flag: "URL_TO_FLAG_1", alt: "1" },
//   { name: "Country2", flag: "URL_TO_FLAG_2", alt: "2" },
//   { name: "Country3", flag: "URL_TO_FLAG_3", alt: "3" },
//   { name: "Country4", flag: "URL_TO_FLAG_4", alt: "4" },
//   // Add more countries as needed
// ];

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

  const handleOptionPress = (selectedCountry) => {
    // Check if the selected country is correct
    if (selectedCountry.name === currentCountry.name) {
      // Handle correct guess (e.g., update score)
      console.log("Correct guess!");
    } else {
      // Handle incorrect guess
      console.log("Incorrect guess!");
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
      {currentCountry && (
        console.log(currentCountry),
        <React.Fragment>
          <Image
            source={currentCountry.img}
            style={styles.flagImage}
          />

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
      )}
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
    width: 300,
    height: 250,
    resizeMode: "fill",
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
