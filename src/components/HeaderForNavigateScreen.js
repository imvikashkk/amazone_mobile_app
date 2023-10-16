import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
  TextInput,
} from "react-native";
import React, {useState} from "react";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HeaderForNavigateScreen = ({ initialValue, setInput }) => {
  const navigation = useNavigation();
  const [text, setText] = useState(initialValue)
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={["#88dae0", "#98e1d6", "#9ee4d4"]}
      style={{ paddingTop: StatusBar.currentHeight }}>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItem: "center",
        }}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          style={{ margin: 8 }}
          onPress={() => navigation.goBack()}
        />
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
            style={{ width: 225 }}
            value={text}
            onChangeText={(txt) => setText(txt)}
            onSubmitEditing={() => setInput(text)}
            returnKeyType="search"
          />
          <AntDesign
            name="scan1"
            size={24}
            color="black"
            style={{ marginLeft: -1, position: "absolute", right: 8 }}
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
  );
};

export default HeaderForNavigateScreen;

const styles = StyleSheet.create({});
