import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useState } from "react";

function PasswordInput({ value, onChangeText, onPress, onFocus }) {
  const [showPassword, setShowPassword] = useState(false);

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
          placeholder="Entrer votre mot de passe"
          onChangeText={onChangeText}
          autoCapitalize="none"
          secureTextEntry={!showPassword}
          value={value}
          accessible={true}
          accessibilityLabel="Saisie du mot de passe"
          onFocus={onFocus}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setShowPassword(!showPassword)}
        >
          <FontAwesomeIcon
            style={{ paddingRight: 15 }}
            name={showPassword ? "eye-slash" : "eye"}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
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

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#76a696",
    backgroundColor: "#fff",
    margin: 0,
    borderRadius: 10,
    width: 250,
    padding: 5,
  },

  input: {
    flex: 1,
    height: 40,
    borderColor: "#76a696",
    paddingLeft: 5,
    backgroundColor: "#fff",
    margin: 0,
    padding: 0,
  },

  placeholder: {
    color: "#004644",
    fontSize: 12,
    backgroundColor: "#bbd1b0",
    borderRadius: 5,
    paddingLeft: 10,
  },
  iconContainer: {
    color: "#004644",
  },
});

export default PasswordInput;
