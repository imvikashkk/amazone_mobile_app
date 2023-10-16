import React from "react";
import { View, Text } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const CartIcon = ({ itemCount, color }) => {
  return (
    <View>
      <AntDesign name="shoppingcart" size={itemCount > 0 ? 20 : 24} color={color} />
      {itemCount > 0 && (
        <View
          style={{
            position: "absolute",
            backgroundColor: "red",
            borderRadius: 7,
            width: 15,
            height: 15,
            justifyContent: "center",
            alignItems: "center",
            top: -5,
            right: -5,
          }}>
          <Text style={{ color: "white", fontSize: 10, textAlign:"center", textAlignVertical:"center" }}>{itemCount}</Text>
        </View>
      )}
    </View>
  );
};

export default CartIcon;
