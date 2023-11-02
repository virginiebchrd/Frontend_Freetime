import {
  Text,
  Pressable,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HeaderReturn from "../components/HeaderReturn";
import SmallButton from "../components/buttons/SmallButton";
import CheckBoxContainer from "../components/CheckBoxContainer";
import {
  storeHobbiesSavedAmis,
  storeHobbiesSavedFamille,
  storeHobbiesSavedPerso,
} from "../reducers/hobbiesReducer";
import { Ionicons } from "@expo/vector-icons";

export default function ProfilScreen({ navigation, route }) {
  const dispatch = useDispatch();

  const hobbiesPerso = useSelector((state) => state.hobbies.value.hobbiesPerso);
  const hobbiesFamille = useSelector(
    (state) => state.hobbies.value.hobbiesFamille
  );
  const hobbiesAmis = useSelector((state) => state.hobbies.value.hobbiesAmis);

  const hobbiesSavedProfil = useSelector(
    (state) => state.hobbies.value.hobbiesSaved
  );

  const userFirstname = useSelector((state) => state.user.value.firstname);
  const token = useSelector((state) => state.user.value.token);
  const userLastname = useSelector((state) => state.user.value.lastname);
  const userEmail = useSelector((state) => state.user.value.email);

  const [hobbiesSavedPerso, setHobbiesSavedPerso] = useState(false);
  const [hobbiesSavedFamille, setHobbiesSavedFamille] = useState(false);
  const [hobbiesSavedAmis, setHobbiesSavedAmis] = useState(false);

  const [activitiesDataPerso, setActivitiesDataPerso] = useState([]);
  const [activitiesDataFamille, setActivitiesDataFamille] = useState([]);
  const [activitiesDataAmis, setActivitiesDataAmis] = useState([]);

  const [checkedPerso, setCheckedPerso] = useState(false);
  const [checkedFamille, setCheckedFamille] = useState(false);
  const [checkedAmis, setCheckedAmis] = useState(false);
  const [checkedAll, setCheckedAll] = useState(true);

  let activitiesPerso, activitiesFamille, activitiesAmis;

  const [fontsLoaded] = useFonts({
    "Indie-Flower": require("../assets/fonts/IndieFlower-Regular.ttf"),
  });

  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const response = await fetch(
          `https://backend-freetime.vercel.app/users/hobbiesValidate/${token}`
        );

        const data = await response.json();
        if (data.result) {
          if (data.hobbiesValidatedPerso.length > 0) {
            const idArray = data.hobbiesValidatedPerso.map((hobbiesSaved) => {
              return hobbiesSaved._id;
            });
            dispatch(storeHobbiesSavedPerso(idArray));

            setActivitiesDataPerso(data.hobbiesValidatedPerso);
            setHobbiesSavedPerso(true);
          } else {
            setHobbiesSavedPerso(false);
          }
          if (data.hobbiesValidatedFamille.length > 0) {
            const idArray = data.hobbiesValidatedFamille.map((hobbiesSaved) => {
              return hobbiesSaved._id;
            });
            dispatch(storeHobbiesSavedFamille(idArray));

            setActivitiesDataFamille(data.hobbiesValidatedFamille);
            setHobbiesSavedFamille(true);
          } else {
            setHobbiesSavedFamille(false);
          }
          if (data.hobbiesValidatedAmis.length > 0) {
            const idArray = data.hobbiesValidatedFamille.map((hobbiesSaved) => {
              return hobbiesSaved._id;
            });
            dispatch(storeHobbiesSavedAmis(idArray));

            setActivitiesDataAmis(data.hobbiesValidatedAmis);
            setHobbiesSavedAmis(true);
          } else {
            setHobbiesSavedAmis(false);
          }
        } else {
          if (data.error === "no hobbies") {
            console.log("nohobbies");
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des hobbies :", error);
      }
    };

    fetchHobbies();
    setCheckedFamille(true);
    setCheckedPerso(true);
    setCheckedAmis(true);
  }, [hobbiesPerso, hobbiesAmis, hobbiesFamille]);

  const handleValidate = () => {
    navigation.navigate("Calendar");
  };

  if (hobbiesSavedPerso) {
    activitiesPerso = activitiesDataPerso.map((data, i) => {
      return (
        <CheckBoxContainer
          key={i}
          activityName={data.name}
          who="perso"
          activity={{
            key: i,
            id: data._id,
            activityName: data.name,
            email: data.email,
            adress: data.address.street,
            zipCode: data.address.zipCode,
            phoneNumber: data.phoneNumber,
            city: data.address.city,
            activity: data.category,
            latitude: data.address.latitude,
            longitude: data.address.longitude,
            site: data.site,
            resultPages: false,
            pinColor: "blue",
          }}
        />
      );
    });
  } else {
    activitiesPerso = (
      <View style={styles.noHobbiesContainer}>
        <Text style={styles.oldActivities}>
          Pas d'activités personnelles sauvegardées
        </Text>
      </View>
    );
  }

  if (hobbiesSavedFamille) {
    activitiesFamille = activitiesDataFamille.map((data, i) => {
      return (
        <CheckBoxContainer
          key={i}
          activityName={data.name}
          who="famille"
          activity={{
            key: i,
            id: data._id,
            activityName: data.name,
            email: data.email,
            adress: data.address.street,
            zipCode: data.address.zipCode,
            phoneNumber: data.phoneNumber,
            city: data.address.city,
            activity: data.category,
            latitude: data.address.latitude,
            longitude: data.address.longitude,
            site: data.site,
            resultPages: false,
            pinColor: "red",
          }}
        />
      );
    });
  } else {
    activitiesFamille = (
      <View style={styles.noHobbiesContainer}>
        <Text style={styles.oldActivities}>
          Pas d'activités sauvegardées avec la famille
        </Text>
      </View>
    );
  }

  if (hobbiesSavedAmis) {
    activitiesAmis = activitiesDataAmis.map((data, i) => {
      return (
        <CheckBoxContainer
          key={i}
          activityName={data.name}
          who="amis"
          activity={{
            key: i,
            id: data._id,
            activityName: data.name,
            email: data.email,
            adress: data.address.street,
            zipCode: data.address.zipCode,
            phoneNumber: data.phoneNumber,
            city: data.address.city,
            activity: data.category,
            latitude: data.address.latitude,
            longitude: data.address.longitude,
            site: data.site,
            resultPages: false,
            pinColor: "green",
          }}
        />
      );
    });
  } else {
    activitiesAmis = (
      <View style={styles.noHobbiesContainer}>
        <Text style={styles.oldActivities}>
          Pas d'activités sauvegardées avec les amis
        </Text>
      </View>
    );
  }

  const handlePressAll = () => {
    setCheckedAll(!checkedAll);
    setCheckedPerso(!checkedAll);
    setCheckedFamille(!checkedAll);
    setCheckedAmis(!checkedAll);
    }

  const handlePressFamille = () => {
    setCheckedFamille(!checkedFamille);

    if (checkedFamille) {
      setCheckedAll(false);
    } else if (!checkedFamille && checkedAmis && checkedPerso) {
      setCheckedAll(true);
    }
  };

  const handlePressAmis = () => {
    setCheckedAmis(!checkedAmis);

    if (checkedAmis) {
      setCheckedAll(false);
    } else if (checkedFamille && !checkedAmis && checkedPerso) {
      setCheckedAll(true);
    }
  };

  const handlePressPerso = () => {
    setCheckedPerso(!checkedPerso);

    if (checkedPerso) {
      setCheckedAll(false);
    } else if (checkedFamille && checkedAmis && !checkedPerso) {
      setCheckedAll(true);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#D9F2B1", "transparent"]}
        style={styles.background}
      >
        <HeaderReturn isNeeded={true} iconContext="logout" pages="Calendar" />

        <View style={styles.bodyContainer}>
          <View style={styles.titleContainer}>
            <FontAwesome name="user" size={75} color="#004644" />
            <Text style={styles.title}>
              {userFirstname && userLastname
                ? `Bonjour, ${userFirstname} ${userLastname}`
                : `Bonjour, ${userEmail}`}
            </Text>
          </View>

          <Text style={styles.oldActivities}>Anciennes activités :</Text>
          <View style={styles.filterContainer}>
            <View style={styles.moduleContainer}>
              <Text style={styles.text}>Filtrer par:</Text>
            </View>

            <View style={styles.moduleContainer}>
              <Pressable
                style={[
                  styles.checkboxBase,
                  checkedAll && styles.checkboxChecked,
                ]}
                onPress={() => handlePressAll()}
              >
                {checkedAll && (
                  <Ionicons name="checkmark" size={24} color="#004644" />
                )}
              </Pressable>
              <Text style={styles.text}>All</Text>
            </View>

            <View style={styles.moduleContainer}>
              <TouchableOpacity
                style={[
                  styles.checkboxBase,
                  checkedPerso && styles.checkboxChecked,
                ]}
                onPress={() => handlePressPerso()}
              >
                {checkedPerso && (
                  <Ionicons name="checkmark" size={24} color="blue" />
                )}
              </TouchableOpacity>
              <Text style={styles.text}>Perso</Text>
            </View>

            <View style={styles.moduleContainer}>
              <Pressable
                style={[
                  styles.checkboxBase,
                  checkedAmis && styles.checkboxChecked,
                ]}
                onPress={() => handlePressAmis()}
              >
                {checkedAmis && (
                  <Ionicons name="checkmark" size={24} color="green" />
                )}
              </Pressable>
              <Text style={styles.text}>Amis</Text>
            </View>

            <View style={styles.moduleContainer}>
              <Pressable
                style={[
                  styles.checkboxBase,
                  checkedFamille && styles.checkboxChecked,
                ]}
                onPress={() => handlePressFamille()}
              >
                {checkedFamille && (
                  <Ionicons name="checkmark" size={24} color="red" />
                )}
              </Pressable>
              <Text style={styles.text}>Famille</Text>
            </View>
          </View>
        </View>
        <ScrollView>
          <View style={styles.scrollView}>
            {checkedPerso && activitiesPerso}
            {checkedFamille && activitiesFamille}
            {checkedAmis && activitiesAmis}
          </View>
        </ScrollView>

        <View style={styles.validateContainer}>
          <SmallButton
            style={styles.btn}
            title="Suivant"
            onPress={handleValidate}
          />
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
    textAlign: 'center',
  },
  validateContainer: {
    height: "17%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    top: 5,
  },

  filterContainer: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 1,
  },
  moduleContainer: {
    width: "20%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#cae1db",
    backgroundColor: "#cae1db",
  },
  checkboxChecked: {
    backgroundColor: "white",
  },
  text: {
    fontFamily: "Indie-Flower",
    fontSize: 15,
    color: "#004644",
    marginLeft: 10,
  },
});
