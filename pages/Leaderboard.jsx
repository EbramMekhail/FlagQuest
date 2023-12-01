import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

// Import the scores from the components/scores.js file
import scoresData from "../components/scores";

const Leaderboard = () => {
  // Sort scores in descending order based on the score
  const sortedScores = scoresData.sort((a, b) => b.score - a.score);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={sortedScores}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.rank}>{index + 1}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.score}>{item.score}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  rank: {
    fontSize: 18,
    marginRight: 10,
  },
  name: {
    flex: 1,
    fontSize: 18,
    marginRight: 10,
  },
  score: {
    fontSize: 18,
  },
});

export default Leaderboard;
