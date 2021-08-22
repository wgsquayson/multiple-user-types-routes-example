import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const users = {
  data: [
      {
          id: "1",
          name: "joaozinho",
          email: "joaozinho@teste.com",
          userType: "joaozinho",
          token: "01234"
      },
      {
          id: "2",
          name: "mariazinha",
          email: "mariazinha@teste.com",
          userType: "mariazinha",
          token: "56789"
      }
  ]
}

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState();
  const [initialRouteName, setInitialRouteName] = useState("Home");
  const [userType, setUserType] = useState("");

  const loadStoragedData = async() => {
    setIsLoading(true);

    const token = await AsyncStorage.getItem("token");
    const userType = await AsyncStorage.getItem("userType");

    if (token && userType) {
      setToken(token);
      setUserType(userType);

      let routename;

      switch (userType) {
        case "joaozinho":
          routename = "Joaozinho"
          break;
      
        default:
          routename = "Mariazinha"
          break;
      }
      
      setInitialRouteName(routename);
      setIsLoading(false);
    } else {
      setInitialRouteName("Home");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStoragedData();
  }, [])


  const login = async (email) => {
    try {
      const userExists = users.data.find(user => user.email === email);

      if (userExists) {
        let routename;

        switch (userExists.userType) {
          case "joaozinho":
            routename = "Joaozinho"
            break;
        
          default:
            routename = "Mariazinha"
            break;
        }

        setInitialRouteName(routename);
        setToken(userExists.token);
        setUserType(userExists.userType);

        await AsyncStorage.multiSet([
          ["token", userExists.token], 
          ["userType", userExists.userType]
        ]);

        return routename;
      }
    } catch (error) {
      console.log(error)
    }
  }

  const logout = async () => {
    await AsyncStorage.clear();
    setInitialRouteName("Home");
    setToken();
    setUserType();
  };

  return (
    <AuthContext.Provider value={{token, initialRouteName, userType, isLoading, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;