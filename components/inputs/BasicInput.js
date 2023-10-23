/*
@param {string} placeholder

 */
import React from 'react';
import { View, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { useFonts } from "expo-font";

function InputWithLabel  ({placeholder}) {

  const fontsLoaded = useFonts({
    "Indie-Flower": require("../../assets/fonts/IndieFlower-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { fontFamily: "Indie-Flower" }]}
          placeholder={placeholder}
        />
         </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  placeholder: {
    color: "#004644",
    fontSize: 12,
    backgroundColor: "#bbd1b0",
    borderRadius: 5,
    paddingLeft: 10,
    fontFamily: "Indie-Flower",
  },


});

export default InputWithLabel;
