import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Switch,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useState} from "react";
import { AntDesign } from "@expo/vector-icons";

const NavBarSearchScreen = ({ setInput, handleBottomSheet, setIsPrime, isPrime}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const screenWidth = Dimensions.get("window").width;

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    setIsPrime(!isPrime);
  };


  const handleTapSearch = (data) => {
    setInput(data)
  };

 const handleFilterBottomSheet = () =>{
  handleBottomSheet()
 }

  return (
    <View
      style={{
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#dadada",
        flexDirection: "row",
        width: screenWidth,
      }}>
      <View
        style={{
          width: (screenWidth / 5) * 4,
          borderRightColor: "#dadada",
          borderRightWidth: 1,
        }}>
        <ScrollView
          horizontal
          style={{ flexDirection: "row", paddingHorizontal: 6 }}
          showsHorizontalScrollIndicator={false}>
          <Image
            source={require("../assets/prime-logo.png")}
            style={{
              height: 50,
              width: 50,
              resizeMode: "contain",
              alignSelf: "center",
            }}
          />
          <Switch
            trackColor={{ false: "#bcbcbc", true: "#0044ba" }}
            thumbColor={"#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSwitch()}
            value={isEnabled}
          />

          <Pressable
            onPress={() => handleTapSearch("Toys & Games")}
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10,
              marginHorizontal: 6,
              padding: 7,
              backgroundColor: "#f4f4f4",
              borderRadius: 5,
            }}>
            <Text style={{ textAlignVertical: "center", color: "#4b4b4b" }}>
              Toys & Games
            </Text>
          </Pressable>

          <Pressable
            onPress={() => handleTapSearch("cricket balls")}
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10,
              marginHorizontal: 6,
              padding: 7,
              backgroundColor: "#f4f4f4",
              borderRadius: 5,
            }}>
            <Text style={{ textAlignVertical: "center", color: "#4b4b4b" }}>
              Cricket Balls
            </Text>
          </Pressable>

          <Pressable
            onPress={() => handleTapSearch("Men's Clothing")}
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10,
              marginHorizontal: 6,
              padding: 7,
              backgroundColor: "#f4f4f4",
              borderRadius: 5,
            }}>
            <Text style={{ textAlignVertical: "center", color: "#4b4b4b" }}>
              Men's Clothing
            </Text>
          </Pressable>

          <Pressable
            onPress={() => handleTapSearch("Electronics")}
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10,
              marginHorizontal: 6,
              padding: 7,
              backgroundColor: "#f4f4f4",
              borderRadius: 5,
            }}>
            <Text style={{ textAlignVertical: "center", color: "#4b4b4b" }}>
              Electronics
            </Text>
          </Pressable>
        </ScrollView>
      </View>

      <Pressable
      onPress={()=> handleFilterBottomSheet()}
        style={{
          width: screenWidth / 5 - 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}>
        <Text style={{ color: "#0070ba" }}>Filters</Text>
        <AntDesign
          name="down"
          size={10}
          color="#0070ba"
          style={{ marginLeft: 4, marginTop: 2 }}
        />
      </Pressable>
    </View>
  );
};

export default NavBarSearchScreen;

const styles = StyleSheet.create({});
