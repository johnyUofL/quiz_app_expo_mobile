import { StyleSheet } from "react-native";

export const customStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D5F3FE",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    backgroundColor: "white",
    padding: 10,
    borderWidth: 2,
    borderColor: "#0080FF", // Light blue color
    borderRadius: 8, // Rounded corners
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#0080FF",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  errorMessage: {
    color: "red",
    marginTop: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
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
  starContainer: {
    marginTop: 10,
  },
  starButton: {
    backgroundColor: "#ffca3a",
    padding: 10,
    borderRadius: 10,
  },
  //Style for correct and incorrect animations
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
  //Style for flipcard component

  containerFlipcard: {
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
  //Style for message when there is no starred flashcard
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

  //Styles for home screen

  topRightContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  usernameText: {
    marginRight: 10,
  },

  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonHome: {
    width: 200,
    height: 150,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2565AE",
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 50,
    elevation: 50,
    shadowColor: "#177EBC",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonHomeText: {
    color: "white",
    textAlign: "center",
  },
  logoHome: {
    width: 50,
    height: 50,
    position: "absolute",
    top: 5,
    left: 15,
  },
});
