import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { FlipCard } from "../components/FlipCard";
import data from "../assets/data.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FlashcardsScreen = () => {
  const [index, setIndex] = useState(0);
  const [cards] = useState(data);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [starredCards, setStarredCards] = useState({});
  const [isStarred, setIsStarred] = useState(false);

  const prevCard = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 1));
    setIsFlipped(false);
    setIsStarred(false);
  };

  const nextCard = () => {
    setIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
    setIsFlipped(false);
    setIsStarred(false);
  };

  const toggleStar = () => {
    const updatedStarredCards = { ...starredCards };
    if (isStarred) {
      delete updatedStarredCards[index];
    } else {
      updatedStarredCards[index] = cards[index];
    }
    setStarredCards(updatedStarredCards);
    setIsStarred(!isStarred);
  };

  useEffect(() => {
    AsyncStorage.setItem("starred.json", JSON.stringify(starredCards));
  }, [starredCards]);

  const cardData = cards[index];
  if (!cardData) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Correct: {correctCount}</Text>
        <Text style={styles.scoreText}>Incorrect: {incorrectCount}</Text>
      </View>
      <FlipCard
        isFlipped={isFlipped}
        setIsFlipped={setIsFlipped}
        frontContent={
          <Text style={styles.flipTextFront}>{cardData.character}</Text>
        }
        backContent={
          isFlipped ? (
            <Text style={styles.flipTextBack}>
              ({cardData.pinyin}){"\n"}
              {"\n"}
              {cardData.meaning}
            </Text>
          ) : (
            <Text style={styles.flipTextBack}></Text>
          )
        }
      />

      {isFlipped && (
        <View style={styles.guessContainer}>
          <TouchableOpacity
            onPress={() => setCorrectCount(correctCount + 1)}
            style={styles.correctButton}
          >
            <Text style={styles.buttonText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIncorrectCount(incorrectCount + 1)}
            style={styles.incorrectButton}
          >
            <Text style={styles.buttonText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.starContainer}>
        <TouchableOpacity onPress={toggleStar} style={styles.starButton}>
          <Text style={styles.buttonText}>{isStarred ? "★" : "☆"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.arrowContainer}>
        <TouchableOpacity onPress={prevCard}>
          <Text style={styles.arrow}>{"<"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFlipped(!isFlipped)}
          style={styles.flipButton}
        >
          <Text style={styles.flipButtonText}>Flip</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={nextCard}>
          <Text style={styles.arrow}>{">"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
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
  },
  starContainer: {
    marginTop: 20,
  },
  starButton: {
    backgroundColor: "#ffca3a",
    padding: 10,
    borderRadius: 10,
  },
});

export default FlashcardsScreen;
