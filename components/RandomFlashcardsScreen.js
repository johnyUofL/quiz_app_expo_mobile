import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import { FlipCard } from "../components/FlipCard";
import data from "../assets/data.json";

const animationCorrect = require("../assets/animations/correct.gif");
const animationIncorrect = require("../assets/animations/incorrect.gif");

const RandomFlashcardsScreen = () => {
  const [index, setIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showAnimationCorrect, setShowAnimationCorrect] = useState(false);
  const [showAnimationIncorrect, setShowAnimationIncorrect] = useState(false);
  const [lastAnswered, setLastAnswered] = useState({});

  useEffect(() => {
    setCards(shuffleArray([...data]));
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  };

  const switchCard = (action) => {
    setIsLoading(true);
    setIsFlipped(false);
    action(); // Call the provided action immediately
    setIsLoading(false);
  };

  const prevCard = () => {
    switchCard(() =>
      setIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 1))
    );
  };

  const nextCard = () => {
    switchCard(() =>
      setIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0))
    );
  };

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
            onPress={handleCorrect}
            style={styles.correctButton}
          >
            <Text style={styles.buttonText}>Correct</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleIncorrect}
            style={styles.incorrectButton}
          >
            <Text style={styles.buttonText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.arrowContainer}>
        <TouchableOpacity onPress={prevCard} disabled={isLoading}>
          <Text style={styles.arrow}>{"<"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFlipped(!isFlipped)}
          style={styles.flipButton}
          disabled={isLoading}
        >
          <Text style={styles.flipButtonText}>Flip</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={nextCard} disabled={isLoading}>
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

  animationStyleCorrect: {
    position: "absolute",
    width: 200,
    height: 200,
    alignSelf: "center",
    zIndex: 1000,
  },

  animationStyleIncorrect: {
    position: "absolute",
    width: 200,
    height: 200,
    alignSelf: "center",
    zIndex: 1000,
  },
});

export default RandomFlashcardsScreen;
