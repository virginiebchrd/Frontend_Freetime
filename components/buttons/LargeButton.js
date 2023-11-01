import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const LargeButton = ({ title, onPress }) => {
  return (
    <View style={styles.smallButtonContainer}>
      <LinearGradient
        colors={["transparent", "#8d9680"]}
        style={styles.buttonBackground}
      >
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  smallButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 10,
    width: 320,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBackground: {
    height: "50%",
    width: "100%",

    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#004644",
    fontFamily: "Indie-Flower",
  },
});

export default LargeButton;
