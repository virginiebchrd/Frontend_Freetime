import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import HeaderReturn from '../components/HeaderReturn';
import LargeButton from '../components/buttons/LargeButton';
import SmallButton from '../components/buttons/SmallButton';
import ChooseActivity from '../components/ChooseActivity';
import { useSelector } from 'react-redux';

export default function ShowCategoryScreen ({navigation, route}) {
    const activitiesData = route.params.dataToSend.hobbies;
    const title = route.params.dataToSend.category;
    
    const who = useSelector( (state) => state.hobbies.value.who);

    const hobbiesPerso = useSelector((state) => state.hobbies.value.hobbiesPerso);
    const hobbiesAmis = useSelector((state) => state.hobbies.value.hobbiesAmis);
    const hobbiesFamille = useSelector((state) => state.hobbies.value.hobbiesFamille);

    const [fontsLoaded] = useFonts({
        'Indie-Flower': require('../assets/fonts/IndieFlower-Regular.ttf'),
    });

    if (!fontsLoaded) {
    return null;
    }

    
    const handleValidate = () => {
        navigation.navigate('Activities');
    }

    let activities;
    if(activitiesData.length > 0) {
        activities = activitiesData.map((data,i) => {
            const isCheckedPerso = hobbiesPerso.some(e=> e === data._id);
            const isCheckedAmis = hobbiesAmis.some(e=> e === data._id);
            const isCheckedFamille = hobbiesFamille.some(e=> e === data._id);
            return(<ChooseActivity key={i} activityName={data.name} id={data._id} isCheckedPerso={isCheckedPerso} isCheckedAmis={isCheckedAmis}  isCheckedFamille={isCheckedFamille}/>)
        })
    }
    else {
        activities =  <View><Text style={styles.text}>Pas d'activités correspondant à vos critères</Text></View>
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#D9F2B1', 'transparent']}  style={styles.background} >
                <HeaderReturn iconContext="profil" pages='Activities' isNeeded={false}/>
                        <Text style={styles.title}>Quelle(s) activité(s) recherchez-vous ?</Text>
                        <View style={styles.largeButton} >
                            <LargeButton title={title}/>
                        </View>
                        <ScrollView>
                            <View style={styles.scrollView}>
                                {activities}
                            </View>
                        </ScrollView>

                        <View style={styles.smallButton} >
                            <SmallButton title='Retour' onPress={handleValidate} />
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
    largeButton: {
        height:'15%',
        width: '70%',
    },
    text: {
        fontSize: 17,
        fontFamily: 'Indie-Flower',
        color: '#004644',
    },
    scrollView: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    smallButton: {
        height:'15%',
        width: '40%',
    }
  });