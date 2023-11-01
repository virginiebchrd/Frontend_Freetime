import { Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import HeaderReturn from "../components/HeaderReturn";
import Activity from "../components/Activity";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StarsMarks from "../components/StarsMarks";

export default function MarksScreen({ route }) {
  const dataActivity = route.params.activity;

  const who = route.params.who;

  const token = useSelector((state) => state.user.value.token);

  const [personnalMark, setPersonnalMark] = useState(0);
  const [averageMark, setAverageMark] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const [fontsLoaded] = useFonts({
    "Indie-Flower": require("../assets/fonts/IndieFlower-Regular.ttf"),
  });

  useEffect(() => {
    fetch(
      `https://backend-freetime.vercel.app/hobbies/averageMarks/query?id=${dataActivity.id}&token=${token}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setAverageMark(data.average);
          if (data.myMark) {
            setPersonnalMark(data.myMark);
            setIsDisabled(true);
          }
        } else {
          console.log("no marks for activities");
        }
      });
  }, [personnalMark]);

  if (!fontsLoaded) {
    return null;
  }

  const handleStars = (num) => {
    fetch(
      `https://backend-freetime.vercel.app/hobbies/rating/${dataActivity.id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token, myMark: num + 1 }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setPersonnalMark(data.personalMark);
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
      <StarsMarks
        key={i}
        style={styleBlue}
        onPress={() => {
          isDisabled ? null : handleStars(i);
        }}
        disabled={isDisabled}
        activeOpacity={isDisabled ? 1 : 0.2}
      />
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
    markAverage.push(
      <StarsMarks key={i} style={styleBlue} disabled={true} activeOpacity={1} />
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#D9F2B1", "transparent"]}
        style={styles.background}
      >
        <HeaderReturn
          iconContext="trash"
          idActivity={dataActivity.id}
          pages="Profil"
          isNeeded={true}
          token={token}
          who={who}
        />

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
                pinColor={dataActivity.pinColor}
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
