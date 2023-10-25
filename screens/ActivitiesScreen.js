import {TouchableOpacity, Text, View, StyleSheet, Image, ScrollView, SafeAreaView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import HeaderReturn from '../components/HeaderReturn';
import LargeButton from '../components/buttons/LargeButton';
import SmallButton from '../components/buttons/SmallButton';
import { useState } from 'react';
import ChooseActivity from '../components/ChooseActivity';
import { useDispatch, useSelector } from 'react-redux';

export default function ActivitiesScreen ({navigation}) {
    const [activitiesData, setActivitiesData] = useState([]);
    const [isShownSports, setIsShownSports] = useState(false);
    const [isShownArtistics, setIsShownArtistics] = useState(false);
    const [isShownCulture, setIsShownCulture] = useState(false);
    const [isShownEvasion, setIsShownEvasion] = useState(false);
    const hobbies = useSelector((state) => state.hobbies.value.hobbies);

    const [fontsLoaded] = useFonts({
        'Indie-Flower': require('../assets/fonts/IndieFlower-Regular.ttf'),
    });

    if (!fontsLoaded) {
    return null;
    }

    const handleSports = () => {
        setIsShownSports(true)
        console.log('sports');
        fetch(`http://192.168.1.12:3000/hobbies/sports`)
        .then(response => response.json())
        .then(data => {
            if(data.result){
                console.log(data.hobbies);
                setActivitiesData(data.hobbies);
            }
        })
        
    }

    const handleArtistics = () => {
        console.log('artistique');
        setIsShownArtistics(true)
        fetch(`http://192.168.1.12:3000/hobbies/artistique`)
        .then(response => response.json())
        .then(data => {
            if(data.result){
                console.log(data.hobbies);
                setActivitiesData(data.hobbies);
            }
        })
    }

    const handleCulture = () => {
        console.log('culture');
        setIsShownArtistics(true)
        fetch(`http://192.168.1.12:3000/hobbies/culture`)
        .then(response => response.json())
        .then(data => {
            if(data.result){
                console.log(data.hobbies);
                setActivitiesData(data.hobbies);
            }
        })
    }

    const handleEvasion = () => {
        console.log('evasion');
        setIsShownArtistics(true)
        fetch(`http://192.168.1.12:3000/hobbies/evasion`)
        .then(response => response.json())
        .then(data => {
            if(data.result){
                console.log(data.hobbies);
                setActivitiesData(data.hobbies);
            }
        })
    }

    const handleValidate = () => {
        if(isShownSports) {
            setIsShownSports(false);
        }
        else if(isShownArtistics) {
            setIsShownArtistics(false)
        }
        else if(isShownCulture) {
            setIsShownCulture(false);
        }
        else if(isShownEvasion) {
            setIsShownEvasion(false);
        }
        else {
            navigation.navigate('Result');
        }
    }

    const activities = activitiesData.map((data,i) => {
        const isChecked = hobbies.some(e=> e === data._id);
        return(<ChooseActivity key={i} activityName={data.name} id={data._id} isChecked={isChecked}/>)
    })

    let sports;
    if(isShownSports ) {
        sports = <View style={styles.bodyContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Quelle(s) activité(s) recherchez-vous ?</Text>
                    </View>

                    <View style={styles.categoryContainer}>
                        <LargeButton title='Sports' onPress={handleSports}/>
                    </View>  

                    <ScrollView contentContainerStyle={styles.scrollView}>
                        {activities}
                    </ScrollView>

                    <View style={styles.validateContainer}>
                        <SmallButton title='Valider' onPress={handleValidate} />
                    </View>
                </View>

    }else if(isShownArtistics) {
        sports = <View style={styles.bodyContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Quelle(s) activité(s) recherchez-vous ?</Text>
                    </View>

                    <View style={styles.categoryContainer}>
                        <LargeButton title='Activités artistiques' onPress={handleArtistics}/>
                    </View>  
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        {activities}
                    </ScrollView>

                    <View style={styles.validateContainer}>
                        <SmallButton title='Valider' onPress={handleValidate} />
                    </View>
                </View>
    }
    else if(isShownCulture) {
        sports = <View style={styles.bodyContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Quelle(s) activité(s) recherchez-vous ?</Text>
                    </View>

                    <View style={styles.categoryContainer}>
                        <LargeButton title='Activités culturelles' onPress={handleCulture}/>
                    </View>  
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        {activities}
                    </ScrollView>

                    <View style={styles.validateContainer}>
                        <SmallButton title='Valider' onPress={handleValidate} />
                    </View>
                </View>
    }
    else if(isShownEvasion) {
        sports = <View style={styles.bodyContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Quelle(s) activité(s) recherchez-vous ?</Text>
                    </View>

                    <View style={styles.categoryContainer}>
                        <LargeButton title='Evasion' onPress={handleEvasion}/>
                    </View>  
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        {activities}
                    </ScrollView>

                    <View style={styles.validateContainer}>
                        <SmallButton title='Valider' onPress={handleValidate} />
                    </View>
                </View>
    }
    else{
        sports = <View style={styles.bodyContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Quelle(s) activité(s) recherchez-vous ?</Text>
                    </View>
                        <View style={styles.categoryContainer}>
                            <LargeButton title='Sports' onPress={handleSports}/>
                        </View>
                        <View style={styles.categoryContainer}>
                            <LargeButton title='Activités artistiques' onPress={handleArtistics}/>
                        </View>
                        <View style={styles.categoryContainer}>
                            <LargeButton title='Activités culturelles' onPress={handleCulture} />
                        </View>
                        <View style={styles.categoryContainer}>
                            <LargeButton title='Evasion' onPress={handleEvasion}/> 
                        </View>
                    <View style={styles.validateContainer}>
                        <SmallButton title='Valider' onPress={handleValidate} />
                    </View>
                </View>
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#D9F2B1', 'transparent']}  style={styles.background} >
                <HeaderReturn iconContext="profil" pages='Map'/>
                
                {sports}
                
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