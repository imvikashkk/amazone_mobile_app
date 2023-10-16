import { StyleSheet, Text, View, Pressable, Image, Dimensions } from "react-native";
import React, {memo} from "react";
import trendingDeals from "../data/trendingDeals";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width
const TrendingDeals = (props) => {
  const navigation = useNavigation();
  return (
    <>
      <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
        Trending Deals of the week
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent:"center",
          rowGap: 30 ,
          columnGap: -5,
          marginVertical:10
        }}>
        {trendingDeals.map((item, index) => (
          <Pressable
            key={index}
            onPress={() =>
              navigation.navigate("InfoWithCarousel", {
                id: item.id,
                title: item.title,
                price: item?.price,
                carouselImages: item.carouselImages,
                color: item?.color,
                size: item?.size,
                oldPrice: item?.oldPrice,
                item: item,
              })
            }
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}>
            <Image
              style={{ width: screenWidth/2.1, height: 200, resizeMode: "contain" }}
              source={{ uri: item?.image }}
            />
          </Pressable>
        ))}
      </View>
    </>
  );
};

export default memo(TrendingDeals);

const styles = StyleSheet.create({});
