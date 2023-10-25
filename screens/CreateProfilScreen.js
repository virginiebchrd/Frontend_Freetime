import {  Text, View, StyleSheet, SafeAreaView, TextInput, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HeaderReturn from "../components/HeaderReturn";
import SmallButton from "../components/buttons/SmallButton";
import BasicInput from "../components/inputs/BasicInput";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { useDispatch } from "react-redux";
import { addLastname, addFirstname, addBirthday, addCivility } from "../reducers/userReducer";
import DateTimePicker from "react-native-modal-datetime-picker";
import DatePickerModal from "react-native-modal-datetime-picker";


export default function CreateProfilScreen({ navigation }) {
  const dispatch = useDispatch();


 const[lastname, setLastname] = useState("");
 const[firstname, setFirstname] = useState("");
 const[birthday, setBirthday] = useState(""); //format jj/mm/aaaa
 const[civility, setCivility] = useState(""); // false pour "Madame", true pour "Monsieur"

 //date format
 const [date, setDate] = useState(new Date());
 const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
 //control errors
 const [birthdayError, setBirthdayError] = useState('');
 const [firstnameError, setFirstnameError] = useState('');
 const [lastnameError, setLastnameError] = useState('');
 const [civilityError, setCivilityError] = useState('');

  const [fontsLoaded] = useFonts({
    "Indie-Flower": require("../assets/fonts/IndieFlower-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const lastnamePlaceholder = 'Nom *';
  const firstnamePlaceholder = 'Prénom *';
  //const birthdayPlaceholder = 'date de naissance ';
 // const birthdayFormatPlaceholder = 'jj/mm/aaaa';

 // Fonction pour afficher ou cacher le sélecteur de date

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
    const formattedDate = `${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`;
    
    // add date dans le redux store
    setBirthday(formattedDate);
  };
 

  const handleValidate = () => {
    if (lastname && firstname && civility) {
      console.log("Civilité :", civility);
      console.log("Nom :", lastname);
      console.log("Prénom :", firstname);
      console.log("Date de naissance :", birthday);
     dispatch(addCivility(civility));
     dispatch(addLastname(lastname));
     dispatch(addFirstname(firstname));
     dispatch(addBirthday(birthday));
      navigation.navigate("Profil");
    } else {
      console.log("Champs * vides !");
    }
  };

  return (
    <SafeAreaView  style={styles.container}>
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
                  <Checkbox
                        value={civility === "Monsieur"}
                        onValueChange={() => setCivility("Monsieur")}
                        color="#004644"
                      />
                    <Text style={styles.civilityText}> Monsieur</Text>
                </View>
                <View style={styles.CheckboxMadame} >
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
              style={[styles.birthday, { fontFamily: "Indie-Flower" } ]} 
              placeholder='Nom *'
              onChangeText={(value) => setLastname(value)}
              value={lastname}
              />
            <TextInput 
             style={[styles.birthday, { fontFamily: "Indie-Flower" } ]}  
              placeholder="Prénom *"
              onChangeText={(value) => setFirstname(value)}
              value={firstname}
            />
       
              <TextInput 
                style={[styles.birthday, { fontFamily: "Indie-Flower" } ]} 
                placeholder="date de naissance"
                onChangeText={setBirthday}
                value={birthday}
                editable={false} // Pour empêcher la modification directe de l'input                 
              /> 
           <View>
      <Button title="choisir sa date de naissance" onPress={showDatePicker} />
      <DatePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        locale="en_FR"
        display="spinner" 
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
            
              
          </View>

          <View style={styles.validateContainer}>
            <SmallButton title="Valider" onPress={handleValidate} />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView >
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
    height: "80%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 5,
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
  },
  infoContainer: {
    height: "65%", //60%
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    padding: 0,
    margin: 0,
  },
  civilityContainer: {
    height: "25%",
    width: "65%",
    flexDirection: "row", //
    alignItems: "center", //
    justifyContent: "space-between", //
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
    paddingRight: 10,
    paddingBottom:5,
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
birthday: {
  borderWidth: 1,
  borderRadius: 5,
  borderColor: "#004644",
  margin: 5,
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

