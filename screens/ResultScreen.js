import {ScrollView, Text, View, StyleSheet, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import MapView, {Marker} from 'react-native-maps';
import HeaderReturn from '../components/HeaderReturn';
import CheckBoxContainer from '../components/CheckBoxContainer';

const city = {latitude: 45.83, longitude: 1.26} //test avec Limoges avec des données brutes imaginaires

const ActivityData = [
    {colorPin: 'red',activityName: "Boxe", latitude: 45.8359, longitude: 1.2635, activity:{
        adress: "25 rue des coqs", zipCode: 87000, city: "Limoges", email:"boxe@gmail.com", phoneNumber: +33555241236,
    } },
    {colorPin: 'yellow',activityName: "Cinéma", latitude: 45.8354, longitude: 1.2604, activity:{
        adress: " 2 Allée des coquelicots", zipCode: 87000, city: "Limoges", email:"cinema@gmail.com", phoneNumber: +33555241295,
    }},
    {colorPin: 'pink',activityName: "Escape Game", latitude: 45.8257, longitude: 1.2575,activity:{
        adress: "56 rue de la soif", zipCode: 87000, city: "Limoges", email:"escape@gmail.com", phoneNumber: +33555225236,
    } },
    {colorPin: 'blue',activityName: "Fly Yoga", latitude: 45.8370, longitude: 1.2596, activity:{
        adress: "25 rue des coqs", zipCode: 87000, city: "Limoges", email:"yogaFly@gmail.com", phoneNumber: +33555691236,
    } },
]

export default function ResultScreen ({navigation}) {
    const [fontsLoaded] = useFonts({
        'Indie-Flower': require('../assets/fonts/IndieFlower-Regular.ttf'),
    });

    if (!fontsLoaded) {
    return null;
    }

    const activities = ActivityData.map((data,i) => {
        return <CheckBoxContainer key={i} colorPin={data.colorPin} activityName={data.activityName} activity={{key:i, activityName: data.activityName, activity: data.activity, colorPin: data.colorPin, latitude: data.latitude, longitude: data.longitude}} />
    })

    const markers = ActivityData.map((data,i) => {
        return <Marker key={i} coordinate={{latitude: data.latitude, longitude: data.longitude}} pinColor={data.colorPin} />
    })

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#D9F2B1', 'transparent']}  style={styles.background} >
                <HeaderReturn iconContext="profil" pages='Activities' />

                <View style={styles.bodyContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Vos résultats</Text>
                    </View>
                    <View style={styles.mapContainer} >
                    <MapView 
                        initialRegion={{
                            latitude: city.latitude,
                            longitude: city.longitude,
                            latitudeDelta: 0.025,
                            longitudeDelta: 0.025,
                        }}
                        style={styles.map}
                        >
                            {markers}
                        </MapView>
                    </View>
                    <ScrollView>
                        <View style={styles.activitiesContainer}>
                            {activities}
                        </View>
                    </ScrollView>
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
    mapContainer: {
        height: '40%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    map: {
        height: '100%',
        width: '100%',
    },
    activitiesContainer: {
        height: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        alignContent: 'space-between',
    },
    
  });