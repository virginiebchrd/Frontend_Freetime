import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";

import { useState } from "react";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HeaderReturn from "../components/HeaderReturn";
import SmallButton from "../components/buttons/SmallButton";

export default function ProfilScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Indie-Flower": require("../assets/fonts/IndieFlower-Regular.ttf"),
  });
  const [token, setToken] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const user = useSelector((state) => state.user);

  if (!fontsLoaded) {
    return null;
  }

  const fetchHobbies = async () => {
    try {
      const response = await fetch(
        `https://backend_freetime.vercel.app/hobbies/${token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setHobbies(data.hobbies);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des hobbies :", error);
    }
  };
  // useEffect(() => {
  //   fetchHobbies();
  // }, [token]);

  const handleValidate = () => {
    //dispatch activité
    navigation.navigate("Calendar");
  };


    return (
        <View style={styles.container}>
            <LinearGradient colors={['#D9F2B1', 'transparent']}  style={styles.background} >
                <HeaderReturn icon="logout" pages='ComeFromProfil' isNeeded={true} />



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
            <Text style={styles.title}>{user.username}</Text>
          </View>
          
          <Text>Hobbies :</Text>
          <View style={styles.hobbiesContainer}>
            
            {hobbies.map((hobby) => (
              <Text key={hobby._id}>{hobby.name}</Text>
            ))}
            <View style={styles.infoContainer}></View>

            <View style={styles.validateContainer}>
              <SmallButton title="Valider" onPress={handleValidate} />
            </View>
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
    height: "60%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  validateContainer: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
