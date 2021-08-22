import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthContext from './context/auth';

import Home from "./pages/home";
import Joaozinho from "./pages/joaozinho";
import Mariazinha from "./pages/mariazinha";

const Stack = createNativeStackNavigator();

function Routes() {
  const { isLoading, initialRouteName } = useContext(AuthContext);

  if (isLoading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName} >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Joaozinho" component={Joaozinho} />
        <Stack.Screen name="Mariazinha" component={Mariazinha} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;