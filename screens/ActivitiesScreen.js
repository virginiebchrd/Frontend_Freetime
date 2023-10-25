import {TouchableOpacity, Text, View, StyleSheet, Image, ScrollView, SafeAreaView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import HeaderReturn from '../components/HeaderReturn';
import LargeButton from '../components/buttons/LargeButton';
import SmallButton from '../components/buttons/SmallButton';
import { useState } from 'react';
import ChooseActivity from '../components/ChooseActivity';
import { useDispatch, useSelector } from 'react-redux';

export default function ActivitiesScreen ({navigation}) {
    const [fontsLoaded] = useFonts({
        'Indie-Flower': require('../assets/fonts/IndieFlower-Regular.ttf'),
    });

    if (!fontsLoaded) {
    return null;
    }

    const handleSports = () => {
        //setIsShownSports(true)
        console.log('sports');
        fetch(`http://192.168.1.12:3000/hobbies/sports`)
        .then(response => response.json())
        .then(data => {
            if(data.result){
                console.log(data.hobbies);
                const dataToSend={
                    category: "sports",
                    hobbies: data.hobbies,
                }
                navigation.navigate("ShowCategory", {dataToSend})
            }
        })
        
    }

    const handleArtistics = () => {
        console.log('artistique');
        fetch(`http://192.168.1.12:3000/hobbies/artistique`)
        .then(response => response.json())
        .then(data => {
            if(data.result){
                console.log(data.hobbies);
                const dataToSend={
                    category: "artistique",
                    hobbies: data.hobbies,
                }
                navigation.navigate("ShowCategory", {dataToSend})
            }
        })
    }

    const handleCulture = () => {
        console.log('culture');
        fetch(`http://192.168.1.12:3000/hobbies/culture`)
        .then(response => response.json())
        .then(data => {
            if(data.result){
                console.log(data.hobbies);
                const dataToSend={
                    category: "culture",
                    hobbies: data.hobbies,
                }
                navigation.navigate("ShowCategory", {dataToSend})
            }
        })
    }

    const handleEvasion = () => {
        console.log('evasion');
        fetch(`http://192.168.1.12:3000/hobbies/evasion`)
        .then(response => response.json())
        .then(data => {
            if(data.result){
                console.log(data.hobbies);
                const dataToSend={
                    category: "evasion",
                    hobbies: data.hobbies,
                }
                navigation.navigate("ShowCategory", {dataToSend})
            }
        })
    }

    const handleValidate = () => {
        navigation.navigate('Result');
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#D9F2B1', 'transparent']}  style={styles.background} >
                <HeaderReturn iconContext="profil" pages='Map' isNeeded={true}/>
                
                <View style={styles.bodyContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Quelle(s) activité(s) recherchez-vous ?</Text>
                    </View>
                        <View style={styles.categoryContainer}>
                            <LargeButton title='Sports' onPress={handleSports}/>
                        </View>
                        <View style={styles.categoryContainer}>
                            <LargeButton title='Activités artistiques' onPress={handleArtistics}/>
                        </View>
                        <View style={styles.categoryContainer}>
                            <LargeButton title='Activités culturelles' onPress={handleCulture} />
                        </View>
                        <View style={styles.categoryContainer}>
                            <LargeButton title='Evasion' onPress={handleEvasion}/> 
                        </View>
                    <View style={styles.validateContainer}>
                        <SmallButton title='Valider' onPress={handleValidate} />
                    </View>
                </View>

            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    bodyContainer: {
        height: '80%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    titleContainer: {
        height: '10%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontFamily: 'Indie-Flower',
        color: '#004644'
    },
    categoryContainer: {
        height: '15%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkBoxContainer: {
        height: '50%',
        width: '100%',
    },
    validateContainer: {
        height: '20%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        height: '50%',
        width: '100%',
    },
    buttonContainer: {
        height: '60%',
        width: '100%',
        borderWidth: 1
    },
    test: {
        height: '20%',
        width: '100%',
    }
  });