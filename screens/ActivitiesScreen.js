import {TouchableOpacity, Text, View, StyleSheet, Image, ScrollView, SafeAreaView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import HeaderReturn from '../components/HeaderReturn';
import LargeButton from '../components/buttons/LargeButton';
import SmallButton from '../components/buttons/SmallButton';
import { useState } from 'react';
import ChooseActivity from '../components/ChooseActivity';
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import "moment/locale/fr";


//const cityTest = 'Lyon';
const cityTest = 'Limoges';

const day = 'mardi'
export default function ActivitiesScreen ({navigation}) {
    const [fontsLoaded] = useFonts({
        'Indie-Flower': require('../assets/fonts/IndieFlower-Regular.ttf'),
    });

    const city = useSelector((state) => state.user.value.city.name)
    console.log('city', city);

    let date = useSelector((state) => state.hobbies.value.date);
    date = new Date(date);
    let day = moment(date).locale("fr").format("dddd")
    day= day.toLowerCase();
    console.log('date', day);

    if (!fontsLoaded) {
    return null;
    }

    const handleSports = () => {
        //setIsShownSports(true)
        console.log('sports');
        fetch(`https://backend-freetime.vercel.app/hobbies/category/query?category=sports&city=${cityTest}&day=${day}`)
        //fetch(`http://192.168.1.12:3000/hobbies/sports/${city}`)
        //fetch(`http://192.168.1.12:3000/hobbies/category/query?category=sports&city=${cityTest}&day=${day}`)
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
            else {
                const dataToSend={
                    category: "sports",
                    hobbies: [],
                }
                navigation.navigate("ShowCategory", {dataToSend})
            }
        })
        
    }

    const handleArtistics = () => {
        console.log('artistique');
        fetch(`https://backend-freetime.vercel.app/hobbies/category/query?category=artistique&city=${cityTest}&day=${day}`)
        //fetch(`http://192.168.1.12:3000/hobbies/category/query?category=artistique&city=${cityTest}&day=${day}`)
        //fetch(`https://backend-freetime.vercel.app/hobbies/artistique`)
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
            else {
                const dataToSend={
                    category: "artistique",
                    hobbies: [],
                }
                navigation.navigate("ShowCategory", {dataToSend})
            }
        })
    }

    const handleCulture = () => {
        console.log('culture');
        fetch(`https://backend-freetime.vercel.app/hobbies/category/query?category=culture&city=${cityTest}&day=${day}`)
        //fetch(`https://backend-freetime.vercel.app/hobbies/culture`)
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
            else {
                const dataToSend={
                    category: "culture",
                    hobbies: [],
                }
                navigation.navigate("ShowCategory", {dataToSend})
            }
        })
    }

    const handleEvasion = () => {
        console.log('evasion');
        fetch(`https://backend-freetime.vercel.app/hobbies/category/query?category=evasion&city=${cityTest}&day=${day}`)
        //fetch(`https://backend-freetime.vercel.app/hobbies/evasion`)
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
            else {
                const dataToSend={
                    category: "evasion",
                    hobbies: [],
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
                        <SmallButton style={styles.btn}  title='Valider' onPress={handleValidate} />
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
        height: '18%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkBoxContainer: {
        height: '50%',
        width: '100%',
    },
    validateContainer: {
       // paddingTop: 30,
        height: '20%',//25%
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
    },
    scrollView: {
        height: '50%',
        width: '100%',
    },
  
  });