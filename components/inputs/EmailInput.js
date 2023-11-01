/*
@param {string} placeholder
@param {string} label
 */
import React from "react";
import { Text, View, StyleSheet, TextInput, KeyboardAvoidingView} from "react-native";
import { useFonts } from "expo-font";


function EmailInput({ value, onChangeText, secureTextEntry }) {
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

        <TextInput  style={[styles.input, { fontFamily: "Indie-Flower" }]}
        placeholderTextColor="#cae1db" 
        placeholder="Entrer votre adresse mail"
        onChangeText={onChangeText}
        autoCapitalize="none" 
        secureTextEntry={false}
        keyboardType="email-address"
        autoCompleteType="email"  
        accessibilityLabel="Saisie de votre adresse mail" 
        value={value}

       />
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
    width: 250, // Ajustez la largeur de l'input
    padding:5
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
  
  });

export default EmailInput;
