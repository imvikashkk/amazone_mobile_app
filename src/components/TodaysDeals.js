import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React, {memo} from "react";
import offers from "../data/offers";
import { useNavigation } from "@react-navigation/native";

const TodaysDeals = () => {
  const navigation = useNavigation();
  return (
    <>
      <Text
        style={{
          height: 1,
          borderColor: "#D0D0D0",
          borderWidth: 0.5,
          marginVertical: 10,
        }}
      />

      <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
        Today's Deals
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {offers.map((item, index) => (
          <Pressable
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
              marginVertical: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            key={index}>
              
            <Image
              style={{ width: 150, height: 150, resizeMode: "contain" }}
              source={{ uri: item?.image }}
            />

            <View
              style={{
                backgroundColor: "#E31837",
                paddingVertical: 5,
                width: 130,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                borderRadius: 4,
              }}>
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 13,
                  fontWeight: "bold",
                }}>
                Upto {item?.offer}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </>
  );
};

export default memo(TodaysDeals);

const styles = StyleSheet.create({});
