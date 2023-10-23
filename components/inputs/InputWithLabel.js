/*
@param {string} placeholder
@param {string} label
 */
import React from "react";
import { Text, View, SafeAreaView, StyleSheet, TextInput } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

function InputWithLabel({ placeholder, label, icon }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder={placeholder} />
        {icon && (
          <View style={styles.iconContainer}>
            <FontAwesomeIcon
              name="search"
              size={24}
              color="#000"
              style={styles.searchIcon}
            />
          </View>
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#76a696",
    backgroundColor: "#fff",
    borderRadius: 5,
    width: 250,
  },

  input: {
    flex:1,
    height: 40,
    borderColor: "#76a696",
    paddingLeft: 5,
    backgroundColor: "#fff",
  },
  label: {
    position: "absolute",
    left: 10, // Ajustez la position à gauche selon vos besoins
    top: 45, // Ajustez la position vers le haut selon vos besoins
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
    width: 250, // Ajustez la largeur de l'input
    padding:5,
  },
});

export default InputWithLabel;
