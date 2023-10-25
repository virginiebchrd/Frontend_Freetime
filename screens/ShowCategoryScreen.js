import {TouchableOpacity, Text, View, StyleSheet, Image, ScrollView, SafeAreaView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import HeaderReturn from '../components/HeaderReturn';
import LargeButton from '../components/buttons/LargeButton';
import SmallButton from '../components/buttons/SmallButton';
import { useState } from 'react';
import ChooseActivity from '../components/ChooseActivity';
import { useDispatch, useSelector } from 'react-redux';

export default function ShowCategoryScreen ({navigation, route}) {
    const activitiesData = route.params.dataToSend.hobbies;
    const title = route.params.dataToSend.category;

    console.log('test', activitiesData, 'title', title);
    
    const hobbies = useSelector((state) => state.hobbies.value.hobbies);

    const [fontsLoaded] = useFonts({
        'Indie-Flower': require('../assets/fonts/IndieFlower-Regular.ttf'),
    });

    if (!fontsLoaded) {
    return null;
    }

    
    const handleValidate = () => {
        navigation.navigate('Activities');
    }

    const activities = activitiesData.map((data,i) => {
        const isChecked = hobbies.some(e=> e === data._id);
        return(<ChooseActivity key={i} activityName={data.name} id={data._id} isChecked={isChecked}/>)
    })

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#D9F2B1', 'transparent']}  style={styles.background} >
                <HeaderReturn iconContext="profil" pages='Map' isNeeded={true}/>
                
                <View style={styles.bodyContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Quelle(s) activité(s) recherchez-vous ?</Text>
                    </View>

                    <View style={styles.categoryContainer}>
                        <LargeButton title={title} />
                    </View>  

                    <ScrollView contentContainerStyle={styles.scrollView}>
                        {activities}
                    </ScrollView>

                    <View style={styles.validateContainer}>
                        <SmallButton title='Valider' onPress={handleValidate} />
                    </View>
                </View>
                
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    bodyContainer: {
        height: '80%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    titleContainer: {
        height: '10%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontFamily: 'Indie-Flower',
        color: '#004644'
    },
    categoryContainer: {
        height: '15%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkBoxContainer: {
        height: '50%',
        width: '100%',
    },
    validateContainer: {
        height: '20%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        height: '50%',
        width: '100%',
    },
    buttonContainer: {
        height: '60%',
        width: '100%',
        borderWidth: 1
    },
    test: {
        height: '20%',
        width: '100%',
    }
  });