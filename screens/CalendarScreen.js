import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import HeaderReturn from "../components/HeaderReturn";
import SmallButton from "../components/buttons/SmallButton";
import CalendarContainer from "../components/CalendarContainer";
import DateSelector from "../components/CalendarPicker";
import { useDispatch } from "react-redux";
import { addDate } from "../reducers/hobbiesReducer";
import React, { useState } from "react";
import moment from "moment";
import "moment/locale/fr";

export default function CalendarScreen({ navigation }) {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const [disabled, setDisabled] = useState(false);// état initialisé  disabled=désactivé//

  const [fontsLoaded] = useFonts({
    "Indie-Flower": require("../assets/fonts/IndieFlower-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const onDateChange = (date) => {
    const formattedDate = moment(date).locale("fr").format("dddd D MMMM YYYY");
    const formattedDay = moment(date).locale("fr").format("dddd").split(" ");
    console.log("La date sélectionnée : ", formattedDate);
    console.log("Le jour sélectionné : ", formattedDay);
    setSelectedDate(moment(date));
    
  };

  const handleValidate = () => {
    if(selectedDate==null) {
      console.log("Pas de date sélectionnée");
      alert("Pas de date sélectionnée");
      setDisabled(true);// état initialisé  disabled=désactivé//
    } else {
    console.log("La date qui est dans le reducer", selectedDate);
    // Convertir la date en tant que chaîne au Redux store
    const dateStr = selectedDate.toISOString();
    dispatch(addDate(dateStr));
    navigation.navigate("Who");
    setDisabled(false);// état initialisé activé//
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#D9F2B1", "transparent"]}
        style={styles.background}
      >
        <HeaderReturn iconContext="profil" pages="Profil" isNeeded={true} />

        <View style={styles.bodyContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Quand voulez-vous pratiquer votre activité ?
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <DateSelector
              setSelectedDate={setSelectedDate}
              onDateChange={onDateChange}
            />
            {selectedDate && (
              <Text style={styles.textCalendar}>
                Date sélectionnée :{" "}
                {moment(selectedDate).locale("fr").format("dddd D MMMM YYYY")}
              </Text>
            )}
          </View>

          <View style={styles.validateContainer}>
            <SmallButton title="Valider" onPress={()=>handleValidate()} disabled={disabled}/>
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
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: "Indie-Flower",
    color: "#004644",
    textAlign: "center",
  },
  infoContainer: {
    height: "60%",
    width: "100%",
    alignItems: "center",
    justifyContent: "top",
    margin: 0,
    paddingBottom: 0,
  },
  validateContainer: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    bottom: 15,
  },
});
