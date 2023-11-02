import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HeaderReturnWithInput from "../components/HeaderReturnWithInput";
import SmallButton from "../components/buttons/SmallButton";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/userReducer";

export default function CreateProfilScreen({ navigation }) {
  const dispatch = useDispatch();

  const userToken = useSelector((state) => state.user.value.token);

  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [civility, setCivility] = useState("");

  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [civilityError, setCivilityError] = useState("");

  const [fontsLoaded] = useFonts({
    "Indie-Flower": require("../assets/fonts/IndieFlower-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleValidate = () => {
    if (lastname && firstname && civility) {
    } else {
      setBirthdayError("");
      setFirstnameError("");
      setLastnameError("");
      setCivilityError("");
    }

    fetch(`https://backend-freetime.vercel.app/users/identity/${userToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        civility: civility,
        lastname: lastname,
        firstname: firstname,
      }),
    })
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
          console.error(data.error);
        }
      });
  };

  return (
    <LinearGradient
      colors={["#D9F2B1", "transparent"]}
      style={styles.background}
    >
      <HeaderReturnWithInput pages="ComeFromProfil" isNeeded={true} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.bodyContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.titleContainer}>
            <FontAwesome name="user" size={75} color="#004644" />
            <Text style={styles.title}>Création du profil</Text>
          </View>

          <View style={styles.separationContainer}></View>
          <View style={styles.infoContainer}>
            <View style={styles.civilityContainer}>
              <View style={styles.leftCivilityContainer}>
                <Text style={styles.civilityText}>Civilité* :</Text>
              </View>
              <View style={styles.rightCivilityContainer}>
                <View style={styles.CheckboxMonsieur}>
                  <Checkbox
                    value={civility === "Monsieur"}
                    onValueChange={() => setCivility("Monsieur")}
                    color="#004644"
                  />
                  <Text style={styles.civilityText}> Monsieur</Text>
                </View>
                <View style={styles.CheckboxMadame}>
                  <Checkbox
                    value={civility === "Madame"}
                    onValueChange={() => setCivility("Madame")}
                    color="#004644"
                  />
                  <Text style={styles.civilityText}> Madame</Text>
                </View>
              </View>
            </View>
            <View style={styles.separationContainer}></View>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { fontFamily: "Indie-Flower" }]}
                placeholder="Nom *"
                onChangeText={(value) => setLastname(value)}
                value={lastname}
                placeholderTextColor="#cae1db"
              />
              <TextInput
                style={[styles.input, { fontFamily: "Indie-Flower" }]}
                placeholder="Prénom *"
                onChangeText={(value) => setFirstname(value)}
                value={firstname}
                placeholderTextColor="#cae1db"
              />
            </View>
            <View style={styles.separationContainer}></View>

            <View style={styles.validateContainer}>
              <SmallButton
                style={styles.btn}
                title="Valider"
                onPress={handleValidate}
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
  bodyContainer: {
    height: "82%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    padding: 0,

    top: 0,
  },
  titleContainer: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",

    top: -40,
    margin: 0,
  },
  title: {
    fontSize: 22,
    fontFamily: "Indie-Flower",
    color: "#004644",
    paddingTop: 0,
  },
  infoContainer: {
    height: "65%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
  civilityContainer: {
    height: "25%",
    width: "65%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBlockColor: "#004644",
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 0,
    padding: 0,
    backgroundColor: "#CAE1DB",
  },
  leftCivilityContainer: {
    flex: 1,
    alignItems: "start-align",
    justifyContent: "center",
    margin: 0,
    paddingLeft: 15,
  },
  rightCivilityContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 12,
    paddingBottom: 5,
    paddingTop: 5,
    margin: 0,
  },

  inputContainer: {
    height: "55%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  separationContainer: {
    height: "40",
    width: "100%",
  },

  validateContainer: {
    height: "31%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    bottom: -25,
  },
  CheckboxMonsieur: {
    flexDirection: "row",
    alignItems: "center",
    left: 1,
  },
  CheckboxMadame: {
    flexDirection: "row",
    alignItems: "center",
    left: 0,
  },
  civilityText: {
    fontSize: 16,
    fontFamily: "Indie-Flower",
    color: "#004644",
  },
  input: {
    padding: 10,
    borderWidth: 2,
    borderColor: "#76a696",
    backgroundColor: "#fff",
    borderRadius: 10,
    width: 250,
    marginBottom: 5,
    marginTop: 10,
  },
});
