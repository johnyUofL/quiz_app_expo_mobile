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
import { customStyles } from "../assets/styles/customStyles";

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
    <View style={customStyles.container}>
      <View style={customStyles.scoreContainer}>
        <Text style={customStyles.scoreText}>✓: {correctCount}</Text>
        <Text style={customStyles.scoreText}>✘ : {incorrectCount}</Text>
      </View>
      <FlipCard
        isFlipped={isFlipped}
        setIsFlipped={setIsFlipped}
        frontContent={
          <Text style={customStyles.flipTextFront}>{cardData.character}</Text>
        }
        backContent={
          isFlipped ? (
            <Text style={customStyles.flipTextBack}>
              ({cardData.pinyin}){"\n"}
              {"\n"}
              {cardData.meaning}
            </Text>
          ) : (
            <Text style={customStyles.flipTextBack}></Text>
          )
        }
      />

      {isFlipped && (
        <View style={customStyles.guessContainer}>
          <TouchableOpacity
            onPress={handleCorrect}
            style={customStyles.correctButton}
          >
            <Text style={customStyles.buttonText}>Correct</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleIncorrect}
            style={customStyles.incorrectButton}
          >
            <Text style={customStyles.buttonText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={customStyles.arrowContainer}>
        <TouchableOpacity onPress={prevCard} disabled={isLoading}>
          <Text style={customStyles.arrow}>{"<"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFlipped(!isFlipped)}
          style={customStyles.flipButton}
          disabled={isLoading}
        >
          <Text style={customStyles.flipButtonText}>Flip</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={nextCard} disabled={isLoading}>
          <Text style={customStyles.arrow}>{">"}</Text>
        </TouchableOpacity>
      </View>

      {showAnimationCorrect && (
        <Image
          source={animationCorrect}
          style={customStyles.animationStyleCorrect}
        />
      )}

      {showAnimationIncorrect && (
        <Image
          source={animationIncorrect}
          style={customStyles.animationStyleIncorrect}
        />
      )}
    </View>
  );
};

export default RandomFlashcardsScreen;
