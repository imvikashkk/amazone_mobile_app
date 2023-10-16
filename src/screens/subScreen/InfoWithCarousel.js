import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useLayoutEffect, useCallback, useContext, memo } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";

/* Import Components */
import HeaderForInfoScreen from "../../components/HeaderForInfoScreen";
import ItemCarousel from "../../components/ItemCarousel";
import { ContextMain } from "../../context/ContextMain";

/* Import Redux For Cart */
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cartSlice";

/* Import Icons */
import { Ionicons } from "@expo/vector-icons";

/* MAIN COMPONENT */
const InfoWithCarousel = (prop) => {
  const route = useRoute();
  const data = route.params;

  const dispatch = useDispatch();
  const { addressDef } = useContext(ContextMain);

  const cart = useSelector((state) => state.cart.cart);
  const checkAddedToCart = cart.find((item) => item.id === data.id);
  const addedToCart = checkAddedToCart === undefined ? false : true;
  const navigation = useNavigation();
  const item = {
    id: data.id,
    title: data.title,
    price: data.price,
    oldPrice: data.oldPrice,
    image: data.item.image,
    category: "trendings/todays",
    specification: {
      color: data.color,
      size: data.size,
    },
  };

  /* Render Header Component before Layout visible */
  useLayoutEffect(() => {
    prop.navigation.setOptions({
      header: () => <HeaderForInfoScreen />,
    });
  }, []);

  /* Add Item To Cart  */
  const addItemToCart = useCallback((item) => {
    dispatch(addToCart(item));
  }, []);

  /* Remove Item From Cart  */
  const removeItemFromCart = useCallback((item) => {
    dispatch(removeFromCart(item));
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}>
      {/* Carousel for Item's Images */}
      <ItemCarousel imageItem={route?.params?.carouselImages} />

      {/* Item Info */}
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          {route?.params?.title}
        </Text>

        <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 6 }}>
          ₹{route?.params?.price}
        </Text>
      </View>

      {/* Horizontal Line */}
      <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

      {/* Specifications  */}
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text>Color: </Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {route?.params?.color}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text>Size: </Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {route?.params?.size}
        </Text>
      </View>

      {/* Horizontal Line */}
      <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

      {/* Total Price and  Delivery */}
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}>
          Total : ₹{route.params.price}
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
              ? `Deliver to ${addressDef?.name?.trim().slice(0, 20)} - ${
                  addressDef?.town_city
                } ${addressDef?.pincode}`
              : "Add Your Address"}
          </Text>
        </View>
      </View>

      {/* Stock Status */}
      <Text style={{ color: "green", marginHorizontal: 10, fontWeight: "500" }}>
        IN Stock
      </Text>

      {/* Add to Cart */}
      <Pressable
        onPress={() =>
          addedToCart ? removeItemFromCart(item) : addItemToCart(item)
        }
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
        onPress={() => navigation.navigate("ProceedToBuy", {subtotal:item.price, item:[item], plateform:"directpurchase"})}
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

export default memo(InfoWithCarousel);

const styles = StyleSheet.create({});
