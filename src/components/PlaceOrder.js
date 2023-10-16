import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Modal,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { cleanCart } from "../redux/cartSlice";
import { useNavigation } from "@react-navigation/native";
import {ContextMain} from "../context/ContextMain"

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const PlaceOrder = ({ subtotal, item, plateform, deliveryAdd }) => {
  const [isLoading, setIsLoading] = useState(false);
  const disptach = useDispatch();
  const navigation = useNavigation();
  const {orders, setOrders} = useContext(ContextMain);

  const handleOrder = async () => {
    setIsLoading(true);
    const authkey = await AsyncStorage.getItem("authtoken");
    const headers = {
      "Content-Type": "application/json",
      authkey: `${authkey}`,
    };

    const body = {
      productdetails: item.map((itm, idx) => {
        return {
          title: itm.title,
          quantity: itm?.quantity ? itm.quantity : 1,
          price: itm.price,
          image: itm.image,
          category: itm.category,
        };
      }),
      totalprice: subtotal,
      shippingaddress: {
        name: deliveryAdd.name,
        mobile: deliveryAdd.mobile,
        building: deliveryAdd.building,
        street: deliveryAdd.street,
        landmark: deliveryAdd.landmark,
        pincode: deliveryAdd.pincode,
        town_city: deliveryAdd.town_city,
        state: deliveryAdd.state,
      },
      paymentmethod: "Cash",
    };

    axios
      .post("https://amazone-backend.vercel.app/api/userorder/neworder", body, {
        headers,
      })
      .then((response) => {
        setIsLoading(false);
        if (plateform === "cart") {
          disptach(cleanCart());
        }
        Alert.alert(
          `Your Order is successfully created !!`,
          `Please follow me on GitHub @imvikashkk !!`
        );
        navigation.replace("Main")
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
  };

  useEffect(()=>{
    handleOrder()
  },[])

  return (
    <>
      <Modal transparent={true} animationType="fade" visible={isLoading}>
        <View
          style={{
            width: screenWidth,
            marginTop: screenHeight / 7.3,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
          }}>
          <ActivityIndicator size={40} />
          <Text>Waiting...</Text>
        </View>
      </Modal>
    </>
  );
};

export default PlaceOrder;

const styles = StyleSheet.create({});
