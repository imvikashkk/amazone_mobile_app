import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* Compoents */
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import SearchItem from "../screens/SearchItemScreen";
import SplashScreen from "../screens/SplashScreen";
import AddANewAddress from "../screens/AddANewAddress";
import UpdateAddress from "../screens/UpdateAddress";
import ContextMainProvider from "../context/ContextMain";
import ProceedToBuy from "../components/ProceedToBuy";

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <>
      <ContextMainProvider>
        <Stack.Navigator>
          {/* Navigation For Screens */}
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="SearchItem" component={SearchItem} />
          <Stack.Screen name="AddANewAddress" component={AddANewAddress} />
          <Stack.Screen name="UpdateAddress" component={UpdateAddress} />
          <Stack.Screen name="ProceedToBuy" component={ProceedToBuy} options={{ headerShown: false }} />
        </Stack.Navigator>
      </ContextMainProvider>
    </>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
