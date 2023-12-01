import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
} from "react-native";

import Image from "react-native-remote-svg";

import countries from "../components/countries";
import scores from "../components/scores";
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const TimedMode = () => {
  const [currentCountry, setCurrentCountry] = useState(null);
  const [options, setOptions] = useState([]);
  const [correctCounter, setCorrectCounter] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [enteredName, setEnteredName] = useState("");

  const intervalRef = useRef();

  useEffect(() => {
    loadNextCountry();
  }, []);

  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      endGame();
    }

    return () => clearInterval(intervalRef.current);
  }, [isTimerRunning, timer]);

  const loadNextCountry = () => {
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
    }

    loadNextCountry();
  };

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const correctRatio =
    totalAttempts > 0 ? (correctCounter / totalAttempts).toFixed(2) : 0;

  const endGame = () => {
    setIsTimerRunning(false);
    clearInterval(intervalRef.current);
    setIsGameEnded(true);
    setModalVisible(true);
  };

  const submitScore = () => {
    // Validate the entered name (optional)
    if (enteredName.trim() === "") {
      Alert.alert("Error", "Please enter your name.");
      return;
    }

    // Add the score to the scores array
    const newScore = {
      name: enteredName,
      score: correctCounter,
    };

    scores.push(newScore);

    // Handle storing the score data, for example, using AsyncStorage or sending it to a server
    // scores.push(newScore);

    // Reset game state
    setCorrectCounter(0);
    setTotalAttempts(0);
    setTimer(30);
    setIsGameEnded(false);
    setModalVisible(false);

    // Additional actions can be performed here, such as navigating to a leaderboard screen
  };

  return (
    <View style={styles.container}>
      {currentCountry && console.log(currentCountry)}
      {isTimerRunning && <Text style={styles.timer}>Time: {timer}s</Text>}
      {/* {currentCountry && console.log(currentCountry)} */}
      {currentCountry && isTimerRunning && (
        <React.Fragment>
          {/* <Image
            source={currentCountry.img}
            style={styles.flagImage}
            resizeMode={"cover"}
          /> */}
          <Image source={currentCountry.img} style={styles.flagImage} />
          <View style={styles.horizontalContainer}>
            <Text style={styles.horizontalText}>Correct: {correctCounter}</Text>
            <Text style={styles.horizontalText}>Attempts: {totalAttempts}</Text>
            <Text style={styles.horizontalText}>
              Correct Ratio: {correctRatio}
            </Text>
          </View>
          <Text style={styles.title}>Guess the Country:</Text>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleOptionPress(option)}
              disabled={!isTimerRunning}
            >
              <Text style={styles.buttonText}>{option.name}</Text>
            </TouchableOpacity>
          ))}
        </React.Fragment>
      )}

      {!isTimerRunning && (
        <TouchableOpacity style={styles.startButton} onPress={startTimer}>
          <Text style={styles.startButtonText}>Start Game</Text>
        </TouchableOpacity>
      )}

      {/* Modal for entering name after the game ends */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Game Over!</Text>
            <Text style={styles.modalText}>
              Correct Guesses: {correctCounter} | Total Attempts:{" "}
              {totalAttempts}
            </Text>
            <Text style={styles.modalText}>Enter Your Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              onChangeText={(text) => setEnteredName(text)}
            />
            <TouchableOpacity style={styles.submitButton} onPress={submitScore}>
              <Text style={styles.submitButtonText}>Submit Score</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  submitButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  timer: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  startButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
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
    width: 350,
    height: 150,
    // height: "auto",
    // aspectRatio: 4 / 3,
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

export default TimedMode;
