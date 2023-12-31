import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import HeaderReturnWithInput from "../components/HeaderReturnWithInput";
import SmallButton from "../components/buttons/SmallButton";
import EmailInput from "../components/inputs/EmailInput";
import PasswordInput from "../components/inputs/PasswordInput";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmail, login } from "../reducers/userReducer";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function ConnectionScreen({ navigation }) {
  const dispatch = useDispatch();

  const [mail, setMail] = useState("");
  const [emailError, setMailError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [isAllowed, setIsAllowed] = useState(false);

  const Valider = "Valider";

  const [fontsLoaded] = useFonts({
    "Indie-Flower": require("../assets/fonts/IndieFlower-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleConnection = () => {
    Keyboard.dismiss();

    if (EMAIL_REGEX.test(mail)) {
      const userData = {
        email: mail,
        password: password,
      };
      fetch(`https://backend-freetime.vercel.app/users/signin/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(addEmail(data.email));
            fetch(
              `https://backend-freetime.vercel.app/users/identity/${data.token}`
            )
              .then((response) => response.json())
              .then((data) => {
                if (data.result) {
                  dispatch(
                    login({
                      token: data.identity.token,
                      firstname: data.identity.firstname,
                      lastname: data.identity.lastname,
                    })
                  );

                  navigation.navigate("Profil");
                } else {
                  console.log("error identity", data.error);
                }
              });
          } else {
            console.log(
              "Échec de la connexion. Message d'erreur du serveur : ",
              data.error
            );
            setMailError(true);
            setPasswordError(true);
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la requête POST :", error);
        });
    } else {
      setMailError(true);
      setPasswordError(true);
      setIsAllowed(false);
      setMail("");
      setPassword("");
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
            <View style={styles.InputsContainerCSS}>
              <Text style={styles.title}>
                Se connecter avec une adresse mail
              </Text>

              <EmailInput
                onChangeText={(value) => setMail(value)}
                value={mail}
                onFocus={() => setMailError(false)}
              />

              <Text style={styles.title}>Mot de passe</Text>

              <PasswordInput
                style={styles.PasswordInput}
                onChangeText={(value) => setPassword(value)}
                onFocus={() => setPasswordError(false)}
              />

              {(emailError || passwordError) && (
                <Text style={styles.TextError}>
                  Erreur mot de passe ou mail ?
                </Text>
              )}
            </View>
            <View style={styles.AjustementContainer}></View>
            {isAllowed && !emailError && !passwordError ? (
              <View style={styles.validateContainer}>
                <SmallButton
                  style={styles.Btn}
                  title={Valider}
                  onPress={onPress}
                />
              </View>
            ) : (
              <View style={styles.validateContainer}>
                <SmallButton
                  style={styles.Btn}
                  title={Valider}
                  onPress={handleConnection}
                />
              </View>
            )}
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
    top: 0,
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

  InputsContainerCSS: {
    height: "55%",
    width: "90%",
    alignItems: "center",
    justifyContent: "flex-start",
    top: 30,
    paddingTop: 0,
  },

  PasswordInput: {
    magin: 30,
  },
  AjustementContainer: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  validateContainer: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    bottom: -10,
  },

  title: {
    color: "#004644",
    fontFamily: "Indie-Flower",
    fontSize: 20,
    textAlign: "center",
    top: -5,
    bottom: 15,
  },
  label: {
    color: "#004644",
    fontFamily: "Indie-Flower",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    fontWeight: "600",
  },
  TextError: {
    color: "#da122a",
    fontFamily: "Indie-Flower",
    marginBottom: 10,
  },
});
