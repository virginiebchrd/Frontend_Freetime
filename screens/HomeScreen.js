import {TouchableOpacity, Text, View, StyleSheet, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

export default function HomeScreen ({navigation}) {
    const [fontsLoaded] = useFonts({
        'Indie-Flower': require('../assets/fonts/IndieFlower-Regular.ttf'),
    });

    if (!fontsLoaded) {
    return null;
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#D9F2B1', 'transparent']}  style={styles.background} >
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcome}>Welcome to</Text>
                </View>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/FreeTime-logos_transparent.png')} style={styles.logo} />
                </View>

                <View style={styles.buttonContainer}>
                    <View style={styles.gradientContainer}>
                        <LinearGradient colors={['transparent', '#004644']}  style={styles.background}>
                            <TouchableOpacity style={styles.buttonBackground} onPress={() => navigation.navigate('ShowActivity')}>
                                <Text>First</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>

                    <View style={styles.gradientContainer}>
                        <LinearGradient  colors={['transparent', '#004644']}  style={styles.background}>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Connection')}>
                                <Text>Connexion</Text>
                            </TouchableOpacity>
                        </LinearGradient>
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
    gradientContainer: {
        height: '20%',
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 50,
    },
    welcomeContainer: {
        height: '25%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    welcome: {
        color: '#004644',
        fontSize: 50,
        fontFamily: 'Indie-Flower'
    },
    logoContainer: {
        height: '25%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: '100%',
        width: '125%',
    },
    buttonBackground: {
        height: '50%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        height: '100%',
        width: '100%',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        height: '45%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
    }
  });