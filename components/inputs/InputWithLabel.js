/*
@param {string} placeholder
@param {string} label
 */
import React from 'react';
import { Text, View, SafeAreaView, StyleSheet, TextInput } from 'react-native';

function InputWithLabel  ({placeholder, label}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
        />
        <Text style={styles.label}>{label}</Text>
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
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: '#004644',
    paddingLeft: 10, 
  },
  label: {
    position: 'absolute',
    top: -10, 
    left: 10, 
    color: '#004644',
    fontSize: 12,
    backgroundColor: '#bbd1b0',
    borderRadius: 5,
    padding: 2,
    
  },
});

export default InputWithLabel;
