import {TouchableOpacity, Text, View, StyleSheet, Image, Pressable} from 'react-native';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addHobbies, removeHobbies } from '../reducers/hobbiesReducer';
import { Ionicons } from '@expo/vector-icons';

function MyCheckbox(props) {
    const [checked, setChecked] = useState(props.isChecked);
    const dispatch = useDispatch();
    
    const handlePress = () => {
        setChecked(!checked)

        if(!checked) {
            console.log('add');
            dispatch(addHobbies(props.id))
        }
        else {
            console.log('remove');
            dispatch(removeHobbies(props.id))
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

  export default MyCheckbox;