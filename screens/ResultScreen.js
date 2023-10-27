import {ScrollView, Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import MapView, {Marker} from 'react-native-maps';
import HeaderReturn from '../components/HeaderReturn';
import CheckBoxContainer from '../components/CheckBoxContainer';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';



const city = {latitude: 45.83, longitude: 1.26} //test avec Limoges avec des données brutes imaginaires

const ActivityDataTest = [
    {colorPin: 'red',name: "Boxe", latitude: 45.8359, longitude: 1.2635, activity:{
        street: "25 rue des coqs", zipCode: 87000, city: "Limoges", email:"boxe@gmail.com", phoneNumber: +33555241236,
    } },
    {colorPin: 'yellow',name: "Cinéma", latitude: 45.8354, longitude: 1.2604, activity:{
        street: " 2 Allée des coquelicots", zipCode: 87000, city: "Limoges", email:"cinema@gmail.com", phoneNumber: +33555241295,
    }},
    {colorPin: 'pink',name: "Escape Game", latitude: 45.8257, longitude: 1.2575,activity:{
        street: "56 rue de la soif", zipCode: 87000, city: "Limoges", email:"escape@gmail.com", phoneNumber: +33555225236,
    } },
    {colorPin: 'blue',name: "Fly Yoga", latitude: 45.8370, longitude: 1.2596, activity:{
        street: "25 rue des coqs", zipCode: 87000, city: "Limoges", email:"yogaFly@gmail.com", phoneNumber: +33555691236,
    } },
]

const test = [
    '6537cf76d30bc3e81d0e8cf0',
    '6537cd29d30bc3e81d0e8ceb',
    /*'6537ca41d30bc3e81d0e8ce7',*/
];

const token = 'uhSWw7eDVYOdKDbJSDbxMBOf_40T09E-';

export default function ResultScreen ({navigation}) {
    const [ActivityData, setActivityData] = useState([]);
    const hobbies = useSelector( (state) => state.hobbies.value.hobbies)
    console.log(hobbies);

    useEffect ( () => {
        //TODO Ajouter le tableau récupérer d'ID
            if(hobbies.length !== 0) {
                console.log('test');
                fetch(`https://backend-freetime.vercel.app/hobbies/each/${hobbies}`,)
                .then(response => response.json())
                .then (data => {
                        if(data.result) {
                            console.log('hobbies',data.hobby);
                            setActivityData(data.hobby);
                        }
                })
            }
            else {
                setActivityData([]);
            }
    }, [hobbies])

    const [fontsLoaded] = useFonts({
        'Indie-Flower': require('../assets/fonts/IndieFlower-Regular.ttf'),
    });

    if (!fontsLoaded) {
    return null;
    }
    
    const activities = ActivityData.map((data,i) => {
        //const activities = ActivityDataTest.map((data,i) => {
        return <CheckBoxContainer key={i} activityName={data.name} activity={{key:i, id:data._id, activityName: data.name, email:data.email, adress: data.address.street, zipCode: data.address.zipCode, phoneNumber: data.phoneNumber, city: data.address.city, activity: data.category, latitude: data.address.latitude, longitude: data.address.longitude, site: data.site}} />
        //return <CheckBoxContainer key={i} activityName={data.name} activity={{key:i, activityName: data.name, email:data.activity.email, adress: data.activity.street, zipCode: data.activity.zipCode, phoneNumber: data.activity.phoneNumber, city: data.activity.city, activity: data.category, latitude: data.latitude, longitude: data.longitude, pinColor: data.colorPin}} />
    })


    //const markers = ActivityDataTest.map((data,i) => {
    const markers = ActivityData.map((data,i) => {
        return <Marker key={i} coordinate={{latitude: data.address.latitude, longitude: data.address.longitude}} pinColor={data.colorPin} />
        //return <Marker key={i} coordinate={{latitude: data.latitude, longitude: data.longitude}} pinColor={data.colorPin} />
    })

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#D9F2B1', 'transparent']}  style={styles.background} >
                <HeaderReturn iconContext="profil" pages='Activities' isNeeded={true} />
                
                <Text style={styles.title}>Vos résultats</Text>
                <MapView 
                    initialRegion={{
                        latitude: city.latitude,
                        longitude: city.longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                    style={styles.map}
                >
                    {markers}
                </MapView>

                <ScrollView>
                    <View style={styles.activitiesContainer}>
                        {activities}
                    </View>
                </ScrollView>

                

                
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
        color: '#004644',
        margin: 10,
    },
    mapContainer: {
        height: '40%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        height: '40%',
        width: '99%',
    },
    activitiesContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    
  });