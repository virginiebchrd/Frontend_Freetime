import {TouchableOpacity, Text, View, StyleSheet, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import HeaderReturn from '../components/HeaderReturn';
import Activity from '../components/Activity';
import MapView, { Marker } from 'react-native-maps';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeHobbies, storeHobbiesSaved } from '../reducers/hobbiesReducer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ShareActivityScreen ({navigation, route}) {
    const dataActivity = route.params.activity;

    const dispatch = useDispatch();

    const [fontsLoaded] = useFonts({
        'Indie-Flower': require('../assets/fonts/IndieFlower-Regular.ttf'),
    });

    if (!fontsLoaded) {
    return null;
    }
    
    const handleReturn  = () => {
        dispatch(removeHobbies(dataActivity.id));
        navigation.navigate('Result');
    }

    const handleProfil = () => {
        dispatch(removeHobbies(dataActivity.id));
        dispatch(storeHobbiesSaved([dataActivity.id]));
        navigation.navigate('Profil');
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#D9F2B1', 'transparent']}  style={styles.background} >
                <HeaderReturn pages='Result' isNeeded={false} />
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.logoutBtn} onPress={() => handleProfil()}>
                        <FontAwesome name= 'user' size={25} color='#cae1db' />
                    </TouchableOpacity>
                </View>

                <View style={styles.bodyContainer}>

                        <TouchableOpacity style={styles.titleContainer} onPress={() => handleReturn()}>
                            <FontAwesome name= 'arrow-left' size={25} color='#cae1db' />
                            <Text style={styles.returnText}>Retour vers Résultats</Text>
                        </TouchableOpacity>

                        <Text style={styles.title}>Validation de votre activité</Text>

                    <View style={styles.mapContainer}>
                        <MapView 
                        initialRegion={{
                            latitude: dataActivity.latitude,
                            longitude: dataActivity.longitude,
                            latitudeDelta: 0.025,
                            longitudeDelta: 0.025,
                        }}
                        style={styles.map}
                        >
                            <Marker coordinate={{latitude: dataActivity.latitude, longitude: dataActivity.longitude}} pinColor={dataActivity.pinColor}/>
                        </MapView>
                    </View>
                    <View style={styles.activityContainer}>
                        <Activity {...route.params} />
                    </View>
                    
                    <View style={styles.validateContainer}>

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
    headerContainer: {
        height: '5%',
        width: '10%',
        zIndex: 5,
        position: 'absolute',
        right: 25,
        top: 75,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer: {
        height: '5%',
        width: '60%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderWidth: 1,
        backgroundColor: "#004644",
        borderRadius: 20,
        borderColor: '#004644',
    },
    returnText: {
        fontSize: 18,
        fontFamily: 'Indie-Flower',
        color: '#cae1db',
    },
    title: {
        fontSize: 22,
        fontFamily: 'Indie-Flower',
        color: '#004644',
        marginTop : 15,
        marginBottom: 15,
    },
    mapContainer: {
        height: '40%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    map: {
        height: '100%',
        width: '100%',
    },
    activityContainer: {
        height: '30%',
        width: '90%',
        marginTop: 15,
    },
    validateContainer: {
        height: '20%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 15,
    },

  });