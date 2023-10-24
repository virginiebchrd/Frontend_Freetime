import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import Logo from "../assets/Free-Time-logos_black.svg";
import SmallButton from "../components/buttons/SmallButton";

export default function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Indie-Flower": require("../assets/fonts/IndieFlower-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#D9F2B1", "transparent"]}
        style={styles.background}
      >
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcome}>Welcome to</Text>
        </View>
        <View style={styles.logoContainer}>
          <Logo width="125%" />
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonBackgroundUp}>
            <SmallButton
              title="S'inscrire"
              onPress={() => navigation.navigate("CreateProfil")}
              style={styles.buttonSignUp}
            >
              <Text style={{ fontSize: 10 }}>S'inscrire</Text>
            </SmallButton>
          </View>

          <View style={styles.buttonBackgroundIn}>
            <SmallButton
              title="Se connecter"
              onPress={() => navigation.navigate("Connection")}
              style={styles.buttonSignIn}
            >
              <Text style={{ fontSize: 10 }}>S'inscrire</Text>
            </SmallButton>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  //   gradientContainer: {
  //     height: "20%",
  //     width: "60%",
  //     alignItems: "center",
  //     justifyContent: "center",
  //   },
  background: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 50,
  },
  welcomeContainer: {
    height: "25%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  welcome: {
    color: "#004644",
    fontSize: 50,
    fontFamily: "Indie-Flower",
  },
  logoContainer: {
    height: "25%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: "100%",
    width: "125%",
  },
  buttonContainer: {
    height: "60%",
    width: "100%",
    alignItems: "center",
    // justifyContent: "space-around",
  },

  buttonBackgroundUp: {
    height: 110,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBackgroundIn: {
    height: 110,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
  },
});
