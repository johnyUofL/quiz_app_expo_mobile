import React from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";

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
      <View style={styles.topRightContainer}>
        <Text style={styles.usernameText}>{username}</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
      <Text>Welcome</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default HomeScreen;
