import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

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
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Flashcards")}
        >
          <Text style={styles.buttonText}>Flashcards</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("RandomFlashcards")}
        >
          <Text style={styles.buttonText}>Random Flashcards</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("StarredFlashcards")}
        >
          <Text style={styles.buttonText}>Starred Flashcards</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.topRightContainer}>
        <Text style={styles.usernameText}>{username}</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D5F3FE",
    justifyContent: "center",
    alignItems: "center",
  },
  topRightContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  usernameText: {
    marginRight: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 200,
    height: 150,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2565AE",
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 50,
    elevation: 50,
    shadowColor: "#177EBC",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default HomeScreen;
