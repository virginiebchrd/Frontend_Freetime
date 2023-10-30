import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import HeaderReturn from "../components/HeaderReturn";
import SmallButton from "../components/buttons/SmallButton";
import Activity from "../components/Activity";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeHobbies } from "../reducers/hobbiesReducer";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import StarsMarks from "../components/StarsMarks";

export default function MarksScreen({ navigation, route }) {
  const dataActivity = route.params.activity;
  const dispatch = useDispatch();
  console.log("share", dataActivity);

  const [personnalMark, setPersonnalMark] = useState(0);
  const [averageMark, setAverageMark] = useState(0);

  const hobbies = useSelector((state) => state.hobbies.value.hobbies);
  const [fontsLoaded] = useFonts({
    "Indie-Flower": require("../assets/fonts/IndieFlower-Regular.ttf"),
  });

  //UseEffect pour récupérer la note moyenne au démarraeg et a chaque nouvelle note personnelle
  useEffect(() => {
    fetch(
      `https://backend-freetime.vercel.app/hobbies/averageMarks/${dataActivity.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("ave", data);
        const dataAverage = data.average;
        const average = dataAverage.find((e) => e._id === dataActivity.id);
        console.log(average);
        setAverageMark(average.avgRating);
      });
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const handleStart = (num) => {
    console.log(num);

    //fetch(`http://192.168.1.12:3000/hobbies/rating/${dataActivity.id}`,{
    fetch(
      `https://backend-freetime.vercel.app/hobbies/rating/${dataActivity.id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ myMark: num + 1 }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPersonnalMark(data.yourMark);
      });
  };

  let myMark = [];
  for (let i = 0; i < 5; i++) {
    let styleBlue = {};
    if (i < personnalMark) {
      styleBlue = "red";
    } else {
      styleBlue = "#004644";
    }
    myMark.push(
      <StarsMarks key={i} style={styleBlue} onPress={() => handleStart(i)} />
    );
  }

  let markAverage = [];
  for (let i = 0; i < 5; i++) {
    let styleBlue;
    if (i <= averageMark - 1) {
      styleBlue = "red";
    } else {
      styleBlue = "#004644";
    }
    markAverage.push(<StarsMarks key={i} style={styleBlue} />);
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#D9F2B1", "transparent"]}
        style={styles.background}
      >
        <HeaderReturn iconContext="profil" pages="Profil" isNeeded={true} />

        <View style={styles.bodyContainer}>
          <Text style={styles.title}>Noter votre activité</Text>

          <View style={styles.mapContainer}>
            <MapView
              initialRegion={{
                latitude: dataActivity.latitude,
                longitude: dataActivity.longitude,
                latitudeDelta: 0.025,
                longitudeDelta: 0.025,
              }}
              style={styles.map}
            >
              <Marker
                coordinate={{
                  latitude: dataActivity.latitude,
                  longitude: dataActivity.longitude,
                }}
                pinColor={dataActivity.colorPin}
              />
            </MapView>
          </View>
          <View style={styles.activityContainer}>
            <Activity {...route.params} />
          </View>

          <View>
            <Text style={styles.text}>Ma note</Text>
          </View>
          <View style={styles.myMarkContainer}>
            {myMark}
            <Text style={styles.text}>{personnalMark}/5</Text>
          </View>
          <View>
            <Text style={styles.text}>Note moyenne</Text>
          </View>
          <View style={styles.markAverageContainer}>
            {markAverage}
            <Text style={styles.text}>{averageMark}/5</Text>
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
    height: "5%",
    width: "60%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 1,
    backgroundColor: "#004644",
    borderRadius: 20,
    borderColor: "#004644",
  },
  returnText: {
    fontSize: 18,
    fontFamily: "Indie-Flower",
    color: "#cae1db",
  },
  title: {
    fontSize: 22,
    fontFamily: "Indie-Flower",
    color: "#004644",
    marginTop: 15,
    marginBottom: 15,
  },
  mapContainer: {
    height: "30%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    height: "100%",
    width: "100%",
  },
  activityContainer: {
    height: "30%",
    width: "90%",
    marginTop: 15,
    marginBottom: 15,
  },
  myMarkContainer: {
    height: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  markAverageContainer: {
    height: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 22,
    fontFamily: "Indie-Flower",
    color: "#004644",
    marginLeft: 20,
  },
});
