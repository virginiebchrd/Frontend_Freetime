import {ScrollView, Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import MapView, {Marker} from 'react-native-maps';
import HeaderReturn from '../components/HeaderReturn';
import CheckBoxContainer from '../components/CheckBoxContainer';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



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

export default function ResultScreen ({navigation}) {
    const [ActivityData, setActivityData] = useState([]);
    const hobbies = useSelector( (state) => state.hobbies.value.hobbies)
    //console.log(hobbies);
    const hobbiesSaved = useSelector( (state) => state.hobbies.value.hobbiesSaved);
    //console.log('hobbiesSaved', hobbiesSaved);
    const [isSavedProfil, setIsSavedProfil] = useState(false);

    useEffect ( () => {
        //TODO Ajouter le tableau récupérer d'ID
            if(hobbies.length !== 0) {
                console.log('test');
                fetch(`https://backend-freetime.vercel.app/hobbies/each/${hobbies}`,)
                .then(response => response.json())
                .then (data => {
                        if(data.result) {
                            //console.log('hobbies',data.hobby);
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
        let isSaved = hobbiesSaved.some(e => e === data._id)
        let colorPin;
        console.log('isSaved', isSaved);
        isSaved? colorPin='red' : colorPin='blue';
        //setIsSavedProfil(isSaved);
        return <CheckBoxContainer key={i} activityName={data.name} activity={{key:i, id:data._id, activityName: data.name, email:data.email, adress: data.address.street, zipCode: data.address.zipCode, phoneNumber: data.phoneNumber, city: data.address.city, activity: data.category, latitude: data.address.latitude, longitude: data.address.longitude, site: data.site, resultPages: true, pinColor: colorPin}} />
        //return <CheckBoxContainer key={i} activityName={data.name} activity={{key:i, activityName: data.name, email:data.activity.email, adress: data.activity.street, zipCode: data.activity.zipCode, phoneNumber: data.activity.phoneNumber, city: data.activity.city, activity: data.category, latitude: data.latitude, longitude: data.longitude, pinColor: data.colorPin}} />
    })

    //const markers = ActivityDataTest.map((data,i) => {
    const markers = ActivityData.map((data,i) => {
        let isSaved = hobbiesSaved.some(e => e === data._id)
        let pinColor;
        console.log('isSaved', isSaved);
        if (isSaved) {
            pinColor='red';
            desc = "Déja validée";
        } else {
            pinColor='blue';
            desc = "Nouvelle Activité";
        }
        return <Marker key={i} coordinate={{latitude: data.address.latitude, longitude: data.address.longitude}} title={data.name} pinColor={pinColor} description={desc} />
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

                <View style={styles.legend}>
                    <View style={styles.legendMarker}>
                        <FontAwesome name='map-pin' size={25} color="red" />
                        <Text style={styles.text}>Déja validée</Text>
                    </View>
                    <View style={styles.legendMarker}>
                        <FontAwesome name='map-pin' size={25} color="blue" />
                        <Text style={styles.text}>A découvrir</Text>
                    </View>
                </View>

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
    legend: {
        height: '7%',
        width: '40%',
        backgroundColor: 'rgba(255,255,255,0.6)',
        zIndex: 5,
        position: 'absolute',
        bottom: 324,
        right: 0,
        pointerEvents: 'none',
        alignItems: 'center',
        justifyContent: 'center',
    },
    legendMarker: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    text: {
        fontSize: 17,
        fontFamily: 'Indie-Flower',
        color: '#004644',
        marginLeft: 5,
    },
    activitiesContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    
  });