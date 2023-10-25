import {TouchableOpacity, Text, View, StyleSheet, Image, Pressable} from 'react-native';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import MyCheckbox from '../components/MyCheckbox';


function ChooseActivity (props) {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [fontsLoaded] = useFonts({
        'Indie-Flower': require('../assets/fonts/IndieFlower-Regular.ttf'),
    });

    if (!fontsLoaded) {
    return null;
    }

    return (
        <View style={styles.headerContainer}>
            <View style={styles.activityContainer}>
                <Text style={styles.checkboxName}>{props.activityName}</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <MyCheckbox 
                isChecked={props.isChecked}
                id={props.id}
                />
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    headerContainer: {
        height: '40%',
        width: '90%',
        flexDirection: 'row',
        backgroundColor: '#004644',
        fontFamily: 'Indie-Flower',
        color: '#cae1db',
        marginLeft: 10,
    },
    activityContainer: {
        height: '100%',
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    checkboxName: {
        fontFamily: 'Indie-Flower',
        color: '#cae1db',
        fontSize: 15,
    },
    checkboxContainer: {
        height: '100%',
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkbox: {
        margin: 8,
        height: 30,
        width: 30,
    },

    checkboxBase: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#cae1db',
        backgroundColor: '#cae1db',
      },
      checkboxChecked: {
        backgroundColor: 'white',
      },
});


export default ChooseActivity;