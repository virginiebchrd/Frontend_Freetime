import {TouchableOpacity, Text, View, StyleSheet, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Logout from './Logout';
import Profil from './Profil';
import Return from './Return';

function HeaderReturn ({iconContext, pages, isNeeded}) {
    const navigation = useNavigation();

    const handleReturn = () => {
        if(pages === 'ComeFromProfil') {
            navigation.goBack();
        }
        else {
            navigation.navigate(pages);
        }
    }

    const handleLogout = () => {
        console.log('logout');
        //dispatch() retirer adresse mail
        navigation.navigate('Home');
    }

    const handleProfil = () => {
        navigation.navigate('Profil')
    }

    const handleLogo = () => {
        navigation.navigate('Map');
    }

    let icon;
    if(iconContext === 'logout') {
        icon = <Logout onPress={handleLogout}/>
    }
    else if(iconContext === 'profil') {
        icon = <Profil onPress={handleProfil}/>
    }


    return (
        <View style={styles.headerContainer}>
            <LinearGradient colors={['#004644', 'transparent']}  style={styles.headerGradient} >
                <View style={styles.returnContainer}>
                    {isNeeded && <Return onPress={handleReturn}/>}
                </View>
                <View style={styles.logoContainer}>
                    <TouchableOpacity style={styles.logoTouchable} onPress={()=>handleLogo()}>
                        <Image source={require('../assets/FreeTime-logos_transparent.png')} style={styles.logo} />
                    </TouchableOpacity>
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
        height: '15%',
        width: '100%',
    },
    headerGradient: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        paddingTop: 20
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
    logoTouchable: {
        height: '100%',
        width: '100%',
    },
    profilContainer: {
        height: '20%',
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default HeaderReturn;