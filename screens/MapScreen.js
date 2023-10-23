import {TouchableOpacity, Text, View, StyleSheet, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import HeaderReturn from '../components/HeaderReturn';
import LargeButton from '../components/buttons/LargeButton';
import SmallButton from '../components/buttons/SmallButton';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';


export default function MapScreen ({navigation}) {
    const [myPosition, setMyPosition] = useState({});
    const [isAuthorized, setIsAuthorized] = useState(3);
    const [pressedCoordinates, setPressedCoordinates] = useState(null);

    
    useEffect( () => {
        
            ( async () => {
            const {status} = await Location.requestForegroundPermissionsAsync();
                console.log(status);
            if(status === 'granted') {
                const location = await Location.getCurrentPositionAsync({});
                setIsAuthorized(1);
                setMyPosition(location.coords);
                console.log(myPosition);
            } else if( status === 'denied') {
                setIsAuthorized(2);
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

    const handleValidate = () => {
        //dispatch coordonnées + ville si recherche par input
        navigation.navigate('Activities');
    }

    let card;
    if (isAuthorized === 1) { 
        card = <View style={styles.bodyContainer}>
                        <MapView initialRegion={{
                                latitude: 45.93618572359579,
                                longitude: 1.332240497502353,
                                latitudeDelta: 12,
                                longitudeDelta: 12,
                                }}
                                style={styles.mapContainer}
                                onLongPress={(e) => handleMap(e.nativeEvent)}
                        >
                            <Marker coordinate={{latitude: myPosition.latitude, longitude: myPosition.longitude}} />
                        </MapView>
                        <View style={styles.validateContainer}>
                            <SmallButton title="Valider" onPress={handleValidate} />
                        </View>
                    </View>
    } else if (isAuthorized === 2) {
        card = <View style={styles.bodyContainer}>
                        <View style={styles.inputContainer}><Text>INPUT</Text></View>
                        <MapView initialRegion={{
                            latitude: 50,
                            longitude: 1.332240497502353,
                            latitudeDelta: 12,
                            longitudeDelta: 12,
                            }}
                            style={styles.mapContainerNoGeo}
                            onLongPress={(e) => handleMap(e.nativeEvent)}
                    >

                    </MapView>
                    <View style={styles.validateContainer}>
                        <SmallButton title="Valider" onPress={handleValidate} />
                    </View>
                    </View>
    }
    else if (isAuthorized === 3) {
        <View>

        </View>
    }



    return (
        <View style={styles.container}>
            <LinearGradient colors={['#D9F2B1', 'transparent']}  style={styles.background} >
                <HeaderReturn iconContext="profil" pages='Who' />
                {card}
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