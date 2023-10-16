import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React from "react";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { cleanCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import CartItemLeftRight from "../components/CartItemLeftRight";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  const subTotalInteger = Math.trunc(subtotal).toLocaleString("en-IN");
  const subTotalFloat = ((subtotal % 1) * 100)
    .toString()
    .slice(0, 2)
    .padEnd(2, "0");
  const dispatch = useDispatch();
  const productQuantity = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  const navigation = useNavigation();

  return (
    <>
      <Header />
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <SubHeader />

        {cart.length <= 0 ? (
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "500", color: "black" }}>
              Your Shopping Cart is empty.
            </Text>
          </View>
        ) : (
          <>
            <View style={{ padding: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <View>
                  {/* SubTotal */}
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                    }}>
                    <View>
                      <Text style={{ fontSize: 18, fontWeight: "500" }}>
                        Subtotal
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "flex-start",
                      }}>
                      <Text style={{ fontSize: 14, fontWeight: "600" }}>₹</Text>
                      <Text style={{ fontSize: 20, fontWeight: "600" }}>
                        {subTotalInteger}
                      </Text>
                      <Text style={{ fontWeight: "600" }}>{subTotalFloat}</Text>
                    </View>
                  </View>

                  {/* EMI */}
                  <View style={{ flexDirection: "row", marginTop: 5 }}>
                    <Text style={{ fontSize: 15 }}>EMI Available</Text>
                    <Text style={{ fontSize: 15, color: "#00aac8" }}>
                      {" "}
                      Details
                    </Text>
                  </View>
                </View>
                <Pressable
                  onPress={() => dispatch(cleanCart())}
                  style={{
                    padding: 10,
                    borderWidth: 0.4,
                    marginBottom: 10,
                    borderRadius: 5,
                    padding: 8,
                    backgroundColor: "#ffffff",
                    borderColor: "#e8e8e8",
                    elevation: 2,
                  }}>
                  <Text>clear</Text>
                </Pressable>
              </View>

              {/* Delivery */}
              <View style={{ flexDirection: "row", gap: 10, marginTop: 15 }}>
                <View style={{}}>
                  <Ionicons
                    name="checkmark-sharp"
                    size={18}
                    color="#ffffff"
                    style={{
                      backgroundColor: "#00a34c",
                      padding: 1,
                      borderRadius: 112,
                    }}
                  />
                </View>
                <View>
                  <Text style={{ fontSize: 15 }}>
                    Your Order is eligible for FREE Delivery.
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 15 }}>
                      Select this option at checkout.{" "}
                    </Text>
                    <Text style={{ color: "#00aac8", fontSize: 15 }}>
                      Details
                    </Text>
                  </View>
                </View>
              </View>

              {/* Proceed */}
              <Pressable
                onPress={() =>
                  navigation.navigate("ProceedToBuy", {
                    subtotal,
                    item:cart,
                    plateform: "cart",
                  })
                }
                style={{
                  marginTop: 30,
                  backgroundColor: "#ffe207",
                  borderRadius: 6,
                  padding: 12,
                  opacity: 1,
                  marginHorizontal: 10,
                  elevation: 5,
                }}>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#000000",
                    fontSize: 16,
                    fontWeight: "400",
                  }}>
                  {`Proceed to Buy (${productQuantity} items)`}
                </Text>
              </Pressable>

              {/* Horizontal Line */}
              <Text
                style={{
                  height: 3,
                  borderTopColor: "#e0e0e0",
                  borderTopWidth: 2,
                  marginTop: 21,
                  marginBottom: 10,
                  marginHorizontal: -20,
                }}
              />

              {/* Cart List */}
              <View style={{ alignItems: "center" }}>
                {cart?.map((item, index) => (
                  <CartItemLeftRight item={item} key={index} />
                ))}
              </View>
            </View>

            {/* Proceed */}
            <Pressable
              onPress={() =>
                navigation.navigate("ProceedToBuy", {
                  subtotal,
                  item:cart,
                  plateform: "cart",
                })
              }
              style={{
                marginTop: 30,
                backgroundColor: "#ffe207",
                borderRadius: 6,
                padding: 12,
                opacity: 1,
                marginHorizontal: 20,
                marginVertical: 20,
                elevation: 5,
              }}>
              <Text
                style={{
                  textAlign: "center",
                  color: "#000000",
                  fontSize: 16,
                  fontWeight: "400",
                }}>
                {`Proceed to Buy (${productQuantity} items)`}
              </Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
