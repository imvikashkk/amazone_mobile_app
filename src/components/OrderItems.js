import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import React from "react";

const screenWidth = Dimensions.get("window").width;
const OrderItems = ({ item }) => {
  
  return (
    <View style={{ 
        borderWidth: 1, 
        marginTop: 5, 
        padding: 10, 
        backgroundColor:"white",
        borderColor:"#e2e2e2",
        borderRadius:6,
        elevation:5,
        margin:10
        }}>
      <View style={{}}>
        <Text style={{fontSize:16}}>Totalprice : {item.totalprice}</Text>
        <Text>Ordered Date : {item.createdAt}</Text>
        <Text>Payment Method : {item.paymentmethod}</Text>
        <Text>Delivery Date : expected 7 working days</Text>
        <Text>Shipping Address : </Text>
        <View style={{marginLeft:20}}>
        <Text>{item.shippingaddress.name}, Mobile no. : {item.shippingaddress.mobile}</Text>
        <Text>{item.shippingaddress.building}, {item.shippingaddress.street}</Text>
        <Text>{item.shippingaddress.town_city}, {item.shippingaddress.state}, {item.shippingaddress.pincode}</Text>
        </View>
      </View>
      <Text style={{borderBottomWidth:2, marginHorizontal:-10, borderColor:"#cccccc"}} />
      {item.products.map((products, index) => {
        const isLastItem = item.products.length === index + 1 ; 
        return (
          <View
            key={index}
            style={{ flexDirection: "row", alignItems: "center", marginVertical:10, borderBottomWidth: isLastItem ? 0 : 1, paddingBottom:10, borderBottomColor:"#c6c6c6"  }}>
            <View style={{ width: "35%", backgroundColor: "white" }}>
              <Image
                style={{ width: 100, height: 100, resizeMode: "contain" }}
                source={{ uri: products.image }}
              />
            </View>
            <View style={{ width: "65%" }}>
               <Text>{products.title}</Text>
               <Text>Price : {products.price}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default OrderItems;

const styles = StyleSheet.create({});
