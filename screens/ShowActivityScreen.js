import { Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import HeaderReturn from '../components/HeaderReturn';
import SmallButton from '../components/buttons/SmallButton';
import Activity from '../components/Activity';
import MapView, { Marker } from 'react-native-maps';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function ShowActivityScreen ({navigation, route}) {
    const token = useSelector((state) => state.user.value.token);
    const who = useSelector((state) => state.hobbies.value.who);

    const [isExisted, setIsExisted] = useState(false);

    const dataActivity = route.params.activity;

    const [fontsLoaded] = useFonts({
        'Indie-Flower': require('../assets/fonts/IndieFlower-Regular.ttf'),
    });

    if (!fontsLoaded) {
    return null;
    }

    const handleValidate = () => {
        fetch(`https://backend-freetime.vercel.app/users/hobbies/query?token=${token}&who=${who}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({hobbies : dataActivity.id})
            })
            .then(response => response.json())
            .then(data => {
                if(data.result) {
                    setIsExisted(false);
                    navigation.navigate('ShareActivity',{activity: dataActivity});
                }
                else {
                    setIsExisted(true);
                }
            })        
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#D9F2B1', 'transparent']}  style={styles.background} >
                <HeaderReturn iconContext="profil" pages='Result' isNeeded={true} />

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
                            <Marker coordinate={{latitude: dataActivity.latitude, longitude: dataActivity.longitude}} pinColor={dataActivity.pinColor}/>
                        </MapView>
                    </View>
                    <View style={styles.activityContainer}>
                        <Activity {...route.params} />
                    </View>
                    
                    <View style={styles.validateContainer}>
                        {isExisted && <Text style={styles.textError}>Activité déjà ajoutée</Text>}
                        <SmallButton  title='Valider' onPress={handleValidate} />
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