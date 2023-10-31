import {TouchableOpacity, Text, View, StyleSheet, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import HeaderReturn from '../components/HeaderReturn';
import SmallButton from '../components/buttons/SmallButton';
import Activity from '../components/Activity';
import MapView, { Marker } from 'react-native-maps';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeHobbies } from '../reducers/hobbiesReducer';

//const token = 'EnV8RoBmpHTaLSBCV7qvgHHD58SeazTH';

export default function ShowActivityScreen ({navigation, route}) {
    const token = useSelector((state) => state.user.value.token)
    console.log(token);
    const [isExisted, setIsExisted] = useState(false);
    const dispatch = useDispatch();
    const dataActivity = route.params.activity;
    console.log('dataAct', dataActivity);

    const [fontsLoaded] = useFonts({
        'Indie-Flower': require('../assets/fonts/IndieFlower-Regular.ttf'),
    });

    if (!fontsLoaded) {
    return null;
    }

    const handleValidate = () => {
        fetch(`https://backend-freetime.vercel.app/users/hobbies/${token}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({hobbies : dataActivity.id})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.result) {
                setIsExisted(false);
                navigation.navigate('ShareActivity',{activity: dataActivity});
            }
            else {
                console.log(data.error);
                setIsExisted(true);
            }
        })
        
    }

    if(isExisted) {
        dispatch(removeHobbies(dataActivity.id));
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#D9F2B1', 'transparent']}  style={styles.background} >
                <HeaderReturn iconContext="profil" pages='Result' isNeeded={true}/>

                <View style={styles.bodyContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Activité sélectionnée</Text>
                    </View>
                    <View style={styles.mapContainer}>
                        {/*TODO mettre coordonnée du useSelector */}
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
                        {isExisted && <Text style={styles.textError}>Activité déjà ajoutée</Text>}
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
        height: '32%',
        width: '100%',
    },
    validateContainer: {
        height: '20%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
    },
    textError: {
        marginTop: 10,
        fontSize: 18,
        fontFamily: 'Indie-Flower',
        color: '#004644',
    },

  });