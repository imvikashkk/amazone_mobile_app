import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Alert,
  Modal,
  ActivityIndicator
} from "react-native";
import React, {
  useLayoutEffect,
  useContext,
  useState,
  useCallback,
} from "react";
import { useNavigation } from "@react-navigation/native";

/* Reac Native Icons */
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
/* Other Dependencies */
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
/* Components */
import HeaderForNavigateScreen from "./HeaderForNavigateScreen";
import { ContextMain } from "../context/ContextMain";

/* Header Search Bar */
const LocationAndAddressUpdate = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const {
    addressDef, setAddressDef, addresses, setAddresses
  } = useContext(ContextMain);

  
  /* set Header */
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <HeaderForNavigateScreen />,
    });
  }, []);


  /* Remove Address */
  const handleRemoveAddress = useCallback( async (addressId) => {
    setIsLoading(true);
    const authkey = await AsyncStorage.getItem("authtoken");
    const headers = {
      "Content-Type": "application/json",
      authkey: `${authkey}`,
    };
    const body = {
      addressId: addressId,
    };
    const config = {
      headers: headers,
      data: body,
    };
    axios
      .delete("https://amazone-backend.vercel.app/api/userdata/deleteaddress", config
      )
      .then((response) => {
        setIsLoading(false);
        setAddresses(response?.data?.data?.addresses);
        setAddressDef(response?.data?.data?.defaultaddress)
      })
      .catch((error) => {
        setIsLoading(false);
        if (error?.response) {
          Alert.alert("Could not remove address !!");
          Alert.alert(
            `${error?.response?.data?.statusmessage} !!`,
            `${error?.response?.data?.message} !! `
          );
        } else {
          Alert.alert("Could not found address !!", "Please try again later..........");
          Alert.alert(
            "An error occurred while adding a new address !!",
            "Please try again later....."
          );
        }
      });
  }, []);


  /* Set as Default */
  const handleSetDefault = useCallback(async (defaultAddressId) =>{
    setIsLoading(true)
    const authkey = await AsyncStorage.getItem("authtoken")
    const headers = {
        'Content-Type': 'application/json',
        'authkey':`${authkey}`
    }

    axios
    .post("https://amazone-backend.vercel.app/api/userdata/setdefaultaddress", {defaultAddressId}, {headers})
    .then((response) => {
        setIsLoading(false)
        Alert.alert(
            "Set as Default Address Successfully Done !!",
            "Follow me on GitHub @imvikashkk ",
        )
        setAddresses(response?.data?.data?.addresses);
        setAddressDef(response?.data?.data?.defaultaddress)
    })
    .catch((error) => {
        setIsLoading(false)
        if(error?.response){
            Alert.alert(
                `${error?.response?.data?.statusmessage} !!`,
                `${error?.response?.data?.message} !! `,
            )
        }else{
            Alert.alert("An error occurred while adding a new address !!",
               "Please try again later.....")
        }
    });
  }, [])

  return (
    <>
      {/* ******************************* MAIn ************************ */}
      <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ padding: 10, paddingBottom: 50 }}>
        <Text style={{ fontSize: 20, fontWeight: "600" }}>Your Addresses</Text>

        <Pressable
          onPress={() => navigation.navigate("AddANewAddress")}
          style={{
            marginTop: 20,
            borderTopWidth: 0.6,
            borderBottomWidth: 0.6,
            borderColor: "gray",
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Text style={{ fontSize: 16, fontWeight: "400" }}>
            Add a new address
          </Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="#858585"
            style={{ fontSize: 30 }}
          />
        </Pressable>

        <Pressable
          style={{
            marginTop: 10,
            borderTopWidth: 0.6,
            borderBottomWidth: 0.6,
            borderColor: "gray",
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Text style={{ fontSize: 16, fontWeight: "400" }}>
            Add a new pickup location
          </Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="#858585"
            style={{ fontSize: 30 }}
          />
        </Pressable>

        <Text style={{ marginTop: 20, fontSize: 18, fontWeight: "600" }}>
          Personal Addresses
        </Text>

        {/* Addresses */}
        <View style={{ marginTop: 10 }}>
          {addresses?.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 8,
                  padding: 10,
                  backgroundColor:
                    item?._id === addressDef?._id
                      ? "rgba(210, 109, 8, 0.2)"
                      : "transparent",
                }}>
                <View>
                  <Text style={{ fontSize: 15, fontWeight: "600" }}>
                    {item?.name}
                  </Text>
                  <Text>{item?.building}</Text>
                  <Text>{item?.landmark}</Text>
                  <Text>
                    {item?.town_city}, {item?.state} {item?.pincode}
                  </Text>
                  <Text>India</Text>
                  <Text>Phone Number: {item?.mobile}</Text>
                  <Text style={{ color: "#0076de" }}>
                    Add delivery Instructions
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 16,
                  }}>
                  <Ionicons name="location-sharp" size={24} color="#f10a0a" />
                  <Text style={{ fontSize: 15, color: "#0076de" }}>
                    Update delivery location
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 20,
                    gap: 10,
                    marginBottom: 10,
                  }}>
                  <Pressable onPress={()=>navigation.navigate("UpdateAddress" , {item, isDefault:(addressDef?._id==item?._id)}) }>
                  <Text
                    style={{
                      paddingVertical: 6,
                      paddingHorizontal: 16,
                      borderWidth: 1,
                      borderColor: "gray",
                      borderRadius: 3,
                    }}>
                    Edit
                  </Text>
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      handleRemoveAddress(item?._id)
                    }>
                    <Text
                      style={{
                        paddingVertical: 6,
                        paddingHorizontal: 16,
                        borderWidth: 1,
                        borderColor: "gray",
                        borderRadius: 3,
                      }}>
                      Remove
                    </Text>
                  </Pressable>

                  {item?._id !== addressDef?._id && (
                    <Pressable onPress={()=>handleSetDefault(item?._id)}>
                      <Text
                      style={{
                        paddingVertical: 6,
                        paddingHorizontal: 16,
                        borderWidth: 1,
                        borderColor: "gray",
                        borderRadius: 3,
                      }}>
                      Set as Default
                    </Text>
                    </Pressable>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>


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

export default LocationAndAddressUpdate;

const styles = StyleSheet.create({});
