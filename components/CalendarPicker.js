import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import "moment/locale/fr";
import { LinearGradient } from "expo-linear-gradient";

const DateSelector = ({onDateChange} ) => {
  // Utilisez le hook useState pour créer un état 'selectedStartDate' avec une valeur initiale de null
  const [selectedStartDate, setSelectedStartDate] = useState(null);

  const [selectedDate, setSelectedDate] = useState(new Date());

  moment.updateLocale("fr", {
    week: {
      dow: 1, // Lundi est le premier jour de la semaine
      doy: 4, // Le 1er jour de l'année est le jeudi
    },
    weekdays: [
      "Diminche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ],
    months: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
  });

  const handleDateChange = (date) => {
    const formattedDate = moment(date).locale("fr").format("dddd D MMMM YYYY");
    const formattedDay = moment(date).locale("fr").format("dddd").split(" ");
    console.log("La date sélectionnée : ", formattedDate);
    console.log("Le jour sélectionné : ", formattedDay);
    setSelectedDate(date);
  
    // Appeler la fonction onDateChange du parent avec la date sélectionnée
    onDateChange(date); 
  };
  

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#D9F2B1", "transparent"]}
        style={styles.background}
      >
        <CalendarPicker
          onDateChange={onDateChange}
          format="DD MMMM YYYY"
          locale="fr"
          value={selectedDate}
          selectedDayColor="green"
          weekdays={["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]}
          months={[
            "Janvier",
            "Février",
            "Mars",
            "Avril",
            "Mai",
            "Juin",
            "Juillet",
            "Août",
            "Septembre",
            "Octobre",
            "Novembre",
            "Décembre",
          ]}
          previousTitle="◄"
          nextTitle="►"
        />
      
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    margin: 0,
  },
  textCalendar: {
    fontSize: 14,
    color: "#004644",
    textAlign: "center",
  },
});

export default DateSelector;
/* la date sous forme d'un tableau: 
Array(1)
0: object
ouverture: Array(2)
 0:"mardi"
 1: "mercredi"
 */
