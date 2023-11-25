import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./pages/HomePage";
// import TimedMode from "./TimedMode";
import InfiniteMode from "./pages/InfiniteMode";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        {/* <Stack.Screen name="TimedMode" component={TimedMode} /> */}
        <Stack.Screen name="InfiniteMode" component={InfiniteMode} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
