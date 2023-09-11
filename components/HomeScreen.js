import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";

import { customStyles } from "../assets/styles/customStyles";

function HomeScreen({ route, navigation }) {
  const { username } = route.params;

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            }),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={customStyles.container}>
      <Image
        source={require("../assets/logo-small.png")}
        style={customStyles.logoHome}
      />
      <View style={customStyles.gridContainer}>
        <TouchableOpacity
          style={customStyles.buttonHome}
          onPress={() => navigation.navigate("Flashcards")}
        >
          <Text style={customStyles.buttonHomeText}>Flashcards</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={customStyles.buttonHome}
          onPress={() => navigation.navigate("RandomFlashcards")}
        >
          <Text style={customStyles.buttonHomeText}>Random Flashcards</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={customStyles.buttonHome}
          onPress={() => navigation.navigate("StarredFlashcards")}
        >
          <Text style={customStyles.buttonHomeText}>Starred Flashcards</Text>
        </TouchableOpacity>
      </View>
      <View style={customStyles.topRightContainer}>
        <Text style={customStyles.usernameText}>{username}</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
}
export default HomeScreen;
