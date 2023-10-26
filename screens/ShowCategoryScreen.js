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
                <HeaderReturn iconContext="profil" pages='Activities' isNeeded={true}/>
                        <Text style={styles.title}>Quelle(s) activité(s) recherchez-vous ?</Text>
                        <View style={styles.largeButton} >
                            <LargeButton title={title} style={styles.test}/>
                        </View>
                        <ScrollView>
                            <View style={styles.scrollView}>
                                {activities}
                            </View>
                        </ScrollView>

                        <View style={styles.smallButton} >
                            <SmallButton title='Valider' onPress={handleValidate} />
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
    title: {
        fontSize: 22,
        fontFamily: 'Indie-Flower',
        color: '#004644',
    },
    scrollView: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    largeButton: {
        height:'15%',
        width: '70%',
    },
    smallButton: {
        height:'15%',
        width: '40%',
    }
  });