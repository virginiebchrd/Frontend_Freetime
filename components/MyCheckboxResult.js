import { StyleSheet, Pressable} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function MyCheckboxResult(props) {
    const [checked, setChecked] = useState(props.isChecked);
    const navigation = useNavigation();
    
    const handlePress = () => {
        setChecked(!checked)
        if(!checked) {
          if(props.resultPages) {
            navigation.navigate('ShowActivity',{activity: props.activity})
          }
          else {
            navigation.navigate('Marks',{activity: props.activity, who: props.who})
          }
          setChecked(false);
      }
    }
    
    

    return (
      <Pressable
        style={[styles.checkboxBase, checked && styles.checkboxChecked]}
        onPress={() => handlePress()}>
        {checked && <Ionicons name="checkmark" size={24} color="#004644" />}
      </Pressable>
    );
  }

  const styles = StyleSheet.create({
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

  export default MyCheckboxResult;