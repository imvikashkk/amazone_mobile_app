import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import React, { memo } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  decreamentQuantity,
  removeFromCart,
  increamentQuantity,
} from "../redux/cartSlice";
import { useDispatch } from "react-redux";

const screenWidth = Dimensions.get("window").width;
const CartItemLeftRight = ({ item }) => {
  const dispatch = useDispatch();
  console.log(item);
  return (
    <View
      style={{
        borderWidth: 0.4,
        borderColor: "#d2d2d2",
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        elevation: 2,
        backgroundColor: "white",
      }}>
      <View
        style={{
          flexDirection: "row",
          width: screenWidth - 40,
          justifyContent: "space-between",
        }}>
        {/* Left Side Image */}
        <View style={{ width: "40%" }}>
          <Image
            source={{ uri: item.image }}
            style={{ height: 200, width: "90%", resizeMode: "contain" }}
          />
        </View>

        {/* Right Side content */}
        <View style={{ width: "50%" }}>
          <Text style={{ width: "90%" }}>{item.title}</Text>
          <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
              }}>
              <Text style={{ fontSize: 14, fontWeight: "600" }}>₹</Text>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                {Math.trunc(item?.price).toLocaleString("en-IN")}
              </Text>
              <View>
                <Text style={{ fontWeight: "600" }}>
                  {((item?.price % 1) * 100)
                    .toString()
                    .slice(0, 2)
                    .padEnd(2, "0")}
                </Text>
              </View>
            </View>

            {item.quantity > 1 && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}>
                <Text style={{ fontSize: 10, fontWeight: "600" }}>₹</Text>
                <Text style={{ fontSize: 15, fontWeight: "600" }}>
                  {Math.trunc(item.price * item.quantity).toLocaleString(
                    "en-IN"
                  )}
                </Text>
                <Text style={{ fontWeight: "600", fontSize: 10 }}>
                  {(((item?.price * item.quantity) % 1) * 100)
                    .toString()
                    .slice(0, 2)
                    .padEnd(2, "0")}
                </Text>
              </View>
            )}
          </View>
          <Text>Eligible for FREE Shipping </Text>
          <Text style={{ color: "#038e2d" }}>In stock</Text>
          <Text style={{ color: "#0089cd" }}>7 days Service Center</Text>
          <Text style={{ color: "#0089cd" }}>Replacement</Text>
        </View>
      </View>

      {/*cart increase decrease quantity */}
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          gap: 10,
        }}>
        <View style={{ flexDirection: "row" }}>
          {item.quantity === 1 ? (
            <MaterialIcons
              onPress={() => dispatch(decreamentQuantity(item))}
              name="delete-outline"
              size={20}
              color="black"
              style={{
                padding: 8,
                backgroundColor: "#ebebeb",
                borderTopWidth: 0.5,
                borderLeftWidth: 0.5,
                borderBottomWidth: 0.5,
                borderColor: "#c3c3c3",
                paddingTop: 10,
                borderTopLeftRadius: 9,
                borderBottomLeftRadius: 9,
                elevation: 2,
              }}
            />
          ) : (
            <AntDesign
              onPress={() => dispatch(decreamentQuantity(item))}
              name="minus"
              size={20}
              color="black"
              style={{
                padding: 8,
                backgroundColor: "#ebebeb",
                borderTopWidth: 0.5,
                borderLeftWidth: 0.5,
                borderBottomWidth: 0.5,
                borderColor: "#c3c3c3",
                paddingTop: 10,
                borderTopLeftRadius: 9,
                borderBottomLeftRadius: 9,
                elevation: 2,
              }}
            />
          )}

          <View
            style={{
              paddingVertical: 8,
              paddingHorizontal: 20,
              backgroundColor: "#ffffff",
              borderWidth: 0.5,
              borderColor: "#c3c3c3",
              elevation: 2,
            }}>
            <Text
              style={{
                fontSize: 17,
              }}>
              {item.quantity}
            </Text>
          </View>
          <AntDesign
            onPress={() => dispatch(increamentQuantity(item))}
            name="plus"
            size={20}
            color="black"
            style={{
              padding: 8,
              backgroundColor: "#ebebeb",
              borderTopWidth: 0.5,
              borderRightWidth: 0.5,
              borderBottomWidth: 0.5,
              paddingTop: 10,
              borderTopRightRadius: 9,
              borderBottomRightRadius: 9,
              borderColor: "#c3c3c3",
              elevation: 2,
            }}
          />
        </View>
        <Pressable
          onPress={() => dispatch(removeFromCart(item))}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 9,
            borderWidth: 0.5,
            borderRadius: 8,
            borderColor: "#c3c3c3",
            elevation: 3,
            backgroundColor: "white",
          }}>
          <Text>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default memo(CartItemLeftRight);

const styles = StyleSheet.create({});
