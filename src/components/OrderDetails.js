import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import React, { useLayoutEffect } from "react";
import HeaderForInfoScreen from "./HeaderForInfoScreen";
import OrderItems from "./OrderItems";

const OrderDetails = ({ route, navigation }) => {
  const { orders } = route?.params;
  console.log(orders);

  /* Render Header Component before Layout visible */
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <HeaderForInfoScreen />,
    });
  }, []);



  return (
    <>
    <View style={{ paddingVertical: 6, backgroundColor:"white" }}>
      <Text style={{ fontSize: 22, paddingHorizontal: 12, fontWeight:"500" }}>Your Orders</Text>
      <Text
        style={{
          borderBottomWidth: 2,
          borderBottomColor: "#b9b9b9",
          marginTop: -10,
        }}
      />
        <ScrollView style={{backgroundColor:"white"}}>
        <View style={{marginBottom:40}}>
        {
            orders.map((item, index) => <OrderItems key={index} item={item}  />)
        }
        </View>
        </ScrollView>
    </View>
   </>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({});
