import React, {memo} from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Text,
} from "react-native";
import Swiper from "react-native-swiper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const ImageCarousel = ({ imageItem }) => {
  return (
    <View style={styles.container}>

      {/* Swiper Component from installed dependency */}
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        autoplay={true}
        autoplayTimeout={5}
        loop={true}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}>
        {imageItem.map((item, index) => (

          /* Images with like, discount, share */
          <ImageBackground
            style={{
              width: screenWidth,
              height:(screenWidth * 100) / 100,
              marginTop: 25,
              resizeMode: "contain",
            }}
            source={{ uri: item }}
            key={index}>
            <View
              style={{
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
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
                  }}>
                  {"20%\noff"}
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
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginTop: "auto",
                marginLeft: 20,
                marginBottom: 20,
              }}>
              <AntDesign name="hearto" size={24} color="black" />
            </View>
          </ImageBackground>

        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 450,
    marginTop: -25, // Give Heigh for maintain distance between dot and images
  },
  wrapper: {
    // Add styling for the wrapper here if needed
  },
  dot: {
    backgroundColor: "#90A4AE",
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
  activeDot: {
    backgroundColor: "#13274F",
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
});

export default memo(ImageCarousel);
