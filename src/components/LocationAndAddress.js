import { StyleSheet, Text, View, Pressable, Modal, ActivityIndicator, Alert, Dimensions} from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const screenWidth =  Dimensions.get("window").width
const LocationAndAddress = ({handleCloseModal,addressDef, setAddressDef, addresses, setAddresses}) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  /* API calling for address */
  const getAddress = useCallback(async () => {
    setIsLoading(true);
    const authkey = await AsyncStorage.getItem("authtoken");
    const headers = {
      "Content-Type": "application/json",
      authkey: `${authkey}`,
    };

    axios
      .get("https://amazone-backend.vercel.app/api/userdata/getaddresses", { headers })
      .then((response) => {
        setIsLoading(false);
        setAddresses(response?.data?.data?.addresses);
        setAddressDef(response?.data?.data?.defaultaddress)
        console.log(response?.data?.data?.addresses)
      })
      .catch((error) => {
        setIsLoading(false);
        if (error?.response) {
          console.log("Could not found address !!");
          console.log(
            `${error?.response?.data?.statusmessage} !!`,
            `${error?.response?.data?.message} !! `
          );
        } else {
          console.log("Could not found address !!");
          console.log(
            "An error occurred while fetching address !!",
            "Please try again later....."
          );
        }
      });
  }, [])

  useEffect(() => {
    getAddress();
  }, []);

  /* Set as Default */
  const handleSetDefault = useCallback(async (defaultAddressId) => {
    setIsLoading(true);
    const authkey = await AsyncStorage.getItem("authtoken");
    const headers = {
      "Content-Type": "application/json",
      authkey: `${authkey}`,
    };

    axios
      .post(
        "https://amazone-backend.vercel.app/api/userdata/setdefaultaddress",
        { defaultAddressId },
        { headers }
      )
      .then((response) => {
        setIsLoading(false);
        Alert.alert(
          "Set as Default Address Successfully Done !!",
          "Follow me on GitHub @imvikashkk "
        );
        console.log(response?.data?.data?.addresses)
        setAddresses(response?.data?.data?.addresses);
        setAddressDef(response?.data?.data?.defaultaddress);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error?.response) {
          Alert.alert(
            `${error?.response?.data?.statusmessage} !!`,
            `${error?.response?.data?.message} !! `
          );
        } else {
          Alert.alert(
            "An error occurred while adding a new address !!",
            "Please try again later....."
          );
        }
      });
  }, []);

  return (
    <>
      <View style={{ backgroundColor: "white", maxHeight:screenWidth/1 }}>
        <View>
          <Text style={{ fontSize: 16, fontWeight: "700" }}>
            Choose your location
          </Text>
          <Text style={{ fontSize: 14, marginTop: 10 }}>
            Select a deivery location to see product availability and delivery
            options
          </Text>
        </View>

        <ScrollView
          horizontal
          style={{ marginTop: 25 }}
          showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row", gap: 12 }}>
            {addresses?.map((item, index) => {
              return (
                <Pressable
                  onPress={() => handleSetDefault(item?._id)}
                  key={index}
                  style={{
                    borderWidth: 1,
                    borderColor: "#d18306",
                    width: 145,
                    height: 140,
                    padding: 10,
                    backgroundColor:
                      item?._id === addressDef?._id ? "#faf1e2" : "white",
                  }}>
                 <ScrollView showsVerticalScrollIndicator={false}>
                 <Text style={{ fontSize: 16, fontWeight: "600" }}>
                    {item?.name}
                  </Text>
                  <Text style={{fontWeight:"500"}}>
                    {item?.town_city + " " + item?.pincode}
                  </Text>
                  <Text>{item?.building}</Text>
                  <Text>{item?.street}</Text>
                  <Text>{item?.landmark}</Text>
                 </ScrollView>
                </Pressable>
              );
            })}

            {/* Add an Address */}
            <Pressable
              style={{
                borderWidth: 1,
                borderColor: "#d18306",
                width: 145,
                height: 140,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                handleCloseModal();
                navigation.navigate("LocationAndAddressUpdate");
              }}>
              <Text
                style={{ color: "#181891", fontSize: 14, fontWeight: "400" }}>
                Add an address or pick-up point
              </Text>
            </Pressable>
          </View>
        </ScrollView>

        <View style={{ marginTop: 20, gap: 10 }}>
          <Pressable
            style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Entypo name="location-pin" size={24} color="#181891" />
            <Text style={{ color: "#181891" }}>Enter an Indian pincode</Text>
          </Pressable>

          <Pressable
            style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <MaterialIcons name="my-location" size={24} color="#181891" />
            <Text style={{ color: "#181891" }}>Use my current location</Text>
          </Pressable>

          <Pressable
            style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <MaterialCommunityIcons name="web" size={24} color="#181891" />
            <Text style={{ color: "#181891" }}>Deliver outside India</Text>
          </Pressable>
        </View>
      </View>

      {/* ************************************** Loader ************************** */}
      <Modal visible={isLoading} transparent style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            flex: 1,
            paddingTop: 300,
            marginTop: 60,
          }}>
          <ActivityIndicator size={50} />
        </View>
      </Modal>
    </>
  );
};

export default LocationAndAddress;

const styles = StyleSheet.create({});
