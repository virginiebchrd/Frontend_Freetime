import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HeaderReturn from "../components/HeaderReturn";
import SmallButton from "../components/buttons/SmallButton";
import BasicInput from "../components/inputs/BasicInput";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { useDispatch, useSelector } from "react-redux";
import {
  addLastname,
  addFirstname,
  addBirthday,
  addCivility,
  login,
} from "../reducers/userReducer";
import DatePickerModal from "react-native-modal-datetime-picker";

export default function CreateProfilScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  // récupérer le token de l'utilisateur
  const userToken = useSelector((state) => state.user.value.token);

  //const token = "QaQXXj_50JZyMv2cnNXSWUxlye1l7zOO";

  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [birthday, setBirthday] = useState(""); //format jj/mm/aaaa
  const [civility, setCivility] = useState("");

  //date format
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  //control errors
  const [birthdayError, setBirthdayError] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [civilityError, setCivilityError] = useState("");

  const [fontsLoaded] = useFonts({
    "Indie-Flower": require("../assets/fonts/IndieFlower-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  //Fonction pour afficher ou cacher le sélecteur de date

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    console.log("Une date a été sélectionnée : ", selectedDate);
    hideDatePicker();
    // Format date: jj/mm/aaaa
    const formattedDate = `${selectedDate.getDate()}/${
      selectedDate.getMonth() + 1
    }/${selectedDate.getFullYear()}`;

    // add date dans le redux store
    setBirthday(formattedDate);
  };

  const handleValidate = () => {
    //if (token !== "QaQXXj_50JZyMv2cnNXSWUxlye1l7zOO") {  //
    // Si le token n'est pas valide, sortir de la fonction
    /*if (token !== userToken) {
        console.log("Token invalide");
        return;
      }*/

    if (lastname && firstname && civility) {
      /*console.log("Civilité :", civility);
      console.log("Nom :", lastname);
      console.log("Prénom :", firstname);
      console.log("Date de naissance :", birthday);*/
      // navigation.navigate("Profil");
    } else {
      console.log("Champs * vides !");
      setBirthdayError("");
      setFirstnameError("");
      setLastnameError("");
      setCivilityError("");
    }

    // fetch(`https://backend-freetime.vercel.app/users/identity/QaQXXj_50JZyMv2cnNXSWUxlye1l7zOO`, {
    fetch(`https://backend-freetime.vercel.app/users/identity/${userToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //Authorization: `Bearer ${token}`}, // Ajoutez le token dans l'en-tête Authorization
      body: JSON.stringify({
        civility: civility,
        lastname: lastname,
        firstname: firstname,
        /*birthday: birthday*/
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data Create", data);
        console.log(data.result);

        if (data.result) {
          console.log(data.identity.firstname);
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
          console.log("Conditions non remplies.");
        }
        // console.log(data);
        //if (data.result === true) {
        //  navigation.navigate("Profil");

        //} else {
        //  console.error(data.error);
        //  console.log("Conditions non remplies.");
        //  }
      });
  };

  return (
    <LinearGradient
      colors={["#D9F2B1", "transparent"]}
      style={styles.background}
    >
      <HeaderReturn pages="ComeFromProfil" isNeeded={true} />
      <TouchableWithoutFeedback onPress={() => {}}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.bodyContainer}>
            <View style={styles.titleContainer}>
              <FontAwesome name="user" size={75} color="#004644" />
              <Text style={styles.title}>Création du profil</Text>
            </View>

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
                    <Text style={styles.civilityText}> Monsieur </Text>
                  </View>
                  <View style={styles.CheckboxMadame}>
                    <Checkbox
                      value={civility === "Madame"}
                      onValueChange={() => setCivility("Madame")}
                      color="#004644"
                    />
                    <Text style={styles.civilityText}> Madame </Text>
                  </View>
                </View>
              </View>

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
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 0,
    padding: 0,
  },
  titleContainer: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 22,
    fontFamily: "Indie-Flower",
    color: "#004644",
    paddingTop: 30, // 20
  },
  infoContainer: {
    height: "65%", //60%
    width: "100%",
    alignItems: "center",
    justifyContent: "center",

    padding: 10,
    margin: 0,
  },
  civilityContainer: {
    height: "35%", // à la place de 25%
    width: "65%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBlockColor: "#004644",
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 10,
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
  },
  validateContainer: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    bottom: 35,
  },
  CheckboxMonsieur: {
    flexDirection: "row",
    alignItems: "center",
    // margin: 10,
  },
  CheckboxMadame: {
    flexDirection: "row",
    alignItems: "center",
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
  datebtn: {
    padding: 10,
    borderWidth: 2,
    borderColor: "#76a696",
    backgroundColor: "#fff",
  },
});
