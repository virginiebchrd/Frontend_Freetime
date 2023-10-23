import {TouchableOpacity, Text, View, StyleSheet, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HeaderReturn from '../components/HeaderReturn';
import SmallButton from '../components/buttons/SmallButton';

export default function ProfilScreen ({navigation}) {
    const [fontsLoaded] = useFonts({
        'Indie-Flower': require('../assets/fonts/IndieFlower-Regular.ttf'),
    });

    if (!fontsLoaded) {
    return null;
    }

    const handleValidate = () => {
        //dispatch activité
        navigation.navigate('Calendar');
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#D9F2B1', 'transparent']}  style={styles.background} >
                <HeaderReturn icon="logout" pages='ComeFromProfil'/>

                <View style={styles.bodyContainer}>
                    <View style={styles.titleContainer}>
                        <FontAwesome name='user' size={75} color='#004644' />
                        <Text style={styles.title}>Prénom Nom</Text>
                    </View>

                    <View style={styles.infoContainer}>

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
        height: '20%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 22,
        fontFamily: 'Indie-Flower',
        color: '#004644'
    },
    infoContainer:{
        height: '60%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    validateContainer: {
        height: '20%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
  });