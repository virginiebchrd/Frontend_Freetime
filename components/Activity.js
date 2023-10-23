import {TouchableOpacity, Text, View, StyleSheet, Image} from 'react-native';
import PinMarker from './PinMarker';
import { useFonts } from 'expo-font';

function Activity (props) {
    const [fontsLoaded] = useFonts({
        'Indie-Flower': require('../assets/fonts/IndieFlower-Regular.ttf'),
    });

    return (
        <View style={styles.headerContainer}>
            <View style={styles.activityContainer} >
            <View style={styles.pinContainer}>
                <PinMarker color={props.activity.colorPin} />
            </View>
            <View style={styles.activityDetail}>
                <Text style={styles.text}>Activité {props.activity.key+1} : {props.activity.activityName}</Text>
                <Text style={styles.text}>Adresse : {props.activity.activity.adress}</Text>
                <Text style={styles.text}>{props.activity.activity.zipCode} {props.activity.activity.city}</Text>
                <Text style={styles.text}>mail: {props.activity.activity.email}</Text>
                <Text style={styles.text}>Tél. : {props.activity.activity.phoneNumber}</Text>
            </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    headerContainer: {
        height: '100%',
        width: '100%',
        borderWidth: 2,
        borderBlockColor: '#004644',
        backgroundColor: '#cae1db',
        alignItems: 'center',
        justifyContent: 'center'

    },
    activityContainer: {
        height: '90%',
        width: '90%',
        backgroundColor: '#004644',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    pinContainer: {
        height: '100%',
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    activityDetail: {
        height: '100%',
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    text: {
        fontFamily: 'Indie-Flower',
        fontSize: 15,
        color: '#cae1db',
    }
});


export default Activity;