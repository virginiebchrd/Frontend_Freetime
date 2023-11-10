import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import "moment/locale/fr";
import { LinearGradient } from "expo-linear-gradient";

const DateSelector = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  moment.updateLocale("fr", {
    week: {
      dow: 1,
      doy: 4,
    },
    weekdays: [
      "Dimanche",
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

  // const handleDateChange = (date) => {
  //   const formattedDate = moment(date).locale("fr").format("dddd D MMMM YYYY");
  //   const formattedDay = moment(date).locale("fr").format("dddd").split(" ");
  //   console.log("La date sélectionnée : ", formattedDate);
  //   console.log("Le jour sélectionné : ", formattedDay);
  //   setSelectedDate(date);

  //   onDateChange(date);
  // };

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
