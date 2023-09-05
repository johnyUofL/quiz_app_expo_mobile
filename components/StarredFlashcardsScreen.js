import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlipCard } from "../components/FlipCard";

const StarredFlashcardsScreen = () => {
  const [starredCards, setStarredCards] = useState({});
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // Load starredCards from 'starred.json' using AsyncStorage
    const loadStarredCards = async () => {
      try {
        const storedStarredCards = await AsyncStorage.getItem("starred.json");
        if (storedStarredCards) {
          setStarredCards(JSON.parse(storedStarredCards));
        }
      } catch (error) {
        console.error("Error loading starred cards:", error);
      }
    };

    loadStarredCards();
  }, []);

  const starredCardKeys = Object.keys(starredCards);

  const prevCard = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : starredCardKeys.length - 1));
    setIsFlipped(false);
  };

  const nextCard = () => {
    setIndex((prev) => (prev < starredCardKeys.length - 1 ? prev + 1 : 0));
    setIsFlipped(false);
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const currentStarredCardKey = starredCardKeys[index];
  const currentStarredCard = starredCards[currentStarredCardKey];

  if (!currentStarredCard) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <FlipCard
        isFlipped={isFlipped}
        setIsFlipped={setIsFlipped}
        frontContent={<Text style={styles.flipTextFront}>{currentStarredCard.character}</Text>}
        backContent={
          isFlipped ? (
            <Text style={styles.flipTextBack}>
              ({currentStarredCard.pinyin}){"\n\n"}
              {currentStarredCard.meaning}
            </Text>
          ) : (
            <Text style={styles.flipTextBack}></Text>
          )
        }
      />

      <View style={styles.arrowContainer}>
        <TouchableOpacity onPress={prevCard}>
          <Text style={styles.arrow}>{"<"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFlip} style={styles.flipButton}>
          <Text style={styles.flipButtonText}>Flip</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={nextCard}>
          <Text style={styles.arrow}>{">"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9bedff",
  },
  flipTextFront: {
    color: "white",
    fontSize: 200,
  },
  flipTextBack: {
    padding: 40,
    color: "white",
    fontSize: 40,
  },
  arrow: {
    color: "#0080FF",
    fontSize: 100,
  },
  arrowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 250,
  },
  flipButton: {
    backgroundColor: "rgba(0, 142, 204, 0.9)",
    padding: 10,
    borderRadius: 10,
  },
  flipButtonText: {
    color: "white",
    fontSize: 40,
  },
  guessContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 300,
    marginTop: 20,
  },
  correctButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  incorrectButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 250,
    marginTop: 30,
    marginBottom: 30,
  },
  scoreText: {
    color: "navy",
    fontSize: 20,
    fontWeight: "bold",
  }
});

export default StarredFlashcardsScreen;
