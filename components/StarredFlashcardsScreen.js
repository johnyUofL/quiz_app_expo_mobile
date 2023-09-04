import React from "react";
import { View, Text, StyleSheet } from "react-native";

function StarredFlashcardsScreen() {
  return (
    <View style={styles.container}>
      <Text>This is the Starred Flashcards Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StarredFlashcardsScreen;
