import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import { addEmail, login } from "../reducers/userReducer";
import HeaderReturnWithInput from "../components/HeaderReturnWithInput";
import SmallButton from "../components/buttons/SmallButton";
import EmailInput from "../components/inputs/EmailInput";
import PasswordInput from "../components/inputs/PasswordInput";

const BACKEND_ADDRESS = "http://192.168.0.12:3000";
const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function FirstConnectionScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const Valider = "Valider";

  const fontsLoaded = useFonts({
    "Indie-Flower": require("../assets/fonts/IndieFlower-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  const handleRegister = () => {
    if (EMAIL_REGEX.test(mail)) {

      if (password !== passwordConfirmation) {
        setPasswordError(true);
        setDisabled(true);
      } else {
        setPasswordError(false);
        setDisabled(false);
      }

      if (password === passwordConfirmation) {
        fetch(`https://backend-freetime.vercel.app/users/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: mail, password: password }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.result === true) {
              dispatch(addEmail(data.email));
              dispatch(
                login({ token: data.token, lastname: "", firstname: "" })
              );

              navigation.navigate("CreateProfil");
            } else {
              console.error(data.error);
              setEmailError(true);
            }
          });
      }
    } else {
      console.error("Champs vides ou conditions non remplies.");
      setEmailError(true);
    }
  };

  return (
    <LinearGradient
      colors={["#D9F2B1", "transparent"]}
      style={styles.background}
    >
      <HeaderReturnWithInput pages="Home" isNeeded={true} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.containerKeyboard}
        >
          <View style={styles.container}>
            <View style={styles.TextContainerCSS}></View>
            <Text style={styles.title}>Se connecter avec une adresse mail</Text>

            <EmailInput
              style={styles.EmailInput}
              onChangeText={(value) => setMail(value)}
              value={mail}
              onFocus={() => {setEmailError(false)}}
            />

            <View style={styles.textErrorContainer}>
              {emailError && (
                <Text style={styles.TextError}>
                  votre email n'est pas valide!
                </Text>
              )}
            </View>
            
            <Text style={styles.title}>Saisir votre mot de passe</Text>

            <PasswordInput
              style={styles.PasswordInput}
              onChangeText={(value) => setPassword(value)}
              value={password}
              onFocus={() => {setPasswordError(false)}}
            />

            <Text style={styles.title}>Confirmer votre mot de passe</Text>

            <PasswordInput
              style={styles.PasswordInput}
              onChangeText={(value) => setPasswordConfirmation(value)}
              value={passwordConfirmation}
              onFocus={() => {setPasswordError(false)}}
            />

            {passwordError && (
              <Text style={styles.TextError}>
                Le mot de passe n'est pas identique !
              </Text>
            )}

            <View style={styles.validateContainer}>
              <SmallButton
                style={styles.btn}
                title={Valider}
                onPress={() => handleRegister()}
                disabled={disabled}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    padding: 0,
  },

  background: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  containerKeyboard: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    top: 0,
  },

  validateContainer: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "fex-end",
    bottom: 0,
    paddingTop: 10,
  },

  title: {
    color: "#004644",
    fontFamily: "Indie-Flower",
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "center",
  },

  TextError: {
    color: "#da122a",
    fontFamily: "Indie-Flower",
    marginBottom: 5,
  },
  PasswordInput: {},
  EmailInput: {
    margin: 5,
  },
});
