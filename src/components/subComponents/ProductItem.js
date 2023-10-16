import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cartSlice";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const ProductItem = ({ item }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const cart = useSelector((state) => state.cart.cart);
  const checkAddedToCart = cart.find((data) => data.id === item.id);
  const addedToCart = checkAddedToCart === undefined ? false : true;
  const data = {
    id: item.id,
    title: item.title,
    price: item.price,
    oldPrice: item.price,
    image: item.image,
    category: "products",
    specification: {
      category: item.category,
      description: item.description,
    },
  };

  const addItemToCart = (data) => {
    dispatch(addToCart(data));
  };

  const removeItemFromCart = (data) => {
    dispatch(removeFromCart(data));
  };

  return (
    <Pressable
      style={{
        width: screenWidth / 2.22,
        height: screenWidth/1.1,
        borderRadius: 5,
        elevation: 10,
        backgroundColor: "white",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        maxWidth: 190,
        maxHeight: 420,
      }}>
      <Image
        style={{
          width: screenWidth / 2.4,
          height: screenWidth / 3,
          resizeMode: "contain",
          maxWidth: 160,
          maxHeight: 130,
        }}
        source={{ uri: item?.image }}
      />

      <Text style={{ marginTop: 10 }}>{item?.title.slice(0, 50)}...</Text>

      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap:30
        }}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>₹{item?.price}</Text>
        <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
          {item?.rating?.rate} ratings
        </Text>
      </View>

      <Pressable
        onPress={() =>
          addedToCart ? removeItemFromCart(data) : addItemToCart(data)
        }
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          width: screenWidth / 2.4,
          maxWidth: 160,
        }}>
        {addedToCart ? (
          <View>
            <Text>Added to Cart</Text>
          </View>
        ) : (
          <Text>Add to Cart</Text>
        )}
      </Pressable>

      <Pressable
        onPress={()=>navigation.navigate("ProceedToBuy", {subtotal:data.price, item:[data], plateform:"directpurchase"})}
        style={{
          backgroundColor: "#e2a806",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          width: screenWidth / 2.4,
          maxWidth: 160,
        }}>
          <Text>Buy Now</Text>
      </Pressable>
    </Pressable>
  );
};

export default memo(ProductItem);

const styles = StyleSheet.create({});
