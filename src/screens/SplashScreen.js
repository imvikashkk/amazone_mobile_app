import { StyleSheet, View, Image, StatusBar } from "react-native";
import React, { useEffect, memo, useContext, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

/* Dependencies */
import AsyncStorage from "@react-native-async-storage/async-storage";

/* **************************** MAin Component ************************* */
const SplashScreen = () => {
  const navigation = useNavigation();
  /* Check Login Status */
  useEffect(() => {
      const checkLoginStatus = async () => {
        try {
          const token = await AsyncStorage.getItem("authtoken");
          if (token) {
            navigation.replace("Main");
          }else{
              navigation.replace("LoginScreen");
          }
        } catch (err) {
          console.log("Error in SplashScreen: ", err);
        }

      };
      checkLoginStatus();

  }, []);

  return (
    <>
      <StatusBar backgroundColor={"black"} barStyle="white" />
      <View style={{ backgroundColor: "white", flex:1, alignItems:"center", justifyContent:"center" }}>
        <Image
          style={{ height: 250, width: 250 }}
          source={require("../../assets/logo.png")}
        />
      </View>
    </>
  );
}

export default memo(SplashScreen);

const styles = StyleSheet.create({});
