import React, { useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import { addEmail, addPassword, login } from "../reducers/userReducer";
import HeaderReturn from "../components/HeaderReturn";
import SmallButton from "../components/buttons/SmallButton";
import  BasicInput  from "../components/inputs/BasicInput";
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function FirstConnectionScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const fontsLoaded = useFonts({
    "Indie-Flower": require("../assets/fonts/IndieFlower-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  //inspiration morningnews
  const handleRegister = () => {
    console.log("E-mail:", mail);
    console.log("Password:", password);

    if (EMAIL_REGEX.test(mail) && password.length >= 6) {
      console.log("Conditions remplies.");

      // Dispatch actions to store the email and password
      dispatch(addEmail(mail));
      dispatch(addPassword(password));

      console.log("Enregistrement effectué avec succès.");
      console.log("E-mail enregistré:", mail);
      console.log("Mot de passe enregistré:", password);

      // Navigate to the 'Profil' screen
      navigation.navigate("Profil");
    } else {
      console.log("Champs vides ou conditions non remplies.");
      setEmailError(!EMAIL_REGEX.test(mail));
      setPasswordError(password.length < 6);
    }
  };

  const Valider = "Valider";
  const EmailPlaceholder = "Entrer votre adresse mail";
  const PasswordLabel = "Entrer votre mot de passe";
  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient
        colors={["#D9F2B1", "transparent"]}
        style={styles.background}
      >
        <HeaderReturn icon="logout" pages='Home'/>

          <Text style={styles.title}>Se connecter avec une adresse mail</Text>

          <BasicInput 
            placeholder={EmailPlaceholder}
            label="Mail"
            onChangeText={(value) => setMail(value)}
            value={mail}
            icon={false}
            autoComplete="email"
            keyboardType="email-address"
            
          />

          <BasicInput 
            placeholder={PasswordLabel}
            label={PasswordLabel}
            onChangeText={(value) => setPassword(value)}
            value={password}
            secureTextEntry
          />
       
          <Text style={styles.title}>
            Confirmer votre mot de passe
          </Text>

            <BasicInput
              placeholder={PasswordLabel}
              label={PasswordLabel}
              onChangeText={(value) => setPassword(value)}
              value={password}
              secureTextEntry
            />

          {passwordError && (
            <Text style={styles.TextError}>
              Le mot de passe n'est pas identique !
            </Text>
          )}

        
          <SmallButton title={Valider} onPress={handleRegister} />
    
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
