import { Text, View, StyleSheet} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import HeaderReturn from '../components/HeaderReturn';
import LargeButton from "../components/buttons/LargeButton";

export default function WhoScreen ({navigation}) {
    const [fontsLoaded] = useFonts({
        'Indie-Flower': require('../assets/fonts/IndieFlower-Regular.ttf'),
    });

    if (!fontsLoaded) {
    return null;
    }
    //text affiché dans les boutons
    const seulementMoi = "Seulement Moi";
    const avecMaFamille = "Avec Ma Famille";
    const avecMesAmis = "Avec Mes Amis";
    const uniquementCertainesPersonnes = "Uniquement Certaines Personnes";

    //les fonctions qui sont utilisées dans les boutons
    const handleOnlyME = () => {
        navigation.navigate("Map")
    }

    const handleWithFamily = () => {
        alert("sélectionner un activité avec la famille(adultes et enfants)");
    }

    const handleWithFriends = () => {
        alert("sélectionner un activité avec les amis (adultes)");
    }

    const handleOtherPerson = () => {
        alert("sélectionner un activité pour une autre personne");
    }
    
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#D9F2B1', 'transparent']}  style={styles.background} >
                <HeaderReturn iconContext="profil" pages="Calendar"/>

                <View style={styles.bodyContainer}>
                    <Text style={styles.titlePage}>Qui va participer ?</Text>
                     
                <View style={styles.buttonContainer}>
                    <LargeButton title={seulementMoi} onPress={handleOnlyME}/>
                </View>
                <View style={styles.buttonContainer}>
                    <LargeButton title={avecMaFamille} onPress={handleWithFamily}/>
                </View>
                <View style={styles.buttonContainer}>
                    <LargeButton title={avecMesAmis} onPress={handleWithFriends}/>
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
