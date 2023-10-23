import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { useDispatch, useSelector } from 'react-redux';
import { addEmail, addPassword } from '../reducers/userReducer';
import HeaderReturn from '../components/HeaderReturn';
import SmallButton from '../components/buttons/SmallButton';
import InputWithLabel from '../components/inputs/InputWithLabel';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function FirstConnectionScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const fontsLoaded = useFonts({
    'Indie-Flower': require('../assets/fonts/IndieFlower-Regular.ttf'),
  });

  const handleSubmit = () => {
    console.log('E-mail:', mail);
    console.log('Password:', password);

    if (EMAIL_REGEX.test(mail) && password.length >= 6) {
      console.log('Conditions remplies.');

      // Dispatch actions to store the email and password
      dispatch(addEmail(mail));
      dispatch(addPassword(password));

      // Navigate to the 'Profil' screen
      navigation.navigate('Profil');
    } else {
      console.log('Champs vides ou conditions non remplies.');
      setEmailError(!EMAIL_REGEX.test(mail));
      setPasswordError(password.length < 6);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  const valider = 'Valider';
  const EmailPlaceholder = 'Entrer votre adresse mail';
  const PasswordLabel = 'Mot de passe';

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#D9F2B1', 'transparent']}
        style={styles.background}
      >
        <HeaderReturn />

        <View style={styles.InputsContainer}>
          <Text style={styles.title}>Se connecter avec une adresse mail</Text>

          <InputWithLabel
            placeholder={EmailPlaceholder}
            label="Mail"
            onChangeText={(value) => setMail(value)}
            value={mail}
            icon={false}
            autoComplete="email"
            keyboardType="email-address"
          />

          <InputWithLabel
            placeholder={PasswordLabel}
            label={PasswordLabel}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry
          />
            <InputWithLabel
            placeholder={PasswordLabel}
            label={PasswordLabel}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry
          />

          {( passwordError) && (
            <Text style={styles.TextError}>le mot de passe n'est pas identique !</Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <SmallButton title={valider} onPress={handleSubmit} />
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
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
  InputsContainer: {
    height: '50%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
  },
  buttonContainer: {
    height: '20%',
    width: 500,
    alignItems: 'center',
    marginBottom: 0,
  },
  title: {
    color: '#004644',
    fontFamily: 'Indie-Flower',
    fontSize: 20,
    marginBottom: 10,
  },
  TextError: {
    color: '#da122a',
    fontFamily: 'Indie-Flower',
    marginBottom: 10,
  },
});
