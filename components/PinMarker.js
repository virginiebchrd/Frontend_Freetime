import {TouchableOpacity, Text, View, StyleSheet, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


function PinMarker (props) {

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.logoutBtn}>
                <FontAwesome name='map-pin' size={25} color={props.color} />
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


export default PinMarker;