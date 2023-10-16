import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import React, { useMemo, memo } from "react";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const Brands = () => {
  const navigation = useNavigation();
  const data = useMemo(
    () => [
      {
        id: "brand0",
        image:
          "https://www.southjewellery.com/wp-content/uploads/2021/01/diamond-ruby-choker-set-1-768x803.jpg",
        title: "Min. 20% off | CaratLane Diamond Neklace",
        offer: "20%",
        oldPrice: 119999,
        price: 95999,
        specification: ` 
      
      Product code: N1296
  
      Length : 19cms, 24gms
      
      Earring Length : 3cms,Weight of Pairs : 8gms
      
      Material Finish: Premium, American Diamond
      
      Neckwear Fastening: Adjustable Back Thread
      
      Earring Fastening: Pushback 
      
      
      `,
      },
      {
        id: "brand1",
        image:
          "https://staticimg.titan.co.in/Titan/Catalog/90165AP02_1.jpg?impolicy=pqmed&imwidth=640",
        title: "Min. 40% off | Fossil, Titan Smart Watch & More",
        offer: "40%",
        oldPrice: 6999,
        price: 4999,
        specification: `
  
      Product code: DW1452
  
      Brand: Titan
  
      BlueTooth: Yes
  
      Color: Titan Choice
  
      Camera: Yes
  
      Heart/BP: Yes
  
      `,
      },
      {
        id: "brand2",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSuXIiybOrz1HzxUcUTlcKSrzku8HmHqOwVR6MiM8rCsvxXTb2-9qko2M7L8N1svemqOw&usqp=CAU",
        title: "Heels - Upto 50% OFF on Heeled Sandals, High Heel",
        offer: "50%",
        oldPrice: 1799,
        price: 899,
        specification: `
  
      Product code: WS1454
  
      Brand: Puma
  
      Size: 8/9/10/11/12
  
      Color: white-red-green / golden-blue-black
  
      `,
      },
      {
        id: "brand3",
        image:
          "https://apollo-singapore.akamaized.net/v1/files/zokh1axk8z89-IN/image;s=360x0",
        title: "Sony 60W Blutooth SoundBar Speaker Audio Engine",
        offer: "10%",
        oldPrice: 1110,
        price: 999,
        specification: `
  
      Product code: ES0854
  
      Brand: Sony
  
      Amazone Assured: Yes
  
      Speaker: High Bass and Good Quality
  
      Color: Skyblue / Yellowish
  
      `,
      },
    ],
    []
  );
  return (
    <View
      style={{ marginTop: 10, borderTopWidth: 1, borderTopColor: "#dddddd", paddingTop:25 }}>
      <Text style={{ fontSize: 18,fontWeight:"600" ,color: "black", marginTop: 4, marginHorizontal:10}}>
        Brands of the day
      </Text>
      <View style={{flexDirection:"row", flexWrap:"wrap", margin:6, gap:3, justifyContent:"center", alignItems:"center"}}>
        {data.map((item, index) => {
          return (
            <Pressable
              onPress={() =>
                navigation.navigate("InfoWithSingleImage", { item })
              }
              key={index}
              style={{ elevation: 5, backgroundColor: "white", padding:4, width: screenWidth / 2.1, borderRadius:3, maxWidth:180}}>
              <Image
                source={{ uri: item.image }}
                style={{
                  height: screenWidth / 2.1,
                  width: screenWidth / 2.2,
                  maxWidth:180,
                  maxHeight:185,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: "#efefef",
                }}
              />
              <Text style={{fontSize:13}}>{item.title}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default memo(Brands);
