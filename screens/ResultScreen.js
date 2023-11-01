import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import MapView, {Marker} from 'react-native-maps';
import HeaderReturn from '../components/HeaderReturn';
import CheckBoxContainer from '../components/CheckBoxContainer';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//const city = { latitude: 45.7578137, longitude: 4.8320114 } //test avec Lyon avec des données brutes imaginaires
const city = { latitude: 45.8354243, longitude: 1.2644847 } //test avec Limoges avec des données brutes imaginaires

export default function ResultScreen ({navigation}) {
    const [ActivityData, setActivityData] = useState([]);
    
    const hobbiesPerso = useSelector( (state) => state.hobbies.value.hobbiesPerso);
    const hobbiesFamille = useSelector( (state) => state.hobbies.value.hobbiesFamille);
    const hobbiesAmis = useSelector( (state) => state.hobbies.value.hobbiesAmis);

    const hobbiesSavedPerso = useSelector( (state) => state.hobbies.value.hobbiesSavedPerso);
    const hobbiesSavedFamille = useSelector( (state) => state.hobbies.value.hobbiesSavedFamille);
    const hobbiesSavedAmis = useSelector( (state) => state.hobbies.value.hobbiesSavedAmis);

    const who = useSelector( (state) => state.hobbies.value.who);

    useEffect ( () => {
        if(who === 'perso'){
            if(hobbiesPerso.length !== 0) {
                fetch(`https://backend-freetime.vercel.app/hobbies/each/${hobbiesPerso}`,)
                //fetch(`http://192.168.1.12:3000/hobbies/each/${hobbiesPerso}`,)
                .then(response => response.json())
                .then (data => {
                        if(data.result) {
                            setActivityData(data.hobby);
                        }
                })
            }
            else {
                setActivityData([]);
            }
        }
        else if(who === 'famille'){
            if(hobbiesFamille.length !== 0) {
                fetch(`https://backend-freetime.vercel.app/hobbies/each/${hobbiesFamille}`,)
                //fetch(`http://192.168.1.12:3000/hobbies/each/${hobbiesFamille}`,)
                .then(response => response.json())
                .then (data => {
                        if(data.result) {
                            setActivityData(data.hobby);
                        }
                })
            }
            else {
                setActivityData([]);
            }
        }
        else if(who === 'amis'){
            if(hobbiesAmis.length !== 0) {
                fetch(`https://backend-freetime.vercel.app/hobbies/each/${hobbiesAmis}`)
                //fetch(`http://192.168.1.12:3000/hobbies/each/${hobbiesAmis}`)
                .then(response => response.json())
                .then (data => {
                        if(data.result) {
                            setActivityData(data.hobby);
                        }
                })
            }
            else {
                setActivityData([]);
            }
        }
    }, [hobbiesPerso, hobbiesFamille, hobbiesAmis])
    const [fontsLoaded] = useFonts({
        'Indie-Flower': require('../assets/fonts/IndieFlower-Regular.ttf'),
    });

    if (!fontsLoaded) {
    return null;
    }
    
    const activities = ActivityData.map((data,i) => {
        let colorPin;
        if(who === 'perso') {
            let isSavedPerso = hobbiesSavedPerso.some(e => e === data._id);
            isSavedPerso? colorPin='red' : colorPin='blue';
        } else if (who === 'famille') {
            let isSavedFamille = hobbiesSavedFamille.some(e => e === data._id);
            isSavedFamille? colorPin='red' : colorPin='blue';
        } else if (who === 'amis') {
            let isSavedAmis = hobbiesSavedAmis.some(e => e === data._id);
            isSavedAmis? colorPin='red' : colorPin='blue';
        }

        return <CheckBoxContainer key={i} activityName={data.name} activity={{key:i, id:data._id, activityName: data.name, email:data.email, adress: data.address.street, zipCode: data.address.zipCode, phoneNumber: data.phoneNumber, city: data.address.city, activity: data.category, latitude: data.address.latitude, longitude: data.address.longitude, site: data.site, resultPages: true, pinColor: colorPin}} />
    
    })

    const markers = ActivityData.map((data,i) => {

        let pinColor;
        if(who === 'perso') {
            let isSavedPerso = hobbiesSavedPerso.some(e => e === data._id);
            if(isSavedPerso) {
                pinColor='red';
                desc = "Déja validée"
            } else {
                pinColor='blue';
                desc = "Nouvelle Activité";
            }    
        } else if (who === 'famille') {
            let isSavedFamille = hobbiesSavedFamille.some(e => e === data._id);
            if(isSavedFamille) {
                pinColor='red';
                desc = "Déja validée"
            } else {
                pinColor='blue';
                desc = "Nouvelle Activité";
            }   
        } else if (who === 'amis') {
            let isSavedAmis = hobbiesSavedAmis.some(e => e === data._id);
            if(isSavedAmis) {
                pinColor='red';
                desc = "Déja validée"
            } else {
                pinColor='blue';
                desc = "Nouvelle Activité";
            }   
        }

        return <Marker key={i} coordinate={{latitude: data.address.latitude, longitude: data.address.longitude}} title={data.name} pinColor={pinColor} description={desc} />
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
                        latitudeDelta: 0.10, //0.10 au lieu de 0.05 => affichage de la périphérie de la ville
                        longitudeDelta: 0.10,
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