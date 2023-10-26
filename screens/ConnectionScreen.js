import { View, StyleSheet, Text, KeyboardAvoidingView } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import HeaderReturn from "../components/HeaderReturn";
import SmallButton from "../components/buttons/SmallButton";
import InputWithLabel from "../components/inputs/InputWithLabel";
//pour créer un état et stocker la valeur de l'état
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmail } from "../reducers/userReducer";

//pris sur emailregex.com
const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function FirstConnectionScreen({ navigation }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);

  const [mail, setMail] = useState("");
  const [emailError, setMailError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [isAllowed, setIsAllowed] = useState(false);

  const Valider = "Valider";
  const EmailPlaceholder = "Entrer votre adresse mail";
  const Password = "Entrer votre mot de passe";
  const EmailLabel = "Mail";
  const PasswordLabel = "Mot de passe";

  const [fontsLoaded] = useFonts({
    "Indie-Flower": require("../assets/fonts/IndieFlower-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  //inspiration morningnews
  const handleConnection = () => {
    console.log("E-mail:", mail);
    console.log("Password:", password);
    console.log("isAllowed:", isAllowed);

    if (EMAIL_REGEX.test(mail) && password.length >= 6) {
      console.log("Conditions remplies.");

      const userData = {
        email: mail,
        password: password,
      };
      fetch("https://backend-freetime.vercel.app/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.result) {
            dispatch(addEmail(mail));
            console.log("ici");
            navigation.navigate("Profil");
          } else {
            console.log(
              "Échec de la connexion. Message d'erreur du serveur : ",
              data.error
            );
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la requête POST :", error);
        });
    } else {
      console.log("Champs vides ou conditions non remplies.");
      setMailError(true);
      setPasswordError(true);
      setIsAllowed(false);
      setMail("");
      setPassword("");
    }
  };
  /* connecter avec une adresse mail et mot de passe déjà enregistré ???
  useEffect(() => {
    user.email && user.password && navigation.navigate('Profil');
  }, []);
  */

  //text affiché dans le bouton et placeholder des inputs

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient
        colors={["#D9F2B1", "transparent"]}
        style={styles.background}
      >
        <HeaderReturn pages="Home" isNeeded={true} />

        <View style={styles.InputsContainer}>
          <Text style={styles.title}>Se connecter avec une adresse mail</Text>

          <InputWithLabel
            placeholder={EmailPlaceholder}
            label={EmailLabel}
            onChangeText={(value) => setMail(value)}
            value={mail}
            icon={false}
            autoComplete="email"
            keyboardType="email-address"
          />

          <InputWithLabel
            placeholder={Password}
            label={PasswordLabel}
            icon={false}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry
          />

          {(emailError || passwordError) && (
            <Text style={styles.TextError}>Erreur mot de passe ou mail ?</Text>
          )}
        </View>

        {isAllowed ? (
          <View style={styles.buttonContainer}>
            <SmallButton
              title={Valider}
              onPress={() => navigation.navigate("Connection")}
            />
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <SmallButton title={Valider} onPress={handleConnection} />
          </View>
        )}
      </LinearGradient>
    </KeyboardAvoidingView>
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

  TextError: {
    color: "#da122a",
    fontFamily: "Indie-Flower",
    marginBottom: 10,
  },
});
