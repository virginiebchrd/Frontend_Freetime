import {TouchableOpacity, Text, View, StyleSheet, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import HeaderReturn from '../components/HeaderReturn';
import SmallButton from '../components/buttons/SmallButton';
import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import InputWithLabel from '../components/inputs/InputWithLabel';
import { addCity } from '../reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';


export default function MapScreen ({navigation}) {
    
    const [myPosition, setMyPosition] = useState({});
    const [isAuthorized, setIsAuthorized] = useState(false)//useState(3);
    const [pressedCoordinates, setPressedCoordinates] = useState(null);
    const [city, setCity] = useState('');
    const [citySearch, setCitySearch] = useState(false);
    //const [coords, setCoords] = useState({});
    const dispatch = useDispatch();
    const coords = useSelector( (state) => state.user.value.city)
    
    useEffect( () => {
        
            ( async () => {
            const {status} = await Location.requestForegroundPermissionsAsync();
                console.log(status);
            if(status === 'granted') {
                const location = await Location.getCurrentPositionAsync({});
                setIsAuthorized(true);
                setMyPosition(location.coords);
                console.log(myPosition);
            }
        }) ()
    }, [])

    const [fontsLoaded] = useFonts({
        'Indie-Flower': require('../assets/fonts/IndieFlower-Regular.ttf'),
    });

    if (!fontsLoaded) {
    return null;
    }
    
    
    const handleMap = (pressed) => {
        console.log('clicked');
        setPressedCoordinates(pressed.coordinate);
        console.log(pressedCoordinates);
    }

    const handleSearch = () => {
        console.log(city);
        

        fetch(`https://api-adresse.data.gouv.fr/search/?q=${city}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setCitySearch(true);
            const firstCity = data.features[0];
            const newPlace = {
            name: firstCity.properties.city,
            latitude: firstCity.geometry.coordinates[1],
            longitude: firstCity.geometry.coordinates[0],
            };
            //setCoords({latitude: firstCity.geometry.coordinates[1] ,longitude: firstCity.geometry.coordinates[0]})
            dispatch(addCity(newPlace));
        })
    }

    const handleValidate = () => {
        //dispatch coordonnées + ville si recherche par input
        navigation.navigate('Activities');
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#D9F2B1', 'transparent']}  style={styles.background} >
                <HeaderReturn iconContext="profil" pages='Who' isNeeded={true} />
                    <View style={styles.bodyContainer}>
                            {!isAuthorized && <View style={styles.inputContainer}>
                                <InputWithLabel 
                                    placeholder='Entrer une ville' 
                                    icon={true}
                                    onChangeText={(value) => setCity(value)}
                                    onPress={() => handleSearch()}
                                />
                            </View>}
                            <MapView /*initialRegion={{
                                latitude: 50,
                                longitude: 1.332240497502353,
                                latitudeDelta: 12,
                                longitudeDelta: 12,
                                
                                }}*/
                                style={ isAuthorized? styles.mapContainer : styles.mapContainerNoGeo}
                                showsUserLocation
                                onLongPress={(e) => handleMap(e.nativeEvent)}
                        >
                            {citySearch && <Marker coordinate={{latitude: coords.latitude, longitude: coords.longitude}} title="Ma recherche" pinColor="#fecb2d" />}
                        </MapView>
                        <View style={styles.validateContainer}>
                            <SmallButton title="Valider" onPress={handleValidate} />
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
    mapContainer: {
        height: '80%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bodyContainer:{

        height: '80%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    GeolocalizeContainer: {
        height: '10%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        height: '5%',
        width: '80%',
        borderBottomWidth: 2,
        borderColor: '#004644',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'Indie-Flower',
        fontSize: 22,
        color: '#004644',
    },
    inputContainer: {
        height: '10%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapContainerNoGeo: {
        height: '60%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    validateContainer: {
        height: '20%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
  });