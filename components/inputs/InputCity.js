import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useFonts } from "expo-font";

function InputCity({ value, placeholder, onChangeText, onPress }) {
  const fontsLoaded = useFonts({
    "Indie-Flower": require("../../assets/fonts/IndieFlower-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { fontFamily: "Indie-Flower" }]}
          placeholderTextColor="#cae1db"
          placeholder={placeholder}
          onChangeText={onChangeText}
          autoCapitalize="none"
          value={value}
        />

        <View style={styles.iconContainer}>
          <FontAwesomeIcon
            name="search"
            size={24}
            color="#000"
            style={styles.searchIcon}
            onPress={onPress}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    flex: 1,
    height: 40,
    borderColor: "#76a696",
    paddingLeft: 5,
    backgroundColor: "#fff",
  },

  label: {
    position: "absolute",
    left: 10,
    top: 10,
    color: "#004644",
    fontSize: 12,
    backgroundColor: "#bbd1b0",
    borderRadius: 5,
    padding: 3,
  },

  placeholder: {
    color: "#004644",
    fontSize: 12,
    backgroundColor: "#bbd1b0",
    borderRadius: 5,
    paddingLeft: 10,
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
    width: 250,
    padding: 5,
  },
  iconContainer: {},
});

export default InputCity;
