import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./pages/HomePage";
import TimedMode from "./pages/TimedMode";
import InfiniteMode from "./pages/InfiniteMode";
import Leaderboard from "./pages/Leaderboard";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="TimedMode" component={TimedMode} />
        <Stack.Screen name="InfiniteMode" component={InfiniteMode} />
        <Stack.Screen name="Leaderboard" component={Leaderboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
