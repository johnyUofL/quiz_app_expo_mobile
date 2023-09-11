import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import usersData from "../users.json";
import { customStyles } from '../assets/styles/customStyles';

function SignupScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Check if username already exists
    if (usersData.users.some((user) => user.username === username)) {
      setErrorMessage("Username already exists.");
      return;
    }

    // Create a new user object
    const newUser = { username, password };
    usersData.users.push(newUser);

    setErrorMessage("");
    navigation.navigate("Login"); // Navigate to the login screen
  };

  return (
    <View style={customStyles.container}>
      <Image
        source={require("../assets/logo-medium.png")}
        style={customStyles.logo}
      />
      <Text style={customStyles.title}>Signup</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={customStyles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={customStyles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={customStyles.input}
      />
      <TouchableOpacity style={customStyles.button} onPress={handleSignup}>
        <Text style={customStyles.buttonText}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={customStyles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={customStyles.buttonText}>Go to Login</Text>
      </TouchableOpacity>
      <Text style={customStyles.errorMessage}>{errorMessage}</Text>
    </View>
  );
}

export default SignupScreen;
