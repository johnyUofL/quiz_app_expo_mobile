import React, { useRef, useEffect } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { customStyles } from "../assets/styles/customStyles";

// FlipCard component
export const FlipCard = ({
  frontContent,
  backContent,
  isFlipped,
  setIsFlipped,
}) => {
  const flipAnim = useRef(new Animated.Value(0)).current;

  // useEffect hook to animate the flip effect
  useEffect(() => {
    Animated.spring(flipAnim, {
      toValue: isFlipped ? 180 : 0,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  }, [isFlipped]);

  // Interpolation for the flip effect
  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });
  // Interpolation for the flip effect
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  // Animated styles
  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };
  
//returning the FlipCard component
  return (
    <View style={customStyles.containerFlipcard}>
      <View>
        <Animated.View style={[customStyles.flipCard, frontAnimatedStyle]}>
          {frontContent}
        </Animated.View>
        <Animated.View
          style={[
            customStyles.flipCard,
            customStyles.flipCardBack,
            backAnimatedStyle,
          ]}
        >
          {backContent}
        </Animated.View>
      </View>
    </View>
  );
};

export default FlipCard;
