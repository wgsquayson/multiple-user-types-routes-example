import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import AuthContext from '../context/auth';

const Mariazinha = () => {
  const navigation = useNavigation();

  const { logout } = useContext(AuthContext);

  const handleSignOut = async () => {
    await logout();

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: "Home"
          }
        ]
      })
    )
  }

  return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Olá Mariazinha</Text>
          <Pressable 
            onPress={handleSignOut}
            style={{ borderWidth: 1, borderRadius: 10, width: 250, height: 50, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={{ fontSize: 20 }}>Logout</Text>
          </Pressable> 
      </View>
  );
}

export default Mariazinha;