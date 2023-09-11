import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlipCard } from "../components/FlipCard";

const animationCorrect = require("../assets/animations/correct.gif");
const animationIncorrect = require("../assets/animations/incorrect.gif");

const StarredFlashcardsScreen = () => {
  const [starredCards, setStarredCards] = useState({});
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [showAnimationCorrect, setShowAnimationCorrect] = useState(false);
  const [showAnimationIncorrect, setShowAnimationIncorrect] = useState(false);
  const [lastAnswered, setLastAnswered] = useState({});

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

  if (!starredCardKeys.length) {
    return (
      <View style={styles.noCardsContainer}>
        <Text style={styles.noCardsText}>Add cards by adding a ★ star!</Text>
      </View>
    );
  }

  // New Handlers
  const handleCorrect = () => {
    if (lastAnswered[index] !== "correct") {
      if (lastAnswered[index] === "incorrect") {
        setIncorrectCount(incorrectCount - 1);
      }
      setCorrectCount(correctCount + 1);
      setShowAnimationCorrect(true);
      setTimeout(() => {
        setShowAnimationCorrect(false);
      }, 2000);
      setLastAnswered({ ...lastAnswered, [index]: "correct" });
    }
  };

  const handleIncorrect = () => {
    if (lastAnswered[index] !== "incorrect") {
      if (lastAnswered[index] === "correct") {
        setCorrectCount(correctCount - 1);
      }
      setIncorrectCount(incorrectCount + 1);
      setShowAnimationIncorrect(true);
      setTimeout(() => {
        setShowAnimationIncorrect(false);
      }, 2000);
      setLastAnswered({ ...lastAnswered, [index]: "incorrect" });
    }
  };

  if (!currentStarredCard) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>✓: {correctCount}</Text>
        <Text style={styles.scoreText}>✘ : {incorrectCount}</Text>
      </View>

      <FlipCard
        isFlipped={isFlipped}
        setIsFlipped={setIsFlipped}
        frontContent={
          <Text style={styles.flipTextFront}>
            {currentStarredCard.character}
          </Text>
        }
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

      {isFlipped && (
        <View style={styles.guessContainer}>
          {/* Correct button */}
          <TouchableOpacity
            onPress={handleCorrect}
            style={styles.correctButton}
          >
            <Text style={styles.buttonText}>Correct</Text>
          </TouchableOpacity>
          {/* End correct button*/}

          {/* Incorrect button */}
          <TouchableOpacity
            onPress={handleIncorrect}
            style={styles.incorrectButton}
          >
            <Text style={styles.buttonText}>Incorrect</Text>
          </TouchableOpacity>

          {/* End incorrect button */}
        </View>
      )}

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

      {showAnimationCorrect && (
        <Image source={animationCorrect} style={styles.animationStyleCorrect} />
      )}

      {showAnimationIncorrect && (
        <Image
          source={animationIncorrect}
          style={styles.animationStyleIncorrect}
        />
      )}
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
  },
  noCardsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9bedff",
  },
  noCardsText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
    color: "red",
  },

  animationStyleCorrect: {
    position: "absolute",
    width: 200,
    height: 200,
    alignSelf: "center",
    zIndex: 1000,
  },

  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 250,
    marginTop: 10,
    marginBottom: 10,
  },
  scoreText: {
    color: "navy",
    fontSize: 30,
    fontWeight: "bold",
  },
  animationStyleIncorrect: {
    position: "absolute",
    width: 200,
    height: 200,
    alignSelf: "center",
    zIndex: 1000,
  },
});

export default StarredFlashcardsScreen;
