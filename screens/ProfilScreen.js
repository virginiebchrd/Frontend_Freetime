import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HeaderReturn from "../components/HeaderReturn";
import SmallButton from "../components/buttons/SmallButton";
import CheckBoxContainer from "../components/CheckBoxContainer";
import { storeHobbiesSaved } from "../reducers/hobbiesReducer";

export default function ProfilScreen({ navigation }) {

  const dispatch = useDispatch();
  const hobbies = useSelector((state) => state.hobbies.value.hobbies);

  const hobbiesSavedProfil = useSelector((state) => state.hobbies.value.hobbiesSaved);

  const userFirstname = useSelector((state) => state.user.value.firstname);
  const token = useSelector((state) => state.user.value.token);
  const userLastname = useSelector((state) => state.user.value.lastname);
  const userEmail = useSelector((state) => state.user.value.email);

  const [hobbiesSaved, setHobbiesSaved] = useState(false);

  const [activitiesData, setActivitiesData] = useState([]);

  let activities;

  const [fontsLoaded] = useFonts({
    "Indie-Flower": require("../assets/fonts/IndieFlower-Regular.ttf"),
  });

  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const response = await fetch(
          `https://backend-freetime.vercel.app/hobbies/users/${token}`
        );
        const data = await response.json();
        if (data.result) {
          if(data.hobbies.length > 0){
            console.log("hobbiesFetch", data.hobbies);
            
            const idArray = data.hobbies.map((hobbiesSaved) =>{
              return hobbiesSaved._id
            })
            dispatch(storeHobbiesSaved(idArray))
            console.log('hobbies Saved Prodil', hobbiesSavedProfil);
            
            setActivitiesData(data.hobbies);
            setHobbiesSaved(true);
          }
        } else {
          if (data.error === "no hobbies") {
            console.log("nohobbies");
            setHobbiesSaved(false);
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des hobbies :", error);
      }
    };

    fetchHobbies();
  }, [hobbies]);

  const handleValidate = () => {
    navigation.navigate("Calendar");
  };

  if (hobbiesSaved) {
    activities = activitiesData.map((data, i) => {
         return (
          <CheckBoxContainer 
            key={i} 
            activityName={data.name} 
            activity={{key:i, 
                    id:data._id, 
                    activityName: data.name, 
                    email:data.email, 
                    adress: data.address.street, 
                    zipCode: data.address.zipCode, 
                    phoneNumber: data.phoneNumber, 
                    city: data.address.city, 
                    activity: data.category, 
                    latitude: data.address.latitude, 
                    longitude: data.address.longitude, 
                    site: data.site, 
                    resultPages: false, 
                    pinColor: 'red'
                    }} />
         );
       });
  }
  else {
    activities = 
    <View style={styles.noHobbiesContainer}>
      <Text style={styles.oldActivities}>Pas d'activités sauvegardées</Text>
    </View>
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#D9F2B1", "transparent"]}
        style={styles.background}
      >
        <HeaderReturn isNeeded={true} iconContext="logout" pages="ComeFromProfil" />

        <View style={styles.bodyContainer}>
          <View style={styles.titleContainer}>
            <FontAwesome name="user" size={75} color="#004644" />
            <Text style={styles.title}>
              {userFirstname && userLastname
                ? `Welcome, ${userFirstname} ${userLastname}`
                : `Welcome, ${userEmail}`}
            </Text>
          </View>

          <Text style={styles.oldActivities}>Anciennes activités :</Text>
        </View>
        <ScrollView>
          <View style={styles.scrollView}>{activities}</View>
        </ScrollView>

        <View style={styles.validateContainer}>
          <SmallButton style={styles.btn}  title="Valider" onPress={handleValidate} />
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
    fontSize: 15,
    color: "#004644",
  },
  validateContainer: {
    height: "17%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    top: 5,
  },
});
