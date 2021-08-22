import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import AuthContext from '../context/auth';

const Home = () => {
  const navigation = useNavigation();

  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("joaozinho@teste.com");

  const handleSignIn = async () => {
    const routename = await login(email);

    if(routename) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: routename
            }
          ]
        })
      )
    } else {
      Alert.alert("E-mail incorreto")
    }
  }

  return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Home</Text>
          <TextInput 
            placeholder="E-mail"
            value={email} 
            onChangeText={value => setEmail(value)} 
            style={{ padding: 10, borderWidth: 1, borderRadius: 10, width: 250, height: 50, marginTop: 20 }}
          />
          <Pressable 
            onPress={handleSignIn}
            style={{ borderWidth: 1, borderRadius: 10, width: 250, height: 50, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={{ fontSize: 20 }}>Login</Text>
          </Pressable> 
      </View>
  );
}

export default Home;