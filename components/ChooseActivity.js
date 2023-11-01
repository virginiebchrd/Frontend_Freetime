import { Dimensions, Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

import { useSelector } from 'react-redux';
import MyCheckbox from '../components/MyCheckbox';


function ChooseActivity (props) {
    const who = useSelector( (state) => state.hobbies.value.who);
    let isChecked = false;

    const [fontsLoaded] = useFonts({
        'Indie-Flower': require('../assets/fonts/IndieFlower-Regular.ttf'),
    });

    if (!fontsLoaded) {
    return null;
    }

    if(who === 'perso') {
        isChecked = props.isCheckedPerso;
    }
    else if(who === 'famille') {
        isChecked = props.isCheckedFamille;
    }
    else if(who === 'amis') {
        isChecked = props.isCheckedAmis;
    }

    return (
        <View style={styles.headerContainer}>
            <View style={styles.activityContainer}>
                <Text style={styles.checkboxName}>{props.activityName}</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <MyCheckbox 
                isChecked={props.isChecked}
                id={props.id}
                />
            </View>
        </View>
    )
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    headerContainer: {
        width: (windowWidth*0.9)  - 10,
        maxHeight: 100,
        flexDirection: 'row',
        backgroundColor: '#004644',
        fontFamily: 'Indie-Flower',
        color: '#cae1db',
        marginLeft: 10,
        marginTop:5,
        marginBotton: 5,
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
        textAlign: 'center',
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

    checkboxBase: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#cae1db',
        backgroundColor: '#cae1db',
      },
      checkboxChecked: {
        backgroundColor: 'white',
      },
});


export default ChooseActivity;