import {TouchableOpacity, Text, View, StyleSheet, Image} from 'react-native';
import Checkbox from 'expo-checkbox';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';


function ChooseActivity (props) {
    const [isToggled, setIsToggled] = useState(false);
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        'Indie-Flower': require('../assets/fonts/IndieFlower-Regular.ttf'),
    });

    if (!fontsLoaded) {
    return null;
    }

    return (
        <View style={styles.headerContainer}>
            <View style={styles.activityContainer}>
                <Text style={styles.checkboxName}>{props.activityName}</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <Checkbox
                    style={styles.checkbox}
                    value={isToggled}
                    onValueChange={setIsToggled}
                    color={isToggled ? '#cae1db' : undefined}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    headerContainer: {
        height: '40%',
        width: '90%',
        flexDirection: 'row',
        backgroundColor: '#004644',
        fontFamily: 'Indie-Flower',
        color: '#cae1db',
        marginLeft: 10,
    },
    activityContainer: {
        height: '100%',
        width: '70%',
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


export default ChooseActivity;