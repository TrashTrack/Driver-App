import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpPage from "./assets/SignUpPage.js";
import LogInPage from "./assets/LoginPage.js";
import MainPage from "./assets/mainPage.js";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen
          name="SignUp"
          component={SignUpPage}
          options={{ title: "TrashTrack Driver" }}
        />
        <Stack.Screen
          name="LogIn"
          component={LogInPage}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Home"
          component={MainPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
