import {TouchableOpacity, Text, View, StyleSheet, Image} from 'react-native';
import PinMarker from './PinMarker';
import { useFonts } from 'expo-font';

import * as Linking from 'expo-linking';

function Activity (props) {
    const [fontsLoaded] = useFonts({
        'Indie-Flower': require('../assets/fonts/IndieFlower-Regular.ttf'),
    });
    console.log('propsActivity', props);

    //const siteWeb = props.activity.site

    return (
        <View style={styles.headerContainer}>
            <View style={styles.activityContainer} >
            <View style={styles.pinContainer}>
                <PinMarker />
            </View>
            <View style={styles.activityDetail}>
                <Text style={styles.text}>Activité {props.activity.key+1} : {props.activity.activityName}</Text>
                <Text style={styles.text}>Adresse : {props.activity.adress}</Text>
                <Text style={styles.text}>{props.activity.zipCode} {props.activity.city}</Text>
                <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(`tel:${props.activity.phoneNumber}`)}>
                    <Text style={styles.text}>Tél.: {props.activity.phoneNumber}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(props.activity.site)}>
                    <Text style={styles.text}>Site web : {props.activity.site}</Text>
                </TouchableOpacity>
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