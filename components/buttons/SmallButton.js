import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SmallButton = ({ title, onPress }) => {
  return (
    <View style={styles.smallButtonContainer}>
      <LinearGradient
        colors={["transparent", "#004644"]}
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
    width: 162,
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
    fontSize: 40,
    color: "#004644",
    fontWeight: "600",
    fontFamily: "Indie-Flower",
  },
});

export default SmallButton;
