import {TouchableOpacity, Text, View, StyleSheet, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Logout from './Logout';
import Profil from './Profil';
import Return from './Return';


function HeaderReturn (props) {
    let icon;
    if(props.icon === 'logout') {
        icon = <Logout />
    }
    else if(props.icon === 'profil') {
        icon = <Profil />
    }
    return (
        <View style={styles.headerContainer}>
            <LinearGradient colors={['#004644', 'transparent']}  style={styles.headerGradient} >
                <View style={styles.returnContainer}>
                    <Return />
                </View>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/FreeTime-logos_transparent.png')} style={styles.logo} />
                </View>
                <View style={styles.profilContainer}>
                    {icon}
                </View>
            </LinearGradient>
        </View>
    )
};

const styles = StyleSheet.create({
    headerContainer: {
        height: '20%',
        width: '100%',
    },
    headerGradient: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
    },
    logo: {
        height: '100%',
        width: '100%',
    },
    returnContainer: {
        height: '20%',
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        height: '20%',
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilContainer: {
        height: '20%',
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default HeaderReturn;