import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useLayoutEffect, useContext, useCallback, memo} from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

/* Redux */
import { addToCart, removeFromCart } from "../../redux/cartSlice";

/* compoents */

import HeaderForInfoScreen from "../../components/HeaderForInfoScreen";
import { ContextMain } from "../../context/ContextMain";

/* Icons */
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const height = (screenWidth * 100) / 100;

const InfoWithSingleImage = (prop) => {
  const route = useRoute();
  const data = route.params.item;
  const {addressDef} = useContext(ContextMain);
  const cart = useSelector((state) => state.cart.cart);
  const checkAddedToCart = cart.find((item)=> item.id === data.id);
  const addedToCart = checkAddedToCart === undefined ? false : true;

  const navigation = useNavigation()
  const dispatch = useDispatch();
  console.log(data.image)
  const item = {
    id: data.id,
    title: data.title,
    price: data.price,
    oldPrice: data.oldPrice,
    image: data.image,
    category: "brand",
    specification: data.specification
  }

  /* Render Header Compnents before layout visible */
  useLayoutEffect(() => {
    prop.navigation.setOptions({
      header: () => <HeaderForInfoScreen />,
    });
  }, []);

  /* Add to cart */
  const addItemToCart = useCallback((item) => {
    dispatch(addToCart(item));
  }, []);

  /* remove from cart */
  const removeItemFromCart = useCallback((item) => {
    dispatch(removeFromCart(item));
  }, [])

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white", marginTop: -25 }}
      showsVerticalScrollIndicator={false}>
      {/* Image */}
      <ImageBackground
        style={{
          width: screenWidth,
          height,
          marginTop: 25,
          resizeMode: "contain",
        }}
        source={{uri:data.image}}>
        <View
          style={{
            padding: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#C60C30",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}>
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "600",
                fontSize: 12,
                textAlignVertical: "center",
              }}>
              {`${data.offer}\noff`}
            </Text>
          </View>

          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#E0E0E0",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}>
            <MaterialCommunityIcons
              name="share-variant"
              size={24}
              color="black"
            />
          </View>
        </View>

        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#E0E0E0",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginTop: "auto",
            marginLeft: 20,
            marginBottom: 20,
          }}>
          <AntDesign name="hearto" size={24} color="black" />
        </View>
      </ImageBackground>

      {/* Title, Price */}
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>{data.title}</Text>

        <View style={{ marginTop: 6 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>₹{data.price}</Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              marginTop: 1,
              textDecorationLine: "line-through",
            }}>
            ₹{data.oldPrice}
          </Text>
        </View>
      </View>

      {/* Horizontal Line */}
      <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

      {/* Specification */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 17, fontWeight: "500" }}> Specifiations:</Text>
        <Text style={{ fontWeight: "500", fontSize: 16, lineHeight:12}}>
          {data.specification}
        </Text>
      </View>

      {/* Horizontal Line */}
      <Text
        style={{
          height: 1,
          borderColor: "#D0D0D0",
          borderWidth: 1,
          marginVertical: -5,
        }}
      />

      {/* Delivery */}
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}>
          Total : ₹{data.price}
        </Text>
        <Text style={{ color: "#00CED1" }}>
          FREE delivery Tomorrow by 3 PM.Order within 10hrs 30 mins
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 5,
            alignItems: "center",
            gap: 5,
          }}>
          <Ionicons name="location" size={24} color="black" />

          <Text style={{ fontSize: 15, fontWeight: "500" }}>
          {addressDef
              ? `Deliver to ${addressDef?.name?.trim().slice(0,20)} - ${
                  addressDef?.town_city
                } ${addressDef?.pincode}`
              : "Add Your Address"}
          </Text>
        </View>
      </View>

      {/* Stock Availablity */}
      <Text style={{ color: "green", marginHorizontal: 10, fontWeight: "500" }}>
        IN Stock
      </Text>

      {/* Add to Cart */}
      <Pressable
        onPress={() => (addedToCart ? removeItemFromCart(item) : addItemToCart(item))}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 10,
          elevation:5
        }}>
        {addedToCart ? (
          <View>
            <Text>Remove from Cart</Text>
          </View>
        ) : (
          <Text>Add to Cart</Text>
        )}
      </Pressable>

      {/* Buy Now */}
      <Pressable
      onPress={()=>navigation.navigate("ProceedToBuy", {subtotal:item.price, item:[item], plateform:"directpurchase"})}
        style={{
          backgroundColor: "#FFAC1C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 10,
          elevation:5
        }}>
        <Text>Buy Now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default memo(InfoWithSingleImage);

const styles = StyleSheet.create({});
