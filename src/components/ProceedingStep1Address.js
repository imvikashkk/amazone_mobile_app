import { StyleSheet, Text, View, Pressable } from "react-native";
import React, {memo, useContext} from "react";
import { useNavigation } from "@react-navigation/native";
import { ContextMain } from "../context/ContextMain";
import { AntDesign } from "@expo/vector-icons";

const ProceedingStep1Address = ({step, setStep, deliveryAdd, setDeliveryAdd, addressDef, addresses}) => {
    const navigation = useNavigation();
  return (
    <View
      style={{
        marginLeft: 20,
        marginRight: 20,
        marginVertical: 10,
        marginBottom: 50,
      }}>
      <Text style={{ fontSize: 22, fontWeight: "500" }}>
        Select a delivery address
      </Text>

      <View
        style={{
          padding: 10,
          backgroundColor: "white",
          borderRadius: 10,
          elevation: 5,
          borderWidth: 0.5,
          borderColor: "#a0a0a0",
          marginTop: 20,
        }}>
        {addresses?.map((item, index) => {
          const isDefault = item._id === addressDef._id;
          return (
            <Pressable key={index} onPress={() => setDeliveryAdd(item)}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 15,
                  alignItems: "center",
                }}>
                {/* Left */}
                <View
                  style={{
                    height: 24,
                    width: 24,
                    borderWidth: 1,
                    borderRadius: 12,
                    elevation: deliveryAdd._id === item._id ? 5 : 0,
                    shadowColor:
                      deliveryAdd._id === item._id ? "#005334" : "transparent",
                  }}>
                  {deliveryAdd._id === item._id && (
                    <View
                      style={{
                        backgroundColor: "#005334",
                        height: "100%",
                        width: "100%",
                        borderRadius: 12,
                        justifyContent: "center",
                        alignItems: "center",
                        elevation: 5,
                      }}>
                      <Text
                        style={{
                          height: 8,
                          width: 8,
                          borderRadius: 4,
                          backgroundColor: "white",
                        }}
                      />
                    </View>
                  )}
                </View>

                {/* Right */}
                <View>
                  <Text style={{ fontSize: 17, fontWeight: "500" }}>
                    {item?.name}
                  </Text>
                  <Text style={{ fontSize: 15 }}>{item?.building}</Text>
                  <Text style={{ fontSize: 15 }}>{item?.street}</Text>
                  <Text style={{ fontSize: 15 }}>{item?.landmark}</Text>
                  <Text style={{ fontSize: 15 }}>
                    {item?.town_city}, {item?.state}, {item?.pincode}
                  </Text>
                  <Text style={{ fontSize: 15 }}>India</Text>
                  <Text style={{ fontSize: 15 }}>
                    Phone Number: {item?.mobile}
                  </Text>
                </View>
              </View>

              {/* delivery address */}
              {deliveryAdd._id === item._id && (
                <View style={{ marginTop: 20, marginHorizontal: 5 }}>
                  <Pressable
                    onPress={() => setStep(3)}
                    style={{
                      width: "100%",
                      height: 45,
                      backgroundColor: "#FEBE10",
                      borderRadius: 6,
                      justifyContent: "center",
                    }}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#000000",
                        fontSize: 16,
                      }}>
                      Deliver to this address
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() =>
                      navigation.navigate("UpdateAddress", { item, isDefault })
                    }
                    style={{
                      marginTop: 20,
                      width: "100%",
                      height: 35,
                      borderWidth: 0.4,
                      borderRadius: 6,
                      justifyContent: "center",
                    }}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#000000",
                        fontSize: 14,
                      }}>
                      Edit address
                    </Text>
                  </Pressable>

                  <Pressable
                    style={{
                      marginTop: 10,
                      width: "100%",
                      height: 35,
                      borderWidth: 0.4,
                      borderRadius: 6,
                      justifyContent: "center",
                    }}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#000000",
                        fontSize: 14,
                      }}>
                      Add delivery instructions
                    </Text>
                  </Pressable>
                </View>
              )}

              {index !== addresses.length - 1 && (
                <Text
                  style={{
                    borderBottomWidth: 1,
                    margin: -10,
                    borderBottomColor: "#bcbcbc",
                    marginTop: 1,
                    marginBottom: 10,
                  }}
                />
              )}
            </Pressable>
          );
        })}
      </View>

      <Pressable
        onPress={() => navigation.navigate("AddANewAddress")}
        style={{
          height: 50,
          padding: 10,
          flexDirection: "row",
          borderTopWidth: 0.5,
          borderBottomWidth: 0.6,
          justifyContent: "space-between",
          backgroundColor: "white",
          alignItems: "center",
        }}>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          Add a New Address
        </Text>
        <AntDesign name="right" size={20} color="black" />
      </Pressable>
      <View
        style={{
          height: 50,
          padding: 10,
          flexDirection: "row",
          borderBottomWidth: 0.6,
          justifyContent: "space-between",
          backgroundColor: "white",
          alignItems: "center",
        }}>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          Find a picku location nar you
        </Text>
        <AntDesign name="right" size={20} color="black" />
      </View>
      <View
        style={{
          height: 50,
          padding: 10,
          flexDirection: "row",
          borderBottomWidth: 0.6,
          justifyContent: "space-between",
          backgroundColor: "white",
          alignItems: "center",
        }}>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          Deliver to multiple addresses
        </Text>
        <AntDesign name="right" size={20} color="black" />
      </View>
    </View>
  );
};

export default ProceedingStep1Address;

const styles = StyleSheet.create({});
