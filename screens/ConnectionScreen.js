import { View, StyleSheet, Text,KeyboardAvoidingView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import HeaderReturn from "../components/HeaderReturn";
import SmallButton from "../components/buttons/SmallButton";
import InputWithLabel from "../components/inputs/InputWithLabel";
//pour créer un état et stocker la valeur de l'état
import { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmail } from '../reducers/userReducer';

//pris sur emailregex.com
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default function FirstConnectionScreen({ navigation }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value)

  const[mail, setMail] = useState(""); 
  const [emailError, setMailError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [isAllowed, setIsAllowed] = useState(false);


  const handleSubmit = () => {
    console.log('E-mail:', mail);
    console.log('Password:', password);
    console.log('isAllowed:', isAllowed);

    if (EMAIL_REGEX.test(mail) && password.length >= 6) {
      console.log('Conditions remplies.');
      if (password === 'azerty' && mail === '123456@gmail.com') {
        console.log('Conditions de connexion remplies.');
        setIsAllowed(true);
        dispatch(updateEmail(mail));
        navigation.navigate('Profil');
      } else {
        console.log('Mot de passe ou e-mail incorrect.');
        setMailError(true);
        setPasswordError(true);
        setIsAllowed(false);
        setMail('');
        setPassword('');
      }
    } else {
      console.log('Champs vides ou conditions non remplies.');
      setMailError(true);
      setPasswordError(true);
      setIsAllowed(false);
      setMail('');
      setPassword('');
    }
  };

    /* connecter avec une adresse mail et mot de passe déjà enregistré ???
  useEffect(() => {
    user.email && user.password && navigation.navigate('Profil');
  }, []);
  */

  const [fontsLoaded] = useFonts({
    "Indie-Flower": require("../assets/fonts/IndieFlower-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  //text affiché dans le bouton et placeholder des inputs 
  const valider = "Valider";
  const EmailPlaceholder = "Entrer votre adresse mail";
  const Password = "Entrer votre mot de passe";
  const EmailLabel = "Mail";
  const PasswordLabel = "Mot de passe";

  
 
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

      <LinearGradient
        colors={["#D9F2B1", "transparent"]}
        style={styles.background}
      >
        <HeaderReturn />

        <View style={styles.InputsContainer}>
             
          <Text style={styles.title}>Se connecter avec une adresse mail</Text>

          <InputWithLabel 
          placeholder={EmailPlaceholder} 
          label={EmailLabel}  
          onChangeText={(value) => setMail(value)}
          value={mail}
          icon={false}
          autoComplete="email"
          keyboardType="email-address"
          />


          <InputWithLabel 
          placeholder={Password} 
          label={PasswordLabel}  
          icon={false}
          onChangeText={(value) => setPassword(value)}
         />

          {(emailError || passwordError) && <Text style={styles.TextError}>Erreur mot de passe ou mail ?</Text>}
         
        </View>

       {isAllowed ? (
            <View style={styles.buttonContainer}>
              <SmallButton title={valider} onPress={() => navigation.navigate('ConnectionScreen')} />
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <SmallButton title={valider} onPress={handleSubmit} />
            </View>
       )}
          
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  InputsContainer: {
    height: "50%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    top: 10,
  },
  buttonContainer: {
    height: "20%",
    width: 500,
    alignItems: "center",
    marginBottom: 0,
  },
  title: {
    color: "#004644",
    fontFamily: "Indie-Flower",
    fontSize: 20,
    marginBottom: 10,
  },

  TextError: {
    color: "#da122a",
    fontFamily: "Indie-Flower",
    marginBottom: 10,
  },

});
