import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import FirstConnectionScreen from "./screens/FirstConnectionScreen";
import ConnectionScreen from "./screens/ConnectionScreen";
import CreateProfilScreen from "./screens/CreateProfilScreen";
import ProfilScreen from "./screens/ProfilScreen";
import CalendarScreen from "./screens/CalendarScreen";
import WhoScreen from "./screens/WhoScreen";
import WhoScreenBis from "./screens/WhoScreenBis";
import MapScreen from "./screens/MapScreen";
import ActivitiesScreen from "./screens/ActivitiesScreen";
import ResultScreen from "./screens/ResultScreen";
import ShowCategoryScreen from "./screens/ShowCategoryScreen";
import ShowActivityScreen from "./screens/ShowActivityScreen";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import hobbies from './reducers/hobbiesReducer';
import ShareActivityScreen from "./screens/ShareActivityScreen";

const store = configureStore({
  reducer: { user: userReducer, hobbies },
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="FirstConnection" component={FirstConnectionScreen} />
          <Stack.Screen name="Connection" component={ConnectionScreen} />
          <Stack.Screen name="CreateProfil" component={CreateProfilScreen} />
          <Stack.Screen name="Profil" component={ProfilScreen} />
          <Stack.Screen name="Calendar" component={CalendarScreen} />
          <Stack.Screen name="Who" component={WhoScreen} />
          <Stack.Screen name="WhoBis" component={WhoScreenBis} />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="Activities" component={ActivitiesScreen} />
          <Stack.Screen name="ShowCategory" component={ShowCategoryScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
          <Stack.Screen name="ShowActivity" component={ShowActivityScreen} />
          <Stack.Screen name="ShareActivity" component={ShareActivityScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
