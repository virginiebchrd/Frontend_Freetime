/*
@param {string} placeholder

 */
import React from 'react';
import { View, SafeAreaView, StyleSheet, TextInput } from 'react-native';

function InputWithLabel  ({placeholder}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
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
    position: 'relative',
    margin: 0,
    padding: 0,
  
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 2,
    borderColor: '#76a696',
    paddingLeft: 10, 
    backgroundColor: '#fff',
    borderRadius: 5,
  },

});

export default InputWithLabel;
