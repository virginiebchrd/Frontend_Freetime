import {TouchableOpacity, Text, View, StyleSheet, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import HeaderReturn from '../components/HeaderReturn';
import LargeButton from '../components/buttons/LargeButton';
import SmallButton from '../components/buttons/SmallButton';


export default function ActivitiesScreen ({navigation}) {
    const [fontsLoaded] = useFonts({
        'Indie-Flower': require('../assets/fonts/IndieFlower-Regular.ttf'),
    });

    if (!fontsLoaded) {
    return null;
    }

    const handleSports = () => {
        console.log('sports');
    }

    const handleArtistics = () => {
        console.log('artistique');
    }

    const handleCulture = () => {
        console.log('culture');
    }

    const handleEvasion = () => {
        console.log('evasion');
    }

    const handleValidate = () => {
        //dispatch activité
        navigation.navigate('Result');
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#D9F2B1', 'transparent']}  style={styles.background} >
                <HeaderReturn iconContext="profil" pages='Map'/>

                <View style={styles.bodyContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Quelle(s) activité(s) recherchez-vous ?</Text>
                    </View>
                    <View style={styles.categoryContainer}>
                        <LargeButton title='Sports' onPress={handleSports}/>
                        <LargeButton title='Activités artistiques' onPress={handleArtistics}/>
                        <LargeButton title='Activités culturelles' onPress={handleCulture} />
                        <LargeButton title='Evasion' onPress={handleEvasion}/>
                    </View>
                    <View style={styles.validateContainer}>
                        <SmallButton title='Valider' onPress={handleValidate} />
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
        color: '#004644'
    },
    categoryContainer: {
        height: '70%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    validateContainer: {
        height: '20%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
  });