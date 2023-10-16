import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
  Pressable,
  ActivityIndicator
} from "react-native";
import React, { useEffect, useState, useContext, useCallback, memo} from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ContextMain } from "../context/ContextMain";
import axios from "axios";

const screenWidth = Dimensions.get("window").width;
const ProfileScreen = () => {
  const [name, setName] = useState("");
  const navigation = useNavigation();
  const { orders, setOrders } = useContext(ContextMain);
  const [orderLoading, setOrderLoading] = useState(false);

  /* Fetching Name From Async Storge which is already saved during the login */
  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem("userinfo");
      setName(JSON.parse(data).name);
    })();
    getOrders();
  }, []);

  /* Handle Orders */
  const getOrders = useCallback(async () => {
    setOrderLoading(true);
    const authkey = await AsyncStorage.getItem("authtoken");
    const headers = {
      "Content-Type": "application/json",
      authkey: `${authkey}`,
    };
    axios
      .get("https://amazone-backend.vercel.app/api/userorder/orderlist", {
        headers,
      })
      .then((response) => {
        setOrders(response?.data?.orderlist);
        setOrderLoading(false)
      })
      .catch((error) => {
        if (error?.response) {
          console.log("Could not found address !!");
          console.log(
            `${error?.response?.data?.statusmessage} !!`,
            `${error?.response?.data?.message} !! `
          );
        } else {
          console.log(
            "An error occurred while fetching orders !!",
            "Please try again later....."
          );
        }
      });
  }, []);

  return (
    <>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={["#92d7dc", "#abd9dc"]}
        style={{ padding: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: StatusBar.currentHeight,
          }}>
          <Image
            source={require("../../assets/logo.png")}
            style={{ height: 40, width: 100 }}
          />
          <View style={{ flexDirection: "row", marginTop: -10, gap: 20 }}>
            <Feather name="bell" size={24} color="black" />
            <AntDesign name="search1" size={24} color="black" />
          </View>
        </View>
      </LinearGradient>
      <ScrollView showsVerticalScrollIndicator={false} style={{ zIndex: 100 }}>
        {/* Logo, greating, Name, Notificatio, Person */}
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={["#abd9dc", "white"]}
          style={{ padding: 10, paddingTop: -10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 20,
            }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 20, fontWeight: "400" }}>Hello,</Text>
              <Text style={{ fontSize: 24, fontWeight: "500" }}> {name}</Text>
            </View>
            <Ionicons name="person-circle" size={50} color="gray" />
          </View>
        </LinearGradient>
        <View style={{ padding: 15, backgroundColor: "white" }}>
          {/* Your Order, Buy Again, Your Account, Your Lists */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              rowGap: 20,
              marginTop: -40,
            }}>
            <Pressable
             onPress={()=> navigation.navigate("OrderDetails", {orders})}
             disabled={orderLoading}
              style={{
                borderWidth: 0.4,
                borderColor: "#e3e3e3",
                height: 40,
                width: screenWidth / 2.5,
                borderRadius: 20,
                justifyContent: "center",
                elevation: 1.5,
                backgroundColor: "white",
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "400",
                  textAlign: "center",
                  textAlignVertical: "center",
                }}>
                Your Orders
              </Text>
            </Pressable>
            <View
              style={{
                borderWidth: 0.4,
                borderColor: "#e3e3e3",
                height: 40,
                width: screenWidth / 2.5,
                borderRadius: 20,
                justifyContent: "center",
                elevation: 1.5,
                backgroundColor: "white",
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "400",
                  textAlign: "center",
                  textAlignVertical: "center",
                }}>
                Buy Again
              </Text>
            </View>
            <View
              style={{
                borderWidth: 0.4,
                borderColor: "#e3e3e3",
                height: 40,
                width: screenWidth / 2.5,
                borderRadius: 20,
                justifyContent: "center",
                elevation: 1.5,
                backgroundColor: "white",
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "400",
                  textAlign: "center",
                  textAlignVertical: "center",
                }}>
                Your Account
              </Text>
            </View>
            <View
              style={{
                borderWidth: 0.4,
                borderColor: "#e3e3e3",
                height: 40,
                width: screenWidth / 2.5,
                borderRadius: 20,
                justifyContent: "center",
                elevation: 1.5,
                backgroundColor: "white",
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "400",
                  textAlign: "center",
                  textAlignVertical: "center",
                }}>
                Your Lists
              </Text>
            </View>
          </View>

          {/* Your Orders */}
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Your Orders</Text>
            <Text
            onPress={()=> navigation.navigate("OrderDetails", {orders})}
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: "#388cf3",
                display: orders.length > 0 ? "flex" :  "none",
              }}>
              See all
            </Text>
          </View>

          {orders.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ flexDirection: "row", marginTop: 15 }}>
              {orders?.map((order, index) => {
                return order?.products?.map((product, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        padding: 20,
                        borderRadius: 10,
                        overflow: "hidden",
                        elevation: 4,
                        backgroundColor: "white",
                        margin: 10,
                      }}>
                      <Image
                        source={{ uri: product.image }}
                        style={styles.orderImage}
                      />
                    </View>
                  );
                });
              })}
            </ScrollView>
          )  : !orderLoading ? (
            <View style={{ marginVertical: 20, alignSelf: "center" }}>
              <Text style={{ fontSize: 16, fontWeight: "300" }}>No Order.</Text>
            </View>
          ) : (
             <View style={{ 
                marginVertical:20, 
                alignSelf: "center" 
          }}> 
          <ActivityIndicator size={30} /> 
          </View>)}

          {/* Horizontal Line */}
          <Text
            style={{
              borderTopWidth: 1.5,
              borderTopColor: "#dedede",
              marginHorizontal: -15,
              marginTop: 25,
            }}
          />

          {/* Keep shopping for */}
          <View
            style={{
              marginTop: 5,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Keep shopping for
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "400", color: "#388cf3" }}>
              Edit
            </Text>
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              rowGap: 8,
              columnGap: 8,
              marginHorizontal: -8,
            }}>
            <View
              style={{
                paddingHorizontal: 15,
                elevation: 1,
                borderRadius: 4,
                borderRadius: 4,
                paddingVertical: 15,
                backgroundColor: "white",
                borderWidth: 0.4,
                borderColor: "#dfdfdf",
              }}>
              <Image
                source={{
                  uri: "https://gadgetviper.com/blog/wp-content/uploads/2017/02/bose-bluetooth-neckband-headphones.jpg",
                }}
                style={{
                  height: 100,
                  width: screenWidth / 2.7,
                  resizeMode: "contain",
                }}
              />
              <Text style={{ fontSize: 14, fontWeight: "400", marginTop: 5 }}>
                Audio headphones
              </Text>
            </View>

            <View
              style={{
                paddingHorizontal: 15,
                elevation: 1,
                borderRadius: 4,
                borderRadius: 4,
                paddingVertical: 15,
                backgroundColor: "white",
                borderWidth: 0.4,
                borderColor: "#dfdfdf",
              }}>
              <Image
                source={{
                  uri: "https://wroom.co.in/wp-content/uploads/2022/04/Sandisk-128GB-Extreme-microSDXC-UHS-I-Memory-Card-Online-Buy-India_1.jpg",
                }}
                style={{
                  height: 100,
                  width: screenWidth / 2.7,
                  resizeMode: "contain",
                }}
              />
              <Text style={{ fontSize: 14, fontWeight: "400", marginTop: 5 }}>
                Memory Card 128GB
              </Text>
            </View>

            <View
              style={{
                paddingHorizontal: 15,
                elevation: 1,
                borderRadius: 4,
                borderRadius: 4,
                paddingVertical: 15,
                backgroundColor: "white",
                borderWidth: 0.4,
                borderColor: "#dfdfdf",
              }}>
              <Image
                source={{
                  uri: "https://5.imimg.com/data5/SELLER/Default/2021/3/KO/QG/XG/3922575/all-grocery-items-500x500.jpg",
                }}
                style={{
                  height: 100,
                  width: screenWidth / 2.7,
                  resizeMode: "contain",
                }}
              />
              <Text style={{ fontSize: 14, fontWeight: "400", marginTop: 5 }}>
                Audio headphones
              </Text>
            </View>

            <View
              style={{
                paddingHorizontal: 15,
                elevation: 1,
                borderRadius: 4,
                borderRadius: 4,
                paddingVertical: 15,
                backgroundColor: "white",
                borderWidth: 0.4,
                borderColor: "#dfdfdf",
              }}>
              <Image
                source={{
                  uri: "https://5.imimg.com/data5/DM/FY/MY-65431535/cricket-kit-set-full-size.jpg",
                }}
                style={{
                  height: 100,
                  width: screenWidth / 2.7,
                  resizeMode: "contain",
                }}
              />
              <Text style={{ fontSize: 14, fontWeight: "400", marginTop: 5 }}>
                Cricket Kit
              </Text>
            </View>
          </View>
          <Text style={{ fontSize: 15, color: "#08a2be", marginTop: 15 }}>
            View Your Browsing history.
          </Text>

          {/* Horizontal Line */}
          <Text
            style={{
              borderTopWidth: 1.5,
              borderTopColor: "#dedede",
              marginHorizontal: -15,
              marginTop: 25,
            }}
          />

          {/* Buy again */}
          <View>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>Buy Again</Text>
            <Text style={{ fontSize: 15, marginTop: 6 }}>
              See what others are reordering on Buy Again
            </Text>
            <View
              style={{
                elevation: 1,
                paddingHorizontal: screenWidth / 2 - 70,
                paddingVertical: 14,
                borderWidth: 0.4,
                borderColor: "#c1c1c1",
                borderRadius: 10,
                marginTop: 15,
                backgroundColor: "white",
              }}>
              <Text style={{ fontSize: 15, fontWeight: "400" }}>
                Visit Buy Again
              </Text>
            </View>
          </View>

          {/* Horizontal Line */}
          <Text
            style={{
              borderTopWidth: 1.5,
              borderTopColor: "#dedede",
              marginHorizontal: -15,
              marginTop: 25,
            }}
          />

          {/* Your Lists */}
          <View>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>Your Lists</Text>
            <Text style={{ fontSize: 15, marginTop: 6 }}>
              You haven't created any lists.
            </Text>
            <View
              style={{
                elevation: 1,
                paddingHorizontal: screenWidth / 2 - 70,
                paddingVertical: 14,
                borderWidth: 0.4,
                borderColor: "#c1c1c1",
                borderRadius: 10,
                marginTop: 15,
                backgroundColor: "white",
              }}>
              <Text style={{ fontSize: 15, fontWeight: "400" }}>
                Create a List
              </Text>
            </View>
          </View>

          {/* Horizontal Line */}
          <Text
            style={{
              borderTopWidth: 1.5,
              borderTopColor: "#dedede",
              marginHorizontal: -15,
              marginTop: 25,
            }}
          />

          {/* Your Accounts */}
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Text style={{ fontSize: 18, fontWeight: "500" }}>
                Your Accounts
              </Text>
              <Text
                style={{ fontSize: 15, fontWeight: "400", color: "#0063ae" }}>
                See all
              </Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 14 }}>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <Pressable
                  onPress={() =>
                    navigation.navigate("LocationAndAddressUpdate")
                  }
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 14,
                    backgroundColor: "white",
                    borderRadius: 10,
                    elevation: 1,
                    margin: 2,
                    borderWidth: 0.4,
                    borderColor: "#d6d5d5",
                  }}>
                  <Text style={{ fontSize: 15, fontWeight: "400" }}>
                    Your Address
                  </Text>
                </Pressable>
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 14,
                    backgroundColor: "white",
                    borderRadius: 10,
                    elevation: 1,
                    margin: 2,
                    borderWidth: 0.4,
                    borderColor: "#d6d5d5",
                  }}>
                  <Text style={{ fontSize: 15, fontWeight: "400" }}>
                    Top-up your Amazone Pay Wallet
                  </Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 14,
                    backgroundColor: "white",
                    borderRadius: 10,
                    elevation: 1,
                    margin: 2,
                    borderWidth: 0.4,
                    borderColor: "#d6d5d5",
                  }}>
                  <Text style={{ fontSize: 15, fontWeight: "400" }}>
                    View Amazone Pay balance statement
                  </Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 14,
                    backgroundColor: "white",
                    borderRadius: 10,
                    elevation: 1,
                    margin: 2,
                    borderWidth: 0.4,
                    borderColor: "#d6d5d5",
                  }}>
                  <Text style={{ fontSize: 15, fontWeight: "400" }}>
                    Amazone Pay UPI
                  </Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 14,
                    backgroundColor: "white",
                    borderRadius: 10,
                    elevation: 1,
                    margin: 2,
                    borderWidth: 0.4,
                    borderColor: "#d6d5d5",
                  }}>
                  <Text style={{ fontSize: 15, fontWeight: "400" }}>
                    Manage Your Profile
                  </Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 14,
                    backgroundColor: "white",
                    borderRadius: 10,
                    elevation: 1,
                    margin: 2,
                    borderWidth: 0.4,
                    borderColor: "#d6d5d5",
                  }}>
                  <Text style={{ fontSize: 15, fontWeight: "400" }}>
                    Subscribe & Save
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>

          {/* Horizontal Line */}
          <Text
            style={{
              borderTopWidth: 4,
              borderTopColor: "#dedede",
              marginHorizontal: -15,
              marginTop: 25,
            }}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default memo(ProfileScreen);

const styles = StyleSheet.create({
  main: {
    borderWidth: 0.6,
    borderColor: "#9b9b9b",
    height: 40,
    width: screenWidth / 2.5,
    fontSize: 15,
    fontWeight: "400",
    borderRadius: 20,
    textAlign: "center",
    textAlignVertical: "center",
  },
  orderImage: {
    height: 100,
    width: 100,
    resizeMode: "contain",
    overflow: "hidden",
  },
});
