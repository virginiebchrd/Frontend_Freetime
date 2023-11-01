import {TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Logout from './Logout';
import Profil from './Profil';
import Return from './Return';
import { logout } from '../reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { removeHobbiesAmis, removeHobbiesFamille, removeHobbiesLogout, removeHobbiesPerso, removeHobbiesSavedAmis, removeHobbiesSavedFamille, removeHobbiesSavedPerso } from '../reducers/hobbiesReducer';
import Trash from './Trash';


function HeaderReturn ({iconContext, pages, isNeeded, idActivity, token, who}) {
    const navigation = useNavigation();
    const dispatch = useDispatch();

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
        dispatch(logout());
        dispatch(removeHobbiesLogout());
        navigation.navigate('Home');
    }

    const handleProfil = () => {
        navigation.navigate('Profil');
    }

    const handleLogo = () => {
        navigation.navigate('Calendar');
    }

    const handleTrash = () => {
        console.log('trash', who);
        fetch(`https://backend-freetime.vercel.app/users/delete/query?id=${idActivity}&token=${token}&who=${who}`,{
        
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then(data => {
            
            if(data.result) {
                if(who === 'perso') {
                    dispatch(removeHobbiesPerso(idActivity))
                    dispatch(removeHobbiesSavedPerso(idActivity))
                }
                else if(who === 'famille') {
                    dispatch(removeHobbiesFamille(idActivity))
                    dispatch(removeHobbiesSavedFamille(idActivity))
                }
                else if(who === 'amis') {
                    dispatch(removeHobbiesAmis(idActivity))
                    dispatch(removeHobbiesSavedAmis(idActivity))
                }
                navigation.navigate('Profil');
            }
        })
    }

    let icon;
    if(iconContext === 'logout') {
        icon = <Logout onPress={handleLogout}/>
    }
    else if(iconContext === 'profil') {
        icon = <Profil onPress={handleProfil}/>
    }
    else if(iconContext === 'trash') {
        icon = <Trash onPress={handleTrash} />
    }

    return (
        <View style={styles.headerContainer}>
            <LinearGradient colors={['#004644', 'transparent']}  style={styles.headerGradient} >
                <View style={styles.returnContainer}>
                    {isNeeded && <Return onPress={() => handleReturn()}/>}
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
        height: '18%',
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
        height: '140%',
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