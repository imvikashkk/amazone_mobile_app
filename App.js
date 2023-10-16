import { StyleSheet, Text, View, Dimensions, Modal } from "react-native";
import Navigation from "./src/navigation/Navigation";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [isInternetConnected, setIsInternetConnected] = useState(false);
  const screenWidth = Dimensions.get("window").width;

  /* To Check Internet Connection */
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      // console.log("Connection type", state.type);
      // console.log("Is connected?", state.isConnected);
      setIsInternetConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          {
            <View style={{ flex: 1 }}>

              {/* Navigation from App */}
              <Navigation />

              {/* Modal if no internet */}
              {!isInternetConnected && (
                <Modal transparent>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "rgba(255, 255, 255, 0.6)",
                    }}>
                    <Text
                      style={{
                        position: "absolute",
                        bottom: 0,
                        backgroundColor: "black",
                        color: "white",
                        padding: 0.5,
                        width: screenWidth,
                        textAlign: "center",
                        zIndex: 100,
                      }}>
                      NoInternet
                    </Text>
                  </View>
                </Modal>
              )}
            </View>
          }
        </Provider>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({});
