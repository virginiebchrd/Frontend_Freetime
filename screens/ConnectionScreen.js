import {TouchableOpacity, Text, View, StyleSheet, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HeaderReturn from '../components/HeaderReturn';

export default function FirstConnectionScreen ({navigation}) {
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#D9F2B1', 'transparent']}  style={styles.background} >
                <HeaderReturn />

                <View style={styles.bodyContainer}>
                    <Text>Connection Screen</Text>
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
        justifyContent: 'center',
    }
  });