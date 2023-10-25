import {TouchableOpacity, Text, View, StyleSheet, Image} from 'react-native';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import PinMarker from '../components/PinMarker';
import MyCheckboxResult from './MyCheckboxResult';

function CheckBoxContainer (props) {
    const [isToggled, setIsToggled] = useState(false);
    const navigation = useNavigation();
    console.log('propsC', props);

    const [fontsLoaded] = useFonts({
        'Indie-Flower': require('../assets/fonts/IndieFlower-Regular.ttf'),
    });

    if (!fontsLoaded) {
    return null;
    }
    
    /*if(isToggled) {
        navigation.navigate('ShowActivity',{activity: props.activity});
        setIsToggled(false);
    }*/

    return (
        <View style={styles.headerContainer}>
            <View style={styles.pinContainer}>
                <PinMarker color={props.activity.pinColor} />
            </View>
            <View style={styles.activityContainer}>
                <Text style={styles.checkboxName}>{props.activityName}</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <MyCheckboxResult 
                    isChecked={isToggled}
                    activity={props.activity}
                    />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    headerContainer: {
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#004644',
        fontFamily: 'Indie-Flower',
        color: '#cae1db',
    },
    pinContainer: {
        height: '100%',
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    activityContainer: {
        height: '100%',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    checkboxName: {
        fontFamily: 'Indie-Flower',
        color: '#cae1db',
        fontSize: 15,
    },
    checkboxContainer: {
        height: '100%',
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkbox: {
        margin: 8,
        height: 30,
        width: 30,
    },
});


export default CheckBoxContainer;