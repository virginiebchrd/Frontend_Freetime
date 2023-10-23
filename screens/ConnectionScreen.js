import { View, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import HeaderReturn from "../components/HeaderReturn";
import SmallButton from "../components/buttons/SmallButton";
import InputWithLabel from "../components/inputs/InputWithLabel";
//--testing areas
import BasicInput from "../components/inputs/BasicInput";


export default function FirstConnectionScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Indie-Flower": require("../assets/fonts/IndieFlower-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  //text affiché dans le bouton et placeholder des inputs 
  const valider = "Valider";
  const EmailPlaceholder = "Entrer votre adresse mail";
  const Password = "Entrer votre mot de passe";
  const EmailLabel = "Mail";
  const PasswordLabel = "Mot de passe";

  //zone test
  const Test = "test";
  
  //la fonction qui est utilisé dans le bouton
  const handleSignIn = () => {
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
             
          <Text style={styles.title}>Se connecter avec une adresse mail</Text>

          <InputWithLabel 
          placeholder={EmailPlaceholder} 
          label={EmailLabel}  
          icon={true}/>

          <InputWithLabel 
          placeholder={Password} 
          label={PasswordLabel}  
          icon={false}/>

          <Text style={styles.Text}>Mot de passe oublié?</Text>
        </View>
        <View style={styles.buttonContainer}>
          <SmallButton
            title={valider}
            onPress={() => navigation.navigate("Who")}
          />
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
    top: 10,
  },
  buttonContainer: {
    height: "20%",
    width: 500,
    alignItems: "center",
    marginBottom: 0,
  },
  title: {
    color: "#004644",
    fontFamily: "Indie-Flower",
    fontSize: 20,
    marginBottom: 10,
  },

  Text: {
    color: "#da122a",
    fontFamily: "Indie-Flower",
    marginBottom: 10,
  },

});
