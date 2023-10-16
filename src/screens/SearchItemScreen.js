import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Animated,
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

/* Components */
import SubHeader from "../components/SubHeader";
import NavBarSearchScreen from "../components/NavBarSearchScreen";
import HeaderForNavigateScreen from "../components/HeaderForNavigateScreen";

/* ICONS */
import { Rating } from "react-native-ratings";
import { AntDesign } from "@expo/vector-icons";

/* dependencies */
import axios from "axios";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

const screenWidth = Dimensions.get("window").width;
const SearchItem = (prop) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState();
  const [selected, setSelected] = useState();
  const filterBottomsheetRef = useRef();
  const [newPageLoading, setNewPageLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPrime, setIsPrime] = useState(false);

  const route = useRoute();
  const [input, setInput] = useState(route?.params?.search);

  const navigation = useNavigation();

  /* NavBar Scroll Behaviour */
  const scrollY = new Animated.Value(0);
  const [scrollYalue, setScrollYalue] = useState(0);
  const handleYalue = (scY) => {
    if (scY < 5) {
      if (scrollYalue !== 0) {
        setScrollYalue(0);
      }
    } else {
      if (scrollYalue !== 37.5) {
        setScrollYalue(37.5);
      }
    }
  };
  const diffClamp = Animated.diffClamp(scrollY, scrollYalue, 180);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 25],
    outputRange: [0, -25],
  });

  /* Setting Header */
  useLayoutEffect(() => {
    prop.navigation.setOptions({
      header: () => (
        <HeaderForNavigateScreen initialValue={input} setInput={setInput} />
      ),
    });
  });

  /* API Calling */
  const searchData = (filter) => {
    const params = {
      input,
      currentPage,
      filter,
    };
    console.log(input);
    axios
      .get("https://amazone-backend.vercel.app/api/rainforestdata", { params })
      .then((response) => {
        if (currentPage === 1) {
          setData(response?.data?.search_results);
        } else {
          setData([...data, response?.data?.search_results]);
        }
        setIsLoading(false);
        setIsError(false);
        setCurrentPage(currentPage + 1);
        setNewPageLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setIsError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    setSelected("");
    setCurrentPage(1);
    searchData();
  }, [input]);

  /* Title text limit Function */
  const createShortcut = (text) => {
    if (text?.length > 60) {
      return text.slice(0, 60) + "...";
    } else {
      return text;
    }
  };

  /* Rating Formater Function */
  const ratingFormater = (data) => {
    if (data >= 1000) {
      return (data / 1000).toFixed(1) + "k+";
    } else {
      return data;
    }
  };

  /* Comma Seperation in Price Function */
  function formatNumberInIndianRupees(number) {
    const formattedNumber = new Intl.NumberFormat("en-IN").format(number);
    return formattedNumber;
  }

  /* Discount Calculation */
  function calculateDiscountPercentage(originalPrice, discountedPrice) {
    const discountAmount = originalPrice - discountedPrice;
    const discountPercentage = (discountAmount / originalPrice) * 100;
    return Math.trunc(discountPercentage);
  }

  /* Render Search Items */
  const RenderSearchItems = React.memo(({ item, index }) => {
    return (
      <>
        {index === 0 && (
          <Text style={{ padding: 7, marginBottom: 10, fontSize: 16 }}>
            Price and other details may vary based on product size and colour.
          </Text>
        )}
        {isPrime && !item?.is_prime ? null : (
          <Pressable
            onPress={() => navigation.navigate("InfoSearch", { item })}
            style={{
              marginHorizontal: 15,
              marginBottom: 15,
              borderRadius: 8,
              flexDirection: "row",
              elevation: 5,
              shadowColor: "#999999",
              overflow: "hidden",
              borderWidth: 0.4,
              borderColor: "#e1e1e1",
            }}>
            {/* Left Side */}
            <View
              style={{
                height: 170,
                width: (screenWidth / 5) * 2,
                padding: 20,
                backgroundColor: "#ffffff",
                overflow: "hidden",
              }}>
              <Image
                source={{ uri: item.image }}
                style={{ height: "100%", width: "100%", resizeMode: "contain" }}
              />
            </View>

            {/* Right Side */}
            <View
              style={{
                height: 170,
                backgroundColor: "#fafafa",
                width: (screenWidth / 5) * 3,
                paddingRight: 30,
                paddingVertical: 5,
                paddingLeft: 5,
                overflow: "hidden",
              }}>
              {/* SPONSERED */}
              {item?.sponsored === true ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}>
                  <Text style={{ color: "#0b5a7f" }}>Sponsored</Text>
                  <AntDesign name="infocirlce" size={13} color="#a2a2a2" />
                </View>
              ) : null}

              {/*  TITLE */}
              <Text style={{ margin: 5, color: "black" }}>
                {item?.title?.length > 60
                  ? createShortcut(item?.title?.toString())
                  : item?.title}
              </Text>

              {/* RATING */}
              {item.rating ? (
                <View
                  style={{
                    flexDirection: "row",
                    gap: 8,
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}>
                  <Text style={{ color: "#0d809d", fontSize: 14 }}>
                    {item.rating}
                  </Text>
                  <Rating
                    type="star"
                    ratingCount={5}
                    readonly
                    fractions={2}
                    startingValue={item.rating}
                    imageSize={20}
                  />
                  <Text style={{ fontSize: 11 }}>
                    {ratingFormater(item.ratings_total)}
                  </Text>
                </View>
              ) : null}

              {/* PRICE */}
              {item.prices ? (
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: "black" }}>
                    {item?.prices[0]?.symbol}
                  </Text>
                  <Text style={{ color: "black", fontSize: 18 }}>
                    {formatNumberInIndianRupees(item?.prices[0]?.value)}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 7,
                    }}>
                    <Text style={{ fontSize: 12, marginLeft: 5 }}>M.R.P: </Text>
                    <Text
                      style={{
                        textDecorationLine: "line-through",
                        fontSize: 12,
                      }}>
                      {item?.prices[1]?.raw}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        marginLeft: 5,
                      }}>{`(${calculateDiscountPercentage(
                      item?.prices[1]?.value,
                      item?.prices[0]?.value
                    )}% off)`}</Text>
                  </View>
                </View>
              ) : null}

              {/* Prime */}
              {item?.is_prime === true ? (
                <View
                  style={{
                    height: 10,
                    width: 55,
                    marginTop: -18,
                    marginBottom: 20,
                  }}>
                  <Image
                    source={require("../assets/prime-logo.png")}
                    style={{ width: 55, height: 55, resizeMode: "contain" }}
                  />
                </View>
              ) : null}

              {/* Delivery */}
              <View
                style={{
                  padding: 5,
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <Text>Free delvery</Text>
                <Text
                  style={{ marginLeft: 5, fontSize: 14, fontWeight: "500" }}>
                  Tomorrow,10 Sept
                </Text>
              </View>
            </View>
          </Pressable>
        )}

        {index === data?.length - 1 && (
          <ActivityIndicator
            size="large"
            color="#5c4b38"
            style={{
              marginTop: 5,
              marginBottom: 10,
              display: newPageLoading ? "flex" : "none",
            }}
          />
        )}
      </>
    );
  });

  /* handleBottomSheetFilter */
  const handleBottomSheet = () => {
    filterBottomsheetRef.current?.snapToIndex(0);
  };

  /* handle Selection button of filter */
  const handleSelection = (filter) => {
    searchData(filter);
    setSelected(filter);
  };

  /* handleNExtPage or MoreItems */
  const handleNewPage = () => {
    setNewPageLoading(true);
    setData([...data, ...data]);
    // searchData()
  };

  return (
    <>
      <View>
        {/* <NavBarSearchScreen /> */}
        {isError && <Text>Sorry, Not found, Please Try again..... </Text>}

        {/* Circular activity indicator till API call in progress */}
        {isLoading && <ActivityIndicator size="large" color="#5c4b38" />}

        {/* After API Call Complete */}
        {!isLoading && !isError && (
          <View>
            <Animated.View
              style={{
                transform: [{ translateY: translateY }],
                elevation: 4,
                zIndex: 400,
                position: "absolute",
                top: 0,
              }}>
              <SubHeader />
              <NavBarSearchScreen
                setInput={setInput}
                handleBottomSheet={handleBottomSheet}
                setIsPrime={setIsPrime}
                isPrime={isPrime}
              />
            </Animated.View>

            <View
              style={{
                backgroundColor: "white",
                marginTop: 37.5 - scrollYalue,
                borderBottomWidth: 0.6,
                borderBottomColor: "#d5d5d5",
                // paddingBottom: 500,
              }}>
              {/* FlatList For Rendering the Search Data */}
              {data ? (
                <>
                  <FlatList
                    data={data}
                    renderItem={({ item, index }) => (
                      <RenderSearchItems
                        item={item}
                        index={index}
                        key={index}
                      />
                    )}
                    keyExtractor={(item, index) => index}
                    onScroll={(e) => {
                      scrollY.setValue(e.nativeEvent.contentOffset.y);
                      handleYalue(e.nativeEvent.contentOffset.y);
                    }}
                    style={{
                      backgroundColor: "white",
                      marginTop: 45 - scrollYalue,
                    }}
                    onEndReached={() => handleNewPage()}
                    onEndReachedThreshold={0.2}
                  />
                </>
              ) : null}
            </View>
          </View>
        )}
      </View>
      <BottomSheet
        ref={filterBottomsheetRef}
        index={-1}
        enablePanDownToClose={true}
        snapPoints={["50%"]}
        backgroundStyle={{
          borderRadius: 12,
          borderColor: "#878787",
          borderWidth: 0.5,
          width: screenWidth,
        }}
        keyboardBehavior={"extend"}
        handleIndicatorStyle={{
          height: 0.5,
          width: 60,
          backgroundColor: "#bdbdbd",
        }}
        animateOnMount={true}
        enabledInnerScrolling={true}>
        <BottomSheetScrollView
          style={{ flex: 1, paddingHorizontal: 18, backgroundColor: "white" }}>
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ marginHorizontal: 8, marginBottom: 20 }}>
              <Text
                style={{ fontSize: 17, fontWeight: "600", color: "#00509f" }}>
                Search by filter
              </Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <TouchableOpacity
                onPress={() => handleSelection("most_recent")}
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      selected === "most_recent" ? "orange" : "white",
                  },
                ]}>
                <Text style={styles.buttontext}>Most Recent</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      selected === "price_low_to_high" ? "orange" : "white",
                  },
                ]}
                onPress={() => handleSelection("price_low_to_high")}>
                <Text style={styles.buttontext}>Price Low To High</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      selected === "price_high_to_low" ? "orange" : "white",
                  },
                ]}
                onPress={() => handleSelection("price_high_to_low")}>
                <Text style={styles.buttontext}>Price High To Low</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      selected === "featured" ? "orange" : "white",
                  },
                ]}
                onPress={() => handleSelection("featured")}>
                <Text style={styles.buttontext}>Featured</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      selected === "average_review" ? "orange" : "white",
                  },
                ]}
                onPress={() => handleSelection("average_review")}>
                <Text style={styles.buttontext}>Average Customer Service</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  );
};

export default React.memo(SearchItem);

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 5,
    margin: 10,
  },
});
