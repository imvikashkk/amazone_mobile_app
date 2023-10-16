import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* components */
import HomeScreen from "../../screens/HomeScreen";
import LocationAndAddressUpdate from "../../components/LocationAndAddressUpdate";
import InfoWithSingleImage from "../../screens/subScreen/InfoWithSingleImage";
import InfoWithCarousel from "../../screens/subScreen/InfoWithCarousel"
import InfoSearch from "../../screens/subScreen/InfoSearch";

const Stack = createNativeStackNavigator();
const HomeStackNavigator = () => {
  return (
    <>
      <Stack.Navigator>
        {/* Navigation For Screens */}
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LocationAndAddressUpdate"
          component={LocationAndAddressUpdate}
        />
        <Stack.Screen name="InfoWithSingleImage" component={InfoWithSingleImage} />
        <Stack.Screen name="InfoSearch" component={InfoSearch} />
        <Stack.Screen name="InfoWithCarousel" component={InfoWithCarousel} />
      </Stack.Navigator>
    </>
  );
};

export default HomeStackNavigator;

const styles = StyleSheet.create({});
