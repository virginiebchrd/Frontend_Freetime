import {TouchableOpacity, Text, View, StyleSheet, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function Profil () {

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.logoutBtn}>
                <FontAwesome name= 'user' size={25} color='#cae1db' />
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    headerContainer: {
        height: '100%',
        width: '100%',
    },
    logoutBtn: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default Profil;