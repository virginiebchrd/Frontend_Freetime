import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HeaderReturn from "../components/HeaderReturn";
import SmallButton from "../components/buttons/SmallButton";
import BasicInput from "../components/inputs/BasicInput";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";



export default function CreateProfilScreen({ navigation }) {
 
 const[lastname, setlastname] = useState("");
 const[firstname, setfirstname] = useState("");
 const[birthday, setbirthday] = useState("");
 const[civilite, setcivilite] = useState("Monsieur");

  const [fontsLoaded] = useFonts({
    "Indie-Flower": require("../assets/fonts/IndieFlower-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  const lastnamePlaceholder = 'Lastname *';
  const fisrtnamePlaceholder = 'Fisrtname *';
  const birthdayPlaceholder = 'Birthday date';

  const handleValidate = () => {
    //dispatch activité
    navigation.navigate("Profil");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#D9F2B1", "transparent"]}
        style={styles.background}
      >
        <HeaderReturn pages="ComeFromProfil" />

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
              <View style={styles.CheckboxMonsieur} >
                    <Checkbox value={true}  color="#004644" />
                    <Text style={styles.civilityText}> Monsieur</Text>
                </View>
                <View style={styles.CheckboxMadame} >
                    <Checkbox value={false} color="#004644"  style={{ backgroundColor: '#fff' }}  />
                    <Text style={styles.civilityText}> Madame </Text>
                </View>
              </View>
            </View>
            <BasicInput style={styles.lastname} placeholder={lastnamePlaceholder}/>
            <BasicInput style={styles.fisrtname} placeholder={fisrtnamePlaceholder}/>
            <BasicInput style={styles.birthday} placeholder={birthdayPlaceholder}/>
          </View>

          <View style={styles.validateContainer}>
            <SmallButton title="Valider" onPress={handleValidate} />
          </View>
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
  bodyContainer: {
    height: "80%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
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
  },
  infoContainer: {
    height: "60%", //60%
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  civilityContainer: {
    width: "80%",
    flexDirection: "row", //
    alignItems: "center", //
    justifyContent: "space-between", //
    borderBlockColor: "#004644",
    borderRadius: 10,
    borderWidth: 2,
    margin: 20,
    padding: 0,
    backgroundColor: "#CAE1DB",
  },
  leftCivilityContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 20,
  },
  rightCivilityContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    marginRight: 10,
    padding: 30,
  },
  validateContainer: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  CheckboxMonsieur:{
    flexDirection: "row", 
    alignItems: "center", 
    margin: 10,
  },
  CheckboxMadame:{
    flexDirection: "row", 
    alignItems: "center", 
  },
civilityText:{
    fontSize: 16,
    fontFamily: "Indie-Flower",
    color: "#004644",
},
});

/*
 <View>
     <Checkbox
      value={isChecked}
      onValueChange={toggleCheckbox("Monsieur")}
      >
     <Text> {isChecked ? "Oui" : "Non"} Monsieur</Text>
     </View>
 <View>
        <Checkbox value={isChecked} onValueChange={toggleCheckbox("Madame")} />
       <Text> {isChecked ? "Oui" : "Non"} Madame</Text>
 </View>
*/
