import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Proceding from "./Proceding";
import { ContextMain } from "../context/ContextMain";
import { useNavigation } from "@react-navigation/native";
import ProceedingStep1Address from "./ProceedingStep1Address";
import Payment from "./Payment";
import PlaceOrder from "./PlaceOrder";

const ProceedToBuy = ({ route }) => {
  const { subtotal, item, plateform } = route?.params;
  const { addressDef, addresses } = useContext(ContextMain);
  const [deliveryAdd, setDeliveryAdd] = useState(addressDef);
  const navigation = useNavigation();
  const [step, setStep] = useState(1);

  console.log(item);

  return (
    <>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#92d7dc", "#68ffd4"]}
        style={{ padding: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingTop: StatusBar.currentHeight,
          }}>
          <Text onPress={() => navigation.goBack()}>CANCEL</Text>
        </View>
      </LinearGradient>
      <Proceding step={step} setStep={setStep} />
      <Text
        style={{
          borderTopColor: "#cdcccc",
          borderTopWidth: 5,
          marginBottom: -20,
        }}
      />
      <ScrollView style={{ flex: 1, backgroundColor: "#f7f5f5" }}>
        {step === 1 && (
          <ProceedingStep1Address
            step={step}
            setStep={setStep}
            deliveryAdd={deliveryAdd}
            setDeliveryAdd={setDeliveryAdd}
            addressDef={addressDef}
            addresses={addresses}
          />
        )}

        {step === 3 && <Payment setStep={setStep} />}
        {step=== 4 && <PlaceOrder subtotal={subtotal} item={item} plateform={plateform} deliveryAdd={deliveryAdd} />}
      </ScrollView>
    </>
  );
};

export default ProceedToBuy;

const styles = StyleSheet.create({});
