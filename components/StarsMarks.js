import {TouchableOpacity, Text, View, StyleSheet, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


function StarsMarks ({onPress, style}) {

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.logoutBtn} onPress={onPress}>
                <FontAwesome name= 'star' size={25} color={style} />
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    headerContainer: {
        height: '100%',
        width: '10%',
    },
    logoutBtn: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default StarsMarks;