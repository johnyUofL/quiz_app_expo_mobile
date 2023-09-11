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
import { customStyles } from "../assets/styles/customStyles";

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
      <View style={customStyles.noCardsContainer}>
        <Text style={customStyles.noCardsText}>
          Add cards by adding a ★ star!
        </Text>
      </View>
    );
  }

  // Handlers for correct and incorrect options.
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
    <View style={customStyles.container}>
      <View style={customStyles.scoreContainer}>
        <Text style={customStyles.scoreText}>✓: {correctCount}</Text>
        <Text style={customStyles.scoreText}>✘ : {incorrectCount}</Text>
      </View>

      <FlipCard
        isFlipped={isFlipped}
        setIsFlipped={setIsFlipped}
        frontContent={
          <Text style={customStyles.flipTextFront}>
            {currentStarredCard.character}
          </Text>
        }
        backContent={
          isFlipped ? (
            <Text style={customStyles.flipTextBack}>
              ({currentStarredCard.pinyin}){"\n\n"}
              {currentStarredCard.meaning}
            </Text>
          ) : (
            <Text style={customStyles.flipTextBack}></Text>
          )
        }
      />

      {isFlipped && (
        <View style={customStyles.guessContainer}>
          {/* Correct button */}
          <TouchableOpacity
            onPress={handleCorrect}
            style={customStyles.correctButton}
          >
            <Text style={customStyles.buttonText}>Correct</Text>
          </TouchableOpacity>
          {/* End correct button*/}

          {/* Incorrect button */}
          <TouchableOpacity
            onPress={handleIncorrect}
            style={customStyles.incorrectButton}
          >
            <Text style={customStyles.buttonText}>Incorrect</Text>
          </TouchableOpacity>

          {/* End incorrect button */}
        </View>
      )}

      <View style={customStyles.arrowContainer}>
        <TouchableOpacity onPress={prevCard}>
          <Text style={customStyles.arrow}>{"<"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFlip} style={customStyles.flipButton}>
          <Text style={customStyles.flipButtonText}>Flip</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={nextCard}>
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

export default StarredFlashcardsScreen;
