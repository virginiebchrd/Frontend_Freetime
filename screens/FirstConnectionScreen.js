import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmail,
  addFirstname,
  addPassword,
  login,
} from "../reducers/userReducer";
import HeaderReturn from "../components/HeaderReturn";
import SmallButton from "../components/buttons/SmallButton";

import EmailInput from "../components/inputs/EmailInput";
import PasswordInput from "../components/inputs/PasswordInput";

const BACKEND_ADDRESS = "http://192.168.0.12:3000"; //'http://BACKEND_IP:3000';
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
  const [disabled, setDisabled] = useState(false);// état initialisé  disabled=désactivé//
  const Valider = "Valider";
  

  const fontsLoaded = useFonts({
    "Indie-Flower": require("../assets/fonts/IndieFlower-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  //inspiration morningnews
  //premier test en local avec fetch(`http://192.168.0.12:3000/users/signup`,
  const handleRegister = () => {
    //Keyboard.dismiss();
    if (EMAIL_REGEX.test(mail)) {
      console.log("Conditions remplies.");

      if (password !== passwordConfirmation) {
        setPasswordError(true);
        setDisabled(true);// état initialisé  disabled=désactivé//
      } else {
        setPasswordError(false);
        setDisabled(false);// état initialisé activé//
      }

      if (password === passwordConfirmation) { // attention confit entre les état si j'utilise état !disabled !
      fetch(`https://backend-freetime.vercel.app/users/signup`, {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: mail, password: password }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("réponse seveur",data);
          if (data.result === true) {

            console.log('token', data.token);
            dispatch(addEmail(data.email))
            dispatch(login({token: data.token, lastname: "", firstname: ""}));

            navigation.navigate("CreateProfil");
          } else {
            console.error(data.error);
            console.log("Conditions non remplies.");
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
      <HeaderReturn pages="Home" isNeeded={true} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
       <View style={styles.container}>
              
        <Text style={styles.title}>Se connecter avec une adresse mail</Text>

        <EmailInput 
        style={styles.EmailInput}
        onChangeText={(value) => setMail(value)} value={mail} />

          {emailError && (
            <Text style={styles.TextError}>
              votre email n'est pas valide!
            </Text>
          )}

        <Text style={styles.title}>Saisir votre mot de passe</Text>

        <PasswordInput
        style={styles.PasswordInput}
          onChangeText={(value) => setPassword(value)}
          value={password}
        />

          <Text style={styles.title}>Confirmer votre mot de passe</Text>

        <PasswordInput
        style={styles.PasswordInput}
          onChangeText={(value) => setPasswordConfirmation(value)}
          value={passwordConfirmation}
        />

          {passwordError && (
            <Text style={styles.TextError}>
              Le mot de passe n'est pas identique !
            </Text>
          )}

        <View style={styles.validateContainer}>
          <SmallButton style={styles.btn}  title={Valider} onPress={()=>handleRegister()} disabled={disabled} />
        </View>
        </View>

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

  validateContainer: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
  },

  background: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  title: {
    color: "#004644",
    fontFamily: "Indie-Flower",
    fontSize: 20,
    // marginBottom: 10,
    // marginTop: 10,
    textAlign: "center",
  },

  TextError: {
    color: "#da122a",
    fontFamily: "Indie-Flower",
    marginBottom: 5,
  },
  PasswordInput: {
    margin: 5,
  },
  EmailInput: {
    margin:5,
  },
});
