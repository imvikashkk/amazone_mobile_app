import React, { memo } from "react";
import { View, Image, StyleSheet, Dimensions} from "react-native";
import Swiper from "react-native-swiper";
import carouselData from "../data/carouselData";

const screenWidth = Dimensions.get("window").width;
const ImageCarousel = () => {

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        autoplay={true}
        autoplayTimeout={5}
        loop={true}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        >
        {carouselData.map((item, index) => {
          return (
            <View key={index} style={styles.slide}>
              <Image
                source={item?.image}
                style={{
                  width: screenWidth,
                  height: 250,
                  resizeMode: "stretch",
                }}
              />
            </View>
          );
        })}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 255,  // Give Heigh for maintain distance between dot and images
  },
  wrapper: {
    // Add styling for the wrapper here if needed
  },
  slide: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
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
