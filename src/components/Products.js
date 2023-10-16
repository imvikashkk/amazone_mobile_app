import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import ProductItem from "./subComponents/ProductItem";
import DropDownPicker from "react-native-dropdown-picker";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "All", value: "" },
    { label: "Men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" },
  ]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const data = response.data;
        data.forEach((item) => {
          item.id = "product" + item.id;
        });
        setProducts(data);
      } catch (error) {
        console.log("error message", error);
      }
    };
    fetchData();
  }, []);

  
  return (
    <>
      {products ? (
        <>
          <Text
            style={{
              height: 0.1,
              borderColor: "#D0D0D0",
              borderWidth: 0.5,
              marginTop: 25,
            }}
          />

          <View
            style={{
              marginTop: 30,
              marginBottom: open ? 220 : 25,
              marginHorizontal: 8,
            }}>
            <View
              style={{
                width: "70%",
                maxWidth: 300,
                backgroundColor: "white",
                margin: 5,
              }}>
              <DropDownPicker
                style={{
                  borderColor: "#d6d6d6",
                  height: 30,
                  borderWidth: 0.4,
                  elevation: 5,
                  backgroundColor: "white",
                }}
                open={open}
                value={category}
                items={items}
                setOpen={setOpen}
                setValue={setCategory}
                setItems={setItems}
                placeholder="Choose Category"
                placeholderStyle={styles.placeholderStyles}
                zIndex={3000}
                zIndexInverse={1000}
                listMode="SCROLLVIEW"
                containerStyle={{
                  backgroundColor: "#ffffff",
                  borderColor: "transparent",
                  borderWidth:0
                }}
                selectedItemContainerStyle={{
                  backgroundColor: "#f6f6f6",
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 8,
              margin: 4,
            }}>
            {category
              ? products
                  ?.filter((item) => item?.category === category)
                  .map((item, index) => <ProductItem item={item} key={index} />)
              : products?.map((item, index) => (
                  <ProductItem item={item} key={index} />
                ))}
          </View>
        </>
      ) : null}
    </>
  );
};

export default memo(Products);

const styles = StyleSheet.create({
  placeholderStyles: {
    fontSize: 14,
  },
});
