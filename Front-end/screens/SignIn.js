import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native'
import * as Google from 'expo-google-app-auth';
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from '../components/Background'


export default function SigninWithGoogle({ navigation }) {

    // / Déclare une nouvelle variable d'état 
    // On commence tout d’abord par appeler la fonction useState() qui nous permet de créer une nouvelle variable de state
    const [googleSubmit, setGoogleSubmit] = useState(false);


// méthode qui  l'aide des identifiants de leur compte Google.
    const handleGoogleSignin = async() => {
        setGoogleSubmit(true);
        const config = {
            androidClientId: `916736044071-pkhj6ao976fpkl699cnal998a4vh1lst.apps.googleusercontent.com`,
            scopes: ['profile', 'email'],
        };

        Google.logInAsync(config)
            .then(async(result) => {
                const { type, user } = result;
                if (type == 'success') {
                    const { email, name, photoUrl } = user;
                    console.log('Google signin successful');
                    console.log(email, name, photoUrl);
                    // AsyncStorage nous permet de persister des données en local sur le smartphone
                    await AsyncStorage.setItem('email', email);  
                    await AsyncStorage.setItem('name', name);
                    await AsyncStorage.setItem('photoUrl', photoUrl);

                    navigation.navigate('DrawerNav', { screen: 'profile' });
                } else {
                    console.log('cannot signIn with Google');
                }
                setGoogleSubmit(false);
            })
            .catch((error) => {
                console.log(' error' );
                console.log(error);
                setGoogleSubmit(false);
            });
    };


    return (
        
        <View style={styles.container}>
            <Background>
  
            <TouchableOpacity onPress={handleGoogleSignin} style={styles.appButtonContainer}>
                <Fontisto name="google" size={30} color='#fff'/>

                <Text style={styles.appButtonText}>Sign in with Google </Text>
           </TouchableOpacity> 
           </Background>
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'


    },
    tinyLogo: {
        width: "60%",
        height: "40%",
        color:"#fff"



    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        color:"#fff"
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#F8397F",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
        justifyContent: 'center',
        marginTop:20,
        alignItems: 'center',
        flexDirection: 'row',
        width: '90%',
    },
    appButtonContainer1: {
        elevation: 8,
        backgroundColor: "#F8397F",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
        justifyContent: 'center',
        marginTop:20,
        alignItems: 'center',
        flexDirection: 'row',
        width: '80%',
    },
    appButtonText: {
        fontSize: 18,
        color:"#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        marginHorizontal: 10
    },
    ////////////////////////////
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
      },
      row: {
        flexDirection: 'row',
        marginTop: 4,
    
      },
      forgot: {
        fontSize: 13,
        color: '#fff',
      },
      link: {
        fontWeight: 'bold',
        color: '#fff',
      },
});