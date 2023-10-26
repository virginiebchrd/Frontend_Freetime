import {TouchableOpacity, Text, View, StyleSheet, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import HeaderReturn from '../components/HeaderReturn';
import SmallButton from '../components/buttons/SmallButton';
import Activity from '../components/Activity';
import MapView, { Marker } from 'react-native-maps';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeHobbies } from '../reducers/hobbiesReducer';

export default function ShareActivityScreen ({navigation, route}) {
    const dataActivity = route.params.activity;
    const dispatch = useDispatch();
    console.log(dataActivity);


    const [fontsLoaded] = useFonts({
        'Indie-Flower': require('../assets/fonts/IndieFlower-Regular.ttf'),
    });

    if (!fontsLoaded) {
    return null;
    }
    
    const handleReturn  = () => {
        dispatch(removeHobbies(dataActivity.id))
        navigation.navigate('Result');
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#D9F2B1', 'transparent']}  style={styles.background} >
                <HeaderReturn iconContext="profil" pages='Result' isNeeded={false} />

                <View style={styles.bodyContainer}>

                        <TouchableOpacity style={styles.titleContainer} onPress={() => handleReturn()}>
                            <Text style={styles.title}>Retourner vers les autres activités</Text>
                        </TouchableOpacity>
                        <Text style={styles.title}>Partager votre activité</Text>

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
                            <Marker coordinate={{latitude: dataActivity.latitude, longitude: dataActivity.longitude}} pinColor={dataActivity.colorPin}/>
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
    titleContainer: {
        height: '10%',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1
    },
    title: {
        fontSize: 22,
        fontFamily: 'Indie-Flower',
        color: '#004644',
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
    activityContainer: {
        height: '30%',
        width: '100%',
    },
    validateContainer: {
        height: '20%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

  });