import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Dimensions,
  Image,
} from "react-native";
import React, { useLayoutEffect, useContext, useCallback, memo } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

/* Redux */
import { addToCart, removeFromCart } from "../../redux/cartSlice";

/* compoents */
import HeaderForNavigateScreen from "../../components/HeaderForNavigateScreen";
import { ContextMain } from "../../context/ContextMain";

/* Icons */
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";

const screenWidth = Dimensions.get("window").width;
const height = (screenWidth * 100) / 100;

const InfoSearch = (prop) => {
  const route = useRoute();
  const data = route.params.item;
  const { addressDef } = useContext(ContextMain);
  const cart = useSelector((state) => state.cart.cart);
  const checkAddedToCart = cart.find((item) => item.id === data.asin);
  const addedToCart = checkAddedToCart === undefined ? false : true;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const item = {
    id: data.asin,
    title: data.title,
    price: data.price.value,
    oldPrice: data?.prices[1].value,
    image: data.image,
    category: "rainforestapi",
  };

  /* Render Header Compnents before layout visible */
  useLayoutEffect(() => {
    prop.navigation.setOptions({
      header: () => <HeaderForNavigateScreen />,
    });
  }, []);

  /* Add to cart */
  const addItemToCart = useCallback((item) => {
    dispatch(addToCart(item));
  }, []);

  /* remove from cart */
  const removeItemFromCart = useCallback((item) => {
    dispatch(removeFromCart(item));
  }, []);

  /* Calculate Offer Percentage */
  const offer = () => {
    if (data?.prices) {
      const primaryDiscounted = data.prices[0].value;
      const secondaryOriginal = data.prices[1].value;
      const discountPercent =
        ((secondaryOriginal - primaryDiscounted) / secondaryOriginal) * 100;
      return Math.floor(discountPercent);
    } else {
      return 0;
    }
  };

  /* Rating Formater Function */
  const ratingFormater = (data) => {
    if (data >= 1000) {
      return (data / 1000).toFixed(1) + "k+";
    } else {
      return data;
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}>
      {/* Image */}
      <View
        style={{
          backgroundColor: "white",
          width: screenWidth,
          height: height,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Image
          style={{
            width: screenWidth / 1.5,
            height: height / 2,
            resizeMode: "contain",
          }}
          source={{ uri: data.image }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: screenWidth,
            paddingHorizontal: 20,
            position: "absolute",
            alignSelf: "flex-start",
            top: 20,
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
              {`${offer()}%\noff`}
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
            position: "absolute",
            alignSelf: "flex-start",
            bottom: 10,
            width: screenWidth,
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#E0E0E0",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              marginBottom: 20,
            }}>
            <AntDesign name="hearto" size={24} color="black" />
          </View>
        </View>
      </View>

      {/* Title, Price */}
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>{data.title}</Text>
        <View style={{ marginTop: 6 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            ₹{data.price.value}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              marginTop: 1,
              textDecorationLine: "line-through",
            }}>
            ₹{data?.prices[1]?.value}
          </Text>
        </View>
      </View>

      {/* Horizontal Line */}
      <Text style={{ borderTopColor: "#D0D0D0", borderTopWidth: 2 }} />

      {/* Delivery & TotalPrice*/}
      <View style={{ padding: 10, marginTop:-20 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}>
          Total : ₹{data.price.value}
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
      <Text style={{ color: "green", marginTop: -10, fontWeight: "500", paddingHorizontal:10 }}>
        IN Stock
      </Text>

      {/* RATING */}
      {data?.rating ? (
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
            justifyContent: "flex-start",
            margin:10
          }}>
          <Text style={{ color: "#0d809d", fontSize: 16 }}>{data?.rating}</Text>
          <Rating
            type="star"
            ratingCount={5}
            readonly
            fractions={2}
            startingValue={data.rating}
            imageSize={24}
          />
          <Text style={{ fontSize: 14 }}>
            {ratingFormater(data.ratings_total)}
          </Text>
        </View>
      ) : null}

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

export default memo(InfoSearch);

const styles = StyleSheet.create({});
