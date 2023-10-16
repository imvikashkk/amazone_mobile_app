import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* components */
import ProfileScreen from "../../screens/ProfileScreen";
import OrderDetails from "../../components/OrderDetails";

const Stack = createNativeStackNavigator();
const ProfileStackNavigator = () => {
  return (
    <>
      <Stack.Navigator>
        {/* Navigation For Screens */}
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderDetails"
          component={OrderDetails}
        />
      </Stack.Navigator>
    </>
  );
};

export default ProfileStackNavigator;

const styles = StyleSheet.create({});
