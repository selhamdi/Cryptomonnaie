import React, { useEffect, useState } from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import { color } from 'react-native-reanimated';

export default function User(navigation) {

  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhotoUrl, setUserPhotoUrl] = useState('');
  const [userSolde, setWallet] = useState('');

         
const AddUser = async () => {

  try {
    const email = await AsyncStorage.getItem('email');
    const name = await AsyncStorage.getItem('name');
    
    const res = await axios.post(`http://192.168.8.82:3000/user/Add`, {email : email, name: name});
    console.log(email,name);
             console.log(res.data);
             setUserEmail(res.data.email)
             setUsername(res.data.name)
             setUserPhotoUrl(res.data.photoUrl)
             setWallet(res.data.solde)
        
  } catch(err) {
   console.log(err);
  }
}


const GetUser = async () => {

  try {   
     const name = await AsyncStorage.getItem('name');
    const email = await AsyncStorage.getItem('email');
    const photoUrl = await AsyncStorage.getItem('photoUrl');

    setUserEmail(email)
    setUsername(name)
    setUserPhotoUrl(photoUrl)
   
        
  } catch(err) {
   console.log(err);
  }
}

useEffect(() => {
  AddUser();
 

},[]);
useEffect(() => {
  GetUser();
  console.log("NAME "+ userSolde)

});

return (

<View style={styles.container}>
<View style={styles.header}></View>
<Image style={styles.avatar} source={{uri: 'https://www.osteosmose.fr/wp-content/uploads/2016/08/avatar-femme-3.png'}}/>
<View style={styles.body}>
  <View style={styles.bodyContent}>
    <Text style={styles.name}> {username}</Text>
    <TouchableOpacity style={styles.buttonContainer}>
      <Text  style={{color:"#fff"}}> Go to Buy Or sell crypto</Text>  
    </TouchableOpacity>              
  </View>
</View>
</View>
    )
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "white",
    height:100,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:30
  },
  name:{
    fontSize:22,
    color:"#000000",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
    
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
    
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
    
  },
  info:{
    fontSize:16,
    color: "#0F1C5A",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#F8397F",
    
    
  },
})