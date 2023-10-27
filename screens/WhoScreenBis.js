import { Text, View, StyleSheet} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import HeaderReturn from '../components/HeaderReturn';
import LargeButton from "../components/buttons/LargeButton";

export default function WhoScreenBis ({navigation}) {
    const [fontsLoaded] = useFonts({
        'Indie-Flower': require('../assets/fonts/IndieFlower-Regular.ttf'),
    });

    if (!fontsLoaded) {
    return null;
    }
    //text affiché dans les boutons
    const partenaire = "Mon/Ma partenaire";
    const enfant1 = "Mon premier enfant";
    const enfant2 = "Mon deuxième enfant";
    //TODO a mettre à jour 
    const uniquementCertainesPersonnes = "Uniquement Certaines Personnes";

    
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#D9F2B1', 'transparent']}  style={styles.background} >
                <HeaderReturn iconContext="profil" pages="Calendar" isNeeded={true}/>

                <View style={styles.bodyContainer}>
                    <Text style={styles.titlePage}>Qui va participer ?</Text>
                     
                <View style={styles.buttonContainer}>
                    <LargeButton title={partenaire} onPress={handleOnlyME}/>
                </View>
                <View style={styles.buttonContainer}>
                    <LargeButton title={enfant1} onPress={handleWithFamily}/>
                </View>
                <View style={styles.buttonContainer}>
                    <LargeButton title={enfant2} onPress={handleWithFriends}/>
                </View>
                <View style={styles.buttonContainer}>
                    <LargeButton title={uniquementCertainesPersonnes} onPress={handleOtherPerson}/>
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
        justifyContent: 'center',
    },
    buttonContainer: {
        height: '20%',
        width: '100%',
        alignItems: 'center',
        bottom: 0,
    },
    titlePage: {
        fontSize: 30,
        color: '#004644',
        fontFamily: 'Indie-Flower',
        fontWeight: 'bold',
    },
  });
