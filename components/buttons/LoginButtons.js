import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";

const LoginButtons = ({ title, onPress }) => {
  return (
    <View style={styles.loginButtonsContainer}>
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
  loginButtonsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 10,
    width: 202,
    height: '100%', 
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "blue",
  },
  buttonBackground: {
    height: "50%",
    width: "100%",

    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 19,
    color: "#004644",
    fontWeight: "600",
    fontFamily: "Indie-Flower",
  },
});

export default LoginButtons;