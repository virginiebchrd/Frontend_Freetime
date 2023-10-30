import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import { addEmail, addFirstname, addPassword, login } from "../reducers/userReducer";
import HeaderReturn from "../components/HeaderReturn";
import SmallButton from "../components/buttons/SmallButton";
import BasicInput from "../components/inputs/BasicInput";

const BACKEND_ADDRESS = "http://192.168.0.12:3000"; //'http://BACKEND_IP:3000';
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default function FirstConnectionScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const Valider = "Valider";
  const EmailPlaceholder = "Entrer votre adresse mail";
  const PasswordLabel = "Entrer votre mot de passe";

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
      }else {
        setPasswordError(false);
      }
        fetch(`https://backend-freetime.vercel.app/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: mail, password: password }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.result === true) {
            console.log('token', data.token);
            dispatch(login({token: data.token, lastname: "", firstname: ""}));
            navigation.navigate("CreateProfil");
          } else {
            console.error(data.error);
            console.log("Conditions non remplies.");
          }
        });
      } else {
        console.error("Champs vides ou conditions non remplies.");
      setEmailError(true);
      };

  };

  

  return (
    
      <LinearGradient
        colors={["#D9F2B1", "transparent"]}
        style={styles.background}
      >
        <HeaderReturn pages="Home" isNeeded={true} />
        <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
        <Text style={styles.title}>Se connecter avec une adresse mail</Text>

        <BasicInput
          placeholder={EmailPlaceholder}
          onChangeText={(value) => setMail(value)}
          value={mail}
          icon={false}
          autoComplete="email"
          keyboardType="email-address"
        />

      

         <BasicInput
          placeholder={PasswordLabel}
          onChangeText={(value) => setPassword(value)}
          value={password}
          secureTextEntry
        />

        <Text style={styles.title}>Confirmer votre mot de passe</Text>

        <BasicInput
          placeholder={PasswordLabel}
          onChangeText={(value) => setPasswordConfirmation(value)}
          value={password}
          secureTextEntry
        />

        {passwordError && (
          <Text style={styles.TextError}>
            Le mot de passe n'est pas identique !
          </Text>
        )}

        <SmallButton title={Valider} onPress={handleRegister} />
        </KeyboardAvoidingView>
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

  buttonContainer: {
    height: 500,
    width: "100%",
    alignItems: "center",
    marginBottom: 0,
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
    marginBottom: 10,
    textAlign: "center",
  },

  TextError: {
    color: "#da122a",
    fontFamily: "Indie-Flower",
    marginBottom: 10,
  },
});
