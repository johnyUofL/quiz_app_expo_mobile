//importing the necessary modules
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { customStyles } from "../assets/styles/customStyles";

//adding animation. The animations are gif files located in the assets/animations folder.
const animationCorrect = require("../assets/animations/correct.gif");
const animationIncorrect = require("../assets/animations/incorrect.gif");

//initializing the state variables
const FlashcardsScreen = () => {
  const [index, setIndex] = useState(0);
  const [cards] = useState(data);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [starredCards, setStarredCards] = useState({});
  const [isStarred, setIsStarred] = useState(false);
  const [showAnimationCorrect, setShowAnimationCorrect] = useState(false);
  const [showAnimationIncorrect, setShowAnimationIncorrect] = useState(false);
  const [lastAnswered, setLastAnswered] = useState({});

  //useEffect hook to get the starred cards from the local storage
  useEffect(() => {
    const getStarredCards = async () => {
      const storedStarredCards = await AsyncStorage.getItem("starred.json");
      if (storedStarredCards) {
        setStarredCards(JSON.parse(storedStarredCards));
      }
    };
    getStarredCards();
  }, []);

  //useEffect hook to check if the current card is starred
  useEffect(() => {
    setIsStarred(starredCards.hasOwnProperty(index));
  }, [index, starredCards]);

  //useEffect hook to save the starred cards to the local storage
  useEffect(() => {
    AsyncStorage.setItem("starred.json", JSON.stringify(starredCards));
  }, [starredCards]);

  const prevCard = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 1));
    setIsFlipped(false);
  };

  //function to go to the next card
  const nextCard = () => {
    setIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
    setIsFlipped(false);
  };

  //function to toggle the star
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

  //function to handle the correct answer
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
  //function to handle the incorrect answer
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

  //if there are no starred cards, display the message
  const cardData = cards[index];
  if (!cardData) {
    return <ActivityIndicator />;
  }

  //app return statement
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

      <View style={customStyles.starContainer}>
        <TouchableOpacity onPress={toggleStar} style={customStyles.starButton}>
          <Text style={customStyles.buttonText}>{isStarred ? "★" : "☆"}</Text>
        </TouchableOpacity>
      </View>

      <View style={customStyles.arrowContainer}>
        <TouchableOpacity onPress={prevCard}>
          <Text style={customStyles.arrow}>{"<"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFlipped(!isFlipped)}
          style={customStyles.flipButton}
        >
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

export default FlashcardsScreen;
