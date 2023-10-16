import { StyleSheet, StatusBar } from "react-native";
import React, { useRef, useState, memo, useMemo, useCallback } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";

/* Icons */
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CartIcon from "../components/CartIcon";

/* Screens and Other Component*/
import CartScreen from "../screens/CartScreen";
import HomeStackNavigator from "./Inside/HomeStackNavigator";
import MoreScreen from "../screens/MoreScreen";
import MenuScreen from "../screens/MenuScreen";
import ProfileStackNavigator from "./Inside/ProfileStackNavigator";

/* This Dependency used for BottomSheet. We Create it in this Code */
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import BottomSheetPaymentContent from "../components/BottomSheetPaymentContent";

/* Tab Navigation Creator */
const Tab = createBottomTabNavigator();

/* Declaration of Ref */
let homeBottomSheetModalRef;
let profileBottomSheetModalRef;
let cartBottomSheetModalRef;
let menuBottomSheetModalRef;

/* function declaration for closing and Opening the the BottomSheet */
let handleCloseBottomSheet;
let handleOpenBottomSheet;

/* State Declaration */
let bottomSheetOpened;
let setBottomSheetOpened;
let cartlength = 0

/*****************************************************  MAIN COMPONENT *******************************************************/
const BottomTabNavigator = () => {
  /* State For Check Which Bottom Tab is Focused */
  [bottomSheetOpened, setBottomSheetOpened] = useState(false);

  /* redux */
  cartlength = useSelector((state) => state.cart.cart.length);

  /* Ref for all BottomSheet */
  homeBottomSheetModalRef = useRef(null);
  profileBottomSheetModalRef = useRef(null);
  cartBottomSheetModalRef = useRef(null);
  menuBottomSheetModalRef = useRef(null);

  /* Function to close bottomSheet */
  handleCloseBottomSheet = useCallback(() => {
    homeBottomSheetModalRef?.current?.close();
    profileBottomSheetModalRef?.current?.close();
    cartBottomSheetModalRef?.current?.close();
    menuBottomSheetModalRef?.current?.close();
  }, [])

  /* Function to open the bottomsheet */
  handleOpenBottomSheet = (index) => {
    homeBottomSheetModalRef.current?.snapToIndex(index);
    profileBottomSheetModalRef.current?.snapToIndex(index);
    cartBottomSheetModalRef.current?.snapToIndex(index);
    menuBottomSheetModalRef.current?.snapToIndex(index);
  }

  /* Function to handle bottomSheet */
  const handleBottomSheet = (index) => {
    if (bottomSheetOpened) {
      handleCloseBottomSheet()
    } else {
      handleOpenBottomSheet(index);
    }
  };

  return (
    <>

      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            paddingVertical: 2,
            borderTopWidth: 0.7,
            borderTopColor: "#cfcfcf",
          },
        }}>

        {/* Screen Home */}
        <Tab.Screen
          name="HomeStackNavigator"
          component={Home}
          listeners={() => ({
            tabPress: (e) => {
              handleCloseBottomSheet();
              setBottomSheetOpened(false);
            },
          })}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: ({ focused }) => {
              color: {
                focused ? "#008E97" : "black";
              }
            },
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="home"
                size={24}
                color={focused ? "#008E97" : "black"}
              />
            ),
          }}
        />

        {/* Screen Profile */}
        <Tab.Screen
          name="Profile"
          component={Profile}
          listeners={() => ({
            tabPress: (e) => {
              handleCloseBottomSheet();
              setBottomSheetOpened(false);
            },
          })}
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: ({ focused }) => {
              color: {
                focused ? "#008E97" : "black";
              }
            },
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="person-outline"
                size={24}
                color={focused ? "#008E97" : "black"}
              />
            ),
          }}
        />

        {/* More Button */}
        <Tab.Screen
          name={"More"}
          component={MoreScreen} // This will not execute
          listeners={() => ({
            tabPress: (e) => {
              e.preventDefault();
              console.log("Press");
              handleBottomSheet(1);
              setBottomSheetOpened((bool) => !bool);
            },
          })}
          options={{
            tabBarLabel: "More",
            tabBarLabelStyle: ({ focused }) => {
              color: {
                bottomSheetOpened ? "#008E97" : "black";
              }
            },
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="layers-outline"
                size={24}
                color={bottomSheetOpened ? "#008E97" : "black"}
              />
            ),
          }}
        />

        {/* Screen Cart */}
        <Tab.Screen
          name="Cart"
          component={Cart}
          listeners={() => ({
            tabPress: (e) => {
              handleCloseBottomSheet();
              setBottomSheetOpened(false);
            },
          })}
          options={{
            tabBarLabel: "Cart",
            tabBarLabelStyle: ({ focused }) => {
              color: {
                focused ? "#008E97" : "black";
              }
            },
            headerShown: false,
            tabBarIcon: ({ focused }) => <CartIcon itemCount={cartlength} color={focused ? "#008E97" : "black"} />,
          }}
        />

        {/* Screen Menu */}
        <Tab.Screen
          name="Menu"
          component={Menu}
          listeners={() => ({
            tabPress: (e) => {
              handleCloseBottomSheet();
              setBottomSheetOpened(false);
            },
          })}
          options={{
            tabBarLabel: "Menu",
            tabBarLabelStyle: ({ focused }) => {
              color: {
                focused ? "#008E97" : "black";
              }
            },
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Feather
                name="menu"
                size={24}
                color={focused ? "#008E97" : "black"}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

/* Home Screen Component */
const Home = () => {
  return (
    <>
      <HomeStackNavigator />
      <BottomSheet
        ref={homeBottomSheetModalRef}
        enablePanDownToClose={true}
        index={-1}
        snapPoints={["25%", "48%"]}
        backgroundStyle={{
          borderRadius: 2,
          borderColor: "#959595",
          borderWidth: 1,
        }}
        keyboardBehavior={"extend"}
        handleIndicatorStyle={{
          height: 2,
          width: 60,
          backgroundColor: "black",
        }}
        animateOnMount={true}
        enabledInnerScrolling={false}
        onChange={(index) => {
          if (index === -1) {
            handleCloseBottomSheet();
            setBottomSheetOpened(false);
          }
        }}>
        <BottomSheetScrollView
          style={{ flex: 1, paddingHorizontal: 18, backgroundColor: "white" }}>
         <BottomSheetPaymentContent />
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  );
};

/* Profile Screen Component */
const Profile = () => {
  return (
    <>
      <ProfileStackNavigator />
      <BottomSheet
        ref={profileBottomSheetModalRef}
        enablePanDownToClose={true}
        index={-1}
        snapPoints={["25%", "48%"]}
        backgroundStyle={{
          borderRadius: 2,
          borderColor: "#959595",
          borderWidth: 1,
        }}
        keyboardBehavior={"extend"}
        handleIndicatorStyle={{
          height: 2,
          width: 60,
          backgroundColor: "black",
        }}
        animateOnMount={true}
        enabledInnerScrolling={false}
        onChange={(index) => {
          if (index === -1) {
            handleCloseBottomSheet();
            setBottomSheetOpened(false);
          }
        }}>
        <BottomSheetScrollView
          style={{ flex: 1, paddingHorizontal: 18, backgroundColor: "white" }}>
          <BottomSheetPaymentContent />
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  );
};

/* Cart Screen Component */
const Cart = () => {
  return (
    <>
      <CartScreen />
      <BottomSheet
        ref={cartBottomSheetModalRef}
        enablePanDownToClose={true}
        index={-1}
        snapPoints={["25%", "48%"]}
        backgroundStyle={{
          borderRadius: 2,
          borderColor: "#959595",
          borderWidth: 1,
        }}
        keyboardBehavior={"extend"}
        handleIndicatorStyle={{
          height: 2,
          width: 60,
          backgroundColor: "black",
        }}
        animateOnMount={true}
        enabledInnerScrolling={false}
        onChange={(index) => {
          if (index === -1) {
            handleCloseBottomSheet();
            setBottomSheetOpened(false);
          }
        }}>
        <BottomSheetScrollView
          style={{ flex: 1, paddingHorizontal: 18, backgroundColor: "white" }}>
          <BottomSheetPaymentContent />
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  );
};

/* Menu Screen Component */
const Menu = () => {
  return (
    <>
      <MenuScreen />
      <BottomSheet
        ref={menuBottomSheetModalRef}
        enablePanDownToClose={true}
        index={-1}
        snapPoints={["25%", "48%"]}
        backgroundStyle={{
          borderRadius: 2,
          borderColor: "#959595",
          borderWidth: 1,
        }}
        keyboardBehavior={"extend"}
        handleIndicatorStyle={{
          height: 2,
          width: 60,
          backgroundColor: "black",
        }}
        animateOnMount={true}
        enabledInnerScrolling={false}
        onChange={(index) => {
          if (index === -1) {
            handleCloseBottomSheet();
            setBottomSheetOpened(false);
          }
        }}>
        <BottomSheetScrollView
          style={{ flex: 1, paddingHorizontal: 18, backgroundColor: "white" }}>
          <BottomSheetPaymentContent />
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  );
};

export default memo(BottomTabNavigator);

const styles = StyleSheet.create({});
