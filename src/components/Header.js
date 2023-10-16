import {
  StyleSheet,
  View,
  StatusBar,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState, memo, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const Header = () => {
  const [input, setInput] = useState("");
  const navigation = useNavigation();

  /* Navigate to SearchItem to display the searching items */
  const SearchInput = useCallback((input) => {
    if (input.trim() !== "") {
      navigation.navigate("SearchItem", { search: input });
    }
    setInput("");
  }, [input])

  return (
    <>
      <StatusBar translucent backgroundColor={"transparent"} barStyle={"dark-content"} />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#88dae0", "#98e1d6", "#9ee4d4"]}
        style={{paddingTop: StatusBar.currentHeight,}}
        >
        {/* Search Field */}
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItem: "center",
          }}>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 7,
              gap: 10,
              backgroundColor: "white",
              borderRadius: 3,
              height: 38,
              flex: 1,
            }}>
            <AntDesign
              style={{ paddingLeft: 10 }}
              name="search1"
              size={22}
              color="black"
            />

            <TextInput
              placeholder="Search Amazon.in"
              style={{ width: 265 }}
              value={input}
              onChangeText={(text) => setInput(text)}
              onSubmitEditing={()=>SearchInput(input)}
              returnKeyType="search"
            />

            <AntDesign
              name="scan1"
              size={24}
              color="black"
              style={{ position:"absolute", right:10 }}
            />
          </Pressable>
          <Feather
            name="mic"
            size={24}
            color="black"
            style={{ marginTop: 2, padding: 3 }}
          />
        </View>
      </LinearGradient>
    </>
  );
};

export default memo(Header);

const styles = StyleSheet.create({});
