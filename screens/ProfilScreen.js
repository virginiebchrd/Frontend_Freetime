import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HeaderReturn from "../components/HeaderReturn";
import SmallButton from "../components/buttons/SmallButton";
import ChooseActivity from "../components/ChooseActivity";
import { addFirstname } from "../reducers/userReducer";
export default function ProfilScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Indie-Flower": require("../assets/fonts/IndieFlower-Regular.ttf"),
  });

  const hobbies = useSelector((state) => state.hobbies.value.hobbies);
  const user = useSelector((state) => state.user);
  
  const dispatch = useDispatch();
  const userFirstname = user.value.firstname;
  // const token = useSelector((state)=> state.user.value.token);
  const token = "EnV8RoBmpHTaLSBCV7qvgHHD58SeazTH";

  const [activitiesData, setActivitiesData] = useState([]);

  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const response = await fetch(
          `https://backend-freetime.vercel.app/hobbies/users/${token}`
        );
        const data = await response.json();
        console.log("data", data);
        if (data.result) {
          console.log("hobbies", data.hobbies);
          setActivitiesData(data.hobbies);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des hobbies :", error);
      }
    };

    fetchHobbies();
  }, []);

  const handleValidate = () => {
    //dispatch activité
    navigation.navigate("Calendar");
  };
  const activities = activitiesData.map((data, i) => {
    const isChecked = hobbies.some((e) => e === data._id);
    return (
      <ChooseActivity
        key={i}
        activityName={data.name}
        id={data._id}
        isChecked={isChecked}
      />
    );
  });
  
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#D9F2B1", "transparent"]}
        style={styles.background}
      >
        <HeaderReturn icon="logout" pages="ComeFromProfil" />

        <View style={styles.bodyContainer}>
          <View style={styles.titleContainer}>
            <FontAwesome name="user" size={75} color="#004644" />
            <Text style={styles.title}>{`Welcome, ${userFirstname}`}</Text>
          </View>

          <Text style={styles.oldActivities}>Anciennes activités :</Text>
        </View>
        <ScrollView>
          <View style={styles.scrollView}>{activities}</View>
        </ScrollView>

        <View style={styles.validateContainer}>
          <SmallButton title="Valider" onPress={handleValidate} />
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
    alignItems: "center",
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontFamily: "Indie-Flower",
    color: "#004644",
    marginTop: 20,
    marginBottom: 20,
  },
  scrollView: {
    height: "40%",
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  oldActivities: {
    marginBottom: 10,
    fontFamily: "Indie-Flower",

    color: "#004644",
  },
  validateContainer: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
