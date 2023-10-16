import { Text, StyleSheet, Pressable } from "react-native";
import React, { useContext, useEffect, useCallback, memo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ContextMain } from "../context/ContextMain";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

const SubHeader = () => {
  const {
    handleCloseModal, handlePresentModal, bottomSheetOpened, setBottomSheetOpened, addressDef, setAddressDef
  } = useContext(ContextMain);

  const handleBottomSheet = useCallback(() => {
    if (bottomSheetOpened === false) {
      handlePresentModal(1);
      setBottomSheetOpened(true);
    } else {
      handleCloseModal();
      setBottomSheetOpened(false);
    }
  }, [bottomSheetOpened])

  /* find default address */
  const handleDefaultAddress = useCallback(async () => {
    const authkey = await AsyncStorage.getItem("authtoken");
    const headers = {
      "Content-Type": "application/json",
      authkey: `${authkey}`,
    };
    axios
      .get("https://amazone-backend.vercel.app/api/userdata/getdefaultaddress", { headers })
      .then((response) => {
        setAddressDef(response?.data?.data?.defaultaddress);
      })
      .catch((error) => {
        if (error?.response) {
          console.log("Could not found address !!");
          console.log(
            `${error?.response?.data?.statusmessage} !!`,
            `${error?.response?.data?.message} !! `
          );
        } else {
          console.log("Could not found address !!");
          console.log(
            "An error occurred while adding a new address !!",
            "Please try again later....."
          );
        }
      });
  }, []);


  useEffect(()=>{
    handleDefaultAddress();
  }, [])

  return (
    <>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#bbe8ef", "#bdeee9", "#c3f1e3"]}>
        <Pressable style={styles.container} onPress={()=>handleBottomSheet()}>
          <Feather name="map-pin" size={16} color="#2c4341" />
          <Text style={styles.deliver}>
            {addressDef
              ? `Deliver to ${addressDef?.name?.trim().slice(0,20)} - ${
                  addressDef?.town_city
                } ${addressDef?.pincode}`
              : "Add Your Address"}
          </Text>
          <SimpleLineIcons name="arrow-down" size={10} color="#000000" />
        </Pressable>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  deliver: {
    fontSize: 14,
    color: "#2c4341",
    paddingHorizontal: 6,
  },
});

export default memo(SubHeader);
