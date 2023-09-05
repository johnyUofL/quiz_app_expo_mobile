import React, { useRef, useEffect } from "react";
import { StyleSheet, View, Animated } from "react-native";

export const FlipCard = ({
  frontContent,
  backContent,
  isFlipped,
  setIsFlipped,
}) => {
  const flipAnim = useRef(new Animated.Value(0)).current;

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

  return (
    <View style={styles.container}>
      <View>
        <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
          {frontContent}
        </Animated.View>
        <Animated.View
          style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}
        >
          {backContent}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    perspective: 1000,
  },
  flipCard: {
    width: 300,
    height: 300,
    backgroundColor: "rgba(0, 142, 204, 0.8)",
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
 
    backfaceVisibility: "hidden",
  },
  flipCardBack: {
    backgroundColor: "rgba(0, 142, 204, 0.8)",
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 50,
    position: "absolute",
    top: 0,
  },
});

export default FlipCard;
