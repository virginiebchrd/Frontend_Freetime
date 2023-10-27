import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import HeaderReturn from "../components/HeaderReturn";
import SmallButton from "../components/buttons/SmallButton";
import CalendarContainer from "../components/CalendarContainer";

export default function CalendarScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Indie-Flower": require("../assets/fonts/IndieFlower-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

    const handleValidate = () => {
        //dispatch activité
        navigation.navigate('Who');
    }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#D9F2B1", "transparent"]}
        style={styles.background}
      >
        <HeaderReturn iconContext="profil" pages="Profil" />

        <View style={styles.bodyContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Quand voulez-vous pratiquer votre activité ?
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <CalendarContainer />
          </View>

          <View style={styles.validateContainer}>
            <SmallButton title="Valider" onPress={handleValidate} />
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
  background: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  bodyContainer: {
    height: "80%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  titleContainer: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: "Indie-Flower",
    color: "#004644",
    textAlign: "center",
  },
  infoContainer: {
    height: "60%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  validateContainer: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
