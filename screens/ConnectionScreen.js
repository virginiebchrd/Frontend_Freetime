import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import HeaderReturn from "../components/HeaderReturn";
import SmallButton from "../components/buttons/SmallButton";

export default function FirstConnectionScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Indie-Flower": require("../assets/fonts/IndieFlower-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
    //text affiché dans le bouton
  const valider = "Valider";

      //la fonctiona qui est utilisé dans le bouton

  const handleValidateButton = () => {
    alert("Valider");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#D9F2B1", "transparent"]}
        style={styles.background}
      >
        <HeaderReturn />

        <View style={styles.InputsContainer}>
            <Text>input 1</Text>
            <Text>input 2</Text>
        </View>
        <View style={styles.buttonContainer}>
        
          <SmallButton title={valider} onPress={() => navigation.navigate('Who')} />
          
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
  InputsContainer: {
    height: "50%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    height: "20%",
    width: 500,
    alignItems: "center",
    bottom: 0,
  },
  title: {
    color: "#004644",
    fontSize: 50,
    fontFamily: "Indie-Flower",
  },
});
