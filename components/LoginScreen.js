//importing modules
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
import { customStyles } from "../assets/styles/customStyles";

//LoginScreen component
function LoginScreen({ navigation }) {
  //initializing the state variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //function to handle the login
  const handleLogin = () => {
    const user = usersData.users.find((user) => user.username === username);

    if (user && user.password === password) {
      setErrorMessage("");
      navigation.navigate("Home", { username: user.username });
    } else {
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  //function to handle the signup
  const handleSignup = () => {
    navigation.navigate("Signup");
  };

  //returning the LoginScreen component
  return (
    <View style={customStyles.container}>
      <Image
        source={require("../assets/logo-medium.png")}
        style={customStyles.logo}
      />
      <Text style={customStyles.title}>Login</Text>
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
      <TouchableOpacity style={customStyles.button} onPress={handleLogin}>
        <Text style={customStyles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={customStyles.button} onPress={handleSignup}>
        <Text style={customStyles.buttonText}>Signup</Text>
      </TouchableOpacity>
      <Text style={customStyles.errorMessage}>{errorMessage}</Text>
    </View>
  );
}

export default LoginScreen;
