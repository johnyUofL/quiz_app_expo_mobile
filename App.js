import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";
import SignupScreen from "./components/SignupScreen";
import FlashcardsScreen from './components/FlashcardsScreen';
import RandomFlashcardsScreen from './components/RandomFlashcardsScreen';
import StarredFlashcardsScreen from './components/StarredFlashcardsScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerLeft: () => null, // This hides the back button, We want to go back to login screen just when We log out.
          }}
        />
        <Stack.Screen name="Flashcards" component={FlashcardsScreen} />
        <Stack.Screen
          name="RandomFlashcards"
          component={RandomFlashcardsScreen}
        />
        <Stack.Screen
          name="StarredFlashcards"
          component={StarredFlashcardsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
