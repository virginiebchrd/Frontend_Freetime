import { Keyboard, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import HeaderReturn from "../components/HeaderReturn";
import SmallButton from "../components/buttons/SmallButton";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { addCity } from "../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import InputCity from "../components/inputs/InputCity";

export default function MapScreen({ navigation }) {
  const [myPosition, setMyPosition] = useState({});

  const [pressedCoordinates, setPressedCoordinates] = useState(null);
  const [city, setCity] = useState("");
  const [citySearch, setCitySearch] = useState(false);

  const dispatch = useDispatch();
  const coords = useSelector((state) => state.user.value.city);

  const [fontsLoaded] = useFonts({
    "Indie-Flower": require("../assets/fonts/IndieFlower-Regular.ttf"),
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setMyPosition(location.coords);
        console.log(myPosition);
      }
    })();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const handleMap = (pressed) => {
    console.log("clicked");
    setPressedCoordinates(pressed.coordinate);
    console.log(pressedCoordinates);
  };

  const handleSearch = () => {
    Keyboard.dismiss();
    console.log("city", city);
    fetch(`https://api-adresse.data.gouv.fr/search/?q=${city}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCitySearch(true);
        const firstCity = data.features[0];
        const newPlace = {
          name: firstCity.properties.city,
          latitude: firstCity.geometry.coordinates[1],
          longitude: firstCity.geometry.coordinates[0],
        };

        dispatch(addCity(newPlace));
        setCity("");
      });
  };

  const handleValidate = () => {
    navigation.navigate("Activities");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#D9F2B1", "transparent"]}
        style={styles.background}
      >
        <HeaderReturn iconContext="profil" pages="Who" isNeeded={true} />
        <View style={styles.bodyContainer}>
          <View style={styles.inputContainer1}>
            <InputCity
              value={city}
              placeholder="Entrer une ville"
              onChangeText={(value) => setCity(value)}
              onPress={() => handleSearch()}
            />
          </View>

          <MapView
            style={styles.mapContainer}
            initialRegion={{
              latitude: 45.833619,
              longitude: 1.261105,
              latitudeDelta: 12,
              longitudeDelta: 12,
            }}
            showsUserLocation
            onLongPress={(e) => handleMap(e.nativeEvent)}
          >
            {citySearch && (
              <Marker
                coordinate={{
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                }}
                title={city}
                pinColor="#fecb2d"
              />
            )}
          </MapView>
          <View style={styles.validateContainer}>
            <SmallButton
              style={styles.btn}
              title="Suivant"
              onPress={handleValidate}
            />
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
  mapContainer: {
    height: "74%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  bodyContainer: {
    height: "80%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  textContainer: {
    height: "5%",
    width: "80%",
    borderBottomWidth: 2,
    borderColor: "#004644",
    alignItems: "center",
    justifyContent: "center",
  },

  inputContainer1: {
    height: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  validateContainer: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    bottom: 10,
  },

  searchIcon: {
    margin: 5,
    color: "#004644",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#76a696",
    backgroundColor: "#fff",
    borderRadius: 5,
    width: 20,
    padding: 5,
  },
});
