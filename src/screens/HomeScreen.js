import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { memo } from "react";

/* Components Import */
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import Category from "../components/Category";
import CarouselHome from "../components/CarouselHome";
import Services from "../components/Services";
import Deals from "../components/Deals";
import TrendingDeals from "../components/TrendingDeals";
import TodaysDeals from "../components/TodaysDeals";
import Brands from "../components/Brands";
import Products from "../components/Products";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Search Amazone.in */}
      <Header />

      <ScrollView nestedScrollEnabled={true}>
        {/* Location */}
        <SubHeader />

        {/* category of items horizontal scrollview */}
        <Category />

        {/* Carousel for Images */}
        <CarouselHome />

        {/* Services like Amazone Pay and suggestions */}
        <Services />

        {/* Trending Deals of the week */}
        <TrendingDeals />

        {/* Todays Deals */}
        <TodaysDeals />

        {/* Recommended deal for you */}
        <Deals />

        {/* Brands Of The Day */}
        <Brands />

        {/* Products */}
        <Products />
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
