import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import Header from "../components/Header";

const screenWidth = Dimensions.get("window").width;
const boxWidth = (screenWidth - 42) / 2;
const boxHeight = ((screenWidth - 42) / 2) * 1.05;

const MenuScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    navigation.replace("LoginScreen");
    AsyncStorage.clear();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 2 }}
        colors={[
          "#88dae0",
          "#e1e1e1",
          "#d4f3ee",
          "#88dae0",
          "#e1e1e1",
          "#d4f3ee",
        ]}
        style={{ flex: 1 }}>
        <ScrollView>
          <View
            style={{
              padding: 14,
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 14,
            }}>
            {data.map((item) => {
              return (
                <View
                  key={item.id}
                  style={{
                    borderRadius: 12,
                    backgroundColor: "white",
                    height: boxHeight,
                    width: boxWidth,
                    overflow: "hidden",
                    justifyContent: "space-between",
                    position: "relative",
                    elevation: 10,
                    shadowColor: "#000000",
                  }}>
                  <View style={{ height: (boxHeight / 5) * 1.6, padding: 10 }}>
                    <Text style={{ fontSize: 15 }}>{item.title}</Text>
                  </View>

                  <View
                    style={{
                      height: (boxHeight / 5) * 2.6,
                      width: boxWidth * 1.2,
                      alignSelf: "center",
                      backgroundColor: "rgba(136, 218, 224, 0.3)",
                      borderTopLeftRadius: boxWidth * 4,
                      borderTopRightRadius: boxWidth * 4,
                      overflow: "hidden",
                      marginBottom: 0,
                    }}
                  />

                  <Image
                    style={{
                      height: boxHeight / 1.6,
                      width: boxWidth / 1.6,
                      position: "absolute",
                      resizeMode: "contain",
                      alignSelf: "center",
                      bottom: 0,
                    }}
                    source={item.image}
                  />
                </View>
              );
            })}

            <View style={{ marginTop: 20, gap: 12, marginBottom: 50 }}>
              <Pressable style={styles.horizontalButton}>
                <Text style={{ fontSize: 16, fontWeight: "400" }}>
                  Settings
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="black"
                />
              </Pressable>
              <Pressable style={styles.horizontalButton}>
                <Text style={{ fontSize: 16, fontWeight: "400" }}>
                  Customer Service
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="black"
                />
              </Pressable>
              <Pressable
                onPress={handleSignOut}
                style={styles.horizontalButton}>
                <Text style={{ fontSize: 16, fontWeight: "400" }}>
                  Sign Out
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="black"
                />
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const data = [
  {
    id: 0,
    title: "Amazone Pay",
    image: require("../assets/amazonePayment.png"),
  },
  {
    id: 1,
    title: "Mobile, Electronics & Alexa",
    image: require("../assets/amazone.png"),
  },
  {
    id: 2,
    title: "Deals & Savings",
    image: require("../assets/amazone.png"),
  },
  {
    id: 3,
    title: "Groceries & Pet Supplies",
    image: require("../assets/amazone.png"),
  },
  {
    id: 4,
    title: "MiniTV, Videos & Music",
    image: require("../assets/amazone.png"),
  },
  {
    id: 5,
    title: "Fashion & Beauty",
    image: require("../assets/amazone.png"),
  },
  {
    id: 6,
    title: "Pharmacy, Health & Household",
    image: require("../assets/amazone.png"),
  },
  ,
  {
    id: 7,
    title: "Toys, Children & Baby",
    image: require("../assets/amazone.png"),
  },
  {
    id: 8,
    title: "Business Purchases",
    image: require("../assets/amazone.png"),
  },
  ,
  {
    id: 9,
    title: "Prime",
    image: require("../assets/amazone.png"),
  },
  {
    id: 10,
    title: "Sports & Education",
    image: require("../assets/amazone.png"),
  },
  ,
  {
    id: 11,
    title: "Travel & Auto",
    image: require("../assets/amazone.png"),
  },
  {
    id: 12,
    title: "Sell on Amazone",
    image: require("../assets/amazone.png"),
  },
  ,
  {
    id: 13,
    title: "Your Things",
    image: require("../assets/amazone.png"),
  },
];

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  horizontalButton: {
    height: 50,
    width: screenWidth - 28,
    backgroundColor: "white",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 0.4,
    borderColor:"#b0b0b0",
    flexDirection: "row",
    justifyContent: "space-between",
    elevation:10
  },
});
