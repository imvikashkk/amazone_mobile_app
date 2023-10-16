import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const Payment = ({setStep}) => {
  return (
    <View>
      <Pressable
      onPress={()=>setStep(4)}
        style={{
          flexDirection: "row",
          gap: 10,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: "white",
          borderBottomWidth:0.7,
          borderBottomColor:"gray"
        }}>
        <View
          style={{
            height: 20,
            width: 20,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            borderWidth: 1,
          }}>
          <View
            style={{
              height: 14,
              width: 14,
              backgroundColor: "#005334",
              borderRadius: 7,
            }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 16 }}>Cash on delivery</Text>
        </View>
      </Pressable>
      <Pressable
        style={{
          flexDirection: "row",
          gap: 10,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: "#cccccc",
          borderBottomWidth:0.7,
          borderBottomColor:"gray"
        }}>
        <View
          style={{
            height: 20,
            width: 20,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            borderWidth: 1,
          }}>
          <View
            style={{
              height: 14,
              width: 14,
              backgroundColor: "transparent",
              borderRadius: 7,
            }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 16 }}>UPI</Text>
        </View>
      </Pressable>
      <Pressable
        style={{
          flexDirection: "row",
          gap: 10,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: "#cccccc",
          borderBottomWidth:0.7,
          borderBottomColor:"gray"
        }}>
        <View
          style={{
            height: 20,
            width: 20,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            borderWidth: 1,
          }}>
          <View
            style={{
              height: 14,
              width: 14,
              backgroundColor: "transparent",
              borderRadius: 7,
            }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 16 }}>Cards/DebitCard/CreditCard</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({});
