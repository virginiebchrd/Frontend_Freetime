import { Text, View, StyleSheet} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import HeaderReturn from '../components/HeaderReturn';
import LargeButton from "../components/buttons/LargeButton";
import { useDispatch } from 'react-redux';
import { chooseWho } from '../reducers/hobbiesReducer';

export default function WhoScreen ({navigation}) {
    const dispatch = useDispatch();

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

    //les fonctions qui sont utilisées dans les boutons
    const handleOnlyME = () => {
        dispatch(chooseWho('perso'));
        navigation.navigate("Map", {who : 'perso'})
    }

    const handleWithFamily = () => {
        dispatch(chooseWho('famille'));
        navigation.navigate("Map", {who : 'famille'})
    }

    const handleWithFriends = () => {
        dispatch(chooseWho('amis'));
        navigation.navigate("Map", {who : 'amis'})
    }
    
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#D9F2B1', 'transparent']}  style={styles.background} >
                <HeaderReturn iconContext="profil" pages="Calendar" isNeeded={true} />

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
