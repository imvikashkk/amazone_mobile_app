import { StyleSheet, Dimensions } from "react-native";
import React, { createContext, useRef, useState, useEffect } from "react";

/* Dependecies Import */
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

/* Components Import */
import LocationAndAddress from "../components/LocationAndAddress";

/* Screen Width */
const screenWidth = Dimensions.get("window").width;

/* Create Context */
const ContextMain = createContext();

/* ************************************************ MAIN COMPONENT *********************************************** */
const ContextMainProvider = ({ children }) => {
  const [bottomSheetOpened, setBottomSheetOpened] = useState(false);

  /* for address component */
  const [addressDef, setAddressDef] = useState(); // default address
  const [addresses, setAddresses] = useState(); // all addresses
  const [orders, setOrders] = useState([]); // all orders


  /* Reference */
  const bottomSheetModalRef = useRef(null);

  /* handle BottomSheet Open */
  const handlePresentModal = (index) => {
    bottomSheetModalRef.current?.snapToIndex(1);
  };

  /* handle Close BottomSheet */
  const handleCloseModal = () => {
    bottomSheetModalRef?.current?.close();
  };

  useEffect(() => {
    handleCloseModal();
  }, []);

  const snapPoints = ["25%", "50%"];

  return (
    <ContextMain.Provider
      value={{
        handleCloseModal,
        handlePresentModal,
        bottomSheetOpened,
        setBottomSheetOpened,
        addressDef,
        setAddressDef,
        addresses,
        setAddresses,
        orders, 
        setOrders
      }}>
      {/* Wrapping The Children  */}
      {children}

      {/* BottomSheet For Address */}
      <BottomSheet
        ref={bottomSheetModalRef}
        index={-1}
        enablePanDownToClose={true}
        snapPoints={snapPoints}
        backgroundStyle={{
          borderRadius: 20,
          borderColor: "#d2d2d2",
          borderWidth: 1,
          width: screenWidth,
        }}
        keyboardBehavior={"extend"}
        handleIndicatorStyle={{
          height: 0.5,
          width: 60,
          backgroundColor: "#bdbdbd",
        }}
        animateOnMount={true}
        enabledInnerScrolling={true}
        onChange={(index) => {
          if (index === -1) {
            setBottomSheetOpened(false);
          }
        }}>
        <BottomSheetScrollView
          style={{ flex: 1, paddingHorizontal: 18, backgroundColor: "white" }}>
      
            <LocationAndAddress
              handleCloseModal={handleCloseModal}
              addressDef={addressDef}
              setAddressDef={setAddressDef}
              addresses={addresses}
              setAddresses={setAddresses}
            />
        </BottomSheetScrollView>
      </BottomSheet>
    </ContextMain.Provider>
  );
};

export default ContextMainProvider;
export { ContextMain };

const styles = StyleSheet.create({});
