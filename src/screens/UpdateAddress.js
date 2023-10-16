import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Pressable,
    ScrollView,
    TextInput,
    Modal,
    Alert,
    ActivityIndicator,
  } from "react-native";
  import React, { useCallback, useLayoutEffect, useMemo, useState, useContext} from "react";
  import { useNavigation } from "@react-navigation/native";
  
  /* Icons */
  import { MaterialIcons } from "@expo/vector-icons";
  import { Ionicons } from "@expo/vector-icons";
  import { Entypo } from "@expo/vector-icons";
  import { AntDesign } from "@expo/vector-icons";
  
  
  /* YUP and FORMIK for Form Validation */
  import * as Yup from "yup";
  import { Formik } from "formik";
  
  
  /* Others */
  import { LinearGradient } from "expo-linear-gradient";
  import axios from "axios"
  import AsyncStorage from "@react-native-async-storage/async-storage";


  /* components */
  import { ContextMain } from "../context/ContextMain";
  


  /* ************************************* MAIN COMPONENNT ********************************* */
  const UpdateAddress = ({route}) => {
    const navigation = useNavigation();
    const [openedStateDrop, setOpenedStateDrop] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {item, isDefault} =  route.params;
    const {
      setAddresses , setAddressDef, 
   } = useContext(ContextMain);
  
    /* header Setup */
    useLayoutEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, []);
  

    /* Yup Validation Schema Address */
    const addressSchema = useMemo(
      () =>
        Yup.object().shape({
          name: Yup.string()
            .matches(/^[a-zA-Z\s]*$/, "Please enter a valid name*")
            .min(3, "Please enter a valid name*")
            .required("Name field is required*"),
          mobile: Yup.string()
            .min(10, "Invalid mobile Number*")
            .max(10, "Invalid mobile Number*")
            .required("Mobile no. is required*"),
          building: Yup.string().required("Please enter an address*"),
          street: Yup.string().required("Please enter a address*"),
          landmark: Yup.string(),
          pincode: Yup.string()
            .matches(/^[0-9]/, "Please enter a ZIP or Postel code*")
            .min(6, "Should be length of 6*")
            .max(6, "Should be length of 6*")
            .required("Please enter a postal code*"),
          town_city: Yup.string().required("Please enter a city name*"),
          state: Yup.string().required(
            "Please enter a state, region, or province*"
          ),
          defaultaddress: Yup.boolean(),
        }),
      []
    );
  
  /* Api Calling to add address */
    const handleUpdateAddress = useCallback(async (data) => {
      setIsLoading(true)
      const authkey = await AsyncStorage.getItem("authtoken")
      const headers = {
          'Content-Type': 'application/json',
          'authkey':`${authkey}`
      }
  
      const address = {
          ...data,
          pincode: + data.pincode,
          mobile: + data.mobile,
          _id:item._id
      }

      const config = {
        headers: headers,
      }
  
      axios
      .patch("https://amazone-backend.vercel.app/api/userdata/updateaddress", {address}, config)
      .then((response) => {
          setIsLoading(false)
          Alert.alert(
              "Address Updated Successfully !!",
              "Follow me on GitHub @imvikashkk ",
          )
          setAddresses(response?.data?.data?.addresses);
          setAddressDef(response?.data?.data?.defaultaddress);
          navigation.goBack();
      })
      .catch((error) => {
          setIsLoading(false)
          if(error?.response){
              Alert.alert(
                  `${error?.response?.data?.statusmessage} !!`,
                  `${error?.response?.data?.message} !! `,
              )
          }else{
              Alert.alert("An error occurred while adding a new address !!",
                 "Please try again later.....")
          }
      });

    console.log(data)
    }, [])
  
    return (
      <>
        <StatusBar
          translucent
          backgroundColor={"transparent"}
          barStyle={"dark-content"}
        />
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#88dae0", "#98e1d6", "#9ee4d4"]}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              alignSelf: "flex-end",
              paddingTop: 30,
              paddingBottom: 20,
              paddingHorizontal: 8,
            }}>
            <Text style={{ alignSelf: "flex-end", textAlignVertical: "center" }}>
              CANCEL
            </Text>
          </Pressable>
        </LinearGradient>
  
        <ScrollView
          style={{
            backgroundColor: "white",
            flex: 1,
          }}
          automaticallyAdjustKeyboardInsets={true}
          >
          <Pressable style={{ paddingVertical: 16, paddingHorizontal: 10 }}>
            {/* Update address */}
            <Text style={{ fontSize: 18, fontWeight: "500" }}>
              Update address
            </Text>
  
            {/* Use current location */}
            <View
              style={{
                overflow: "hidden",
                borderRadius: 8,
                backgroundColor: "#e2e2e2",
                borderWidth: 0.4,
                borderColor: "gray",
                marginTop: 30,
              }}>
              <Text
                style={{
                  elevation: 10,
                  paddingVertical: 13,
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: "400",
                }}>
                Use current location
              </Text>
            </View>
  
            {/* OR */}
            <View style={{ marginTop: 25 }}>
              <Text
                style={{
                  height: 2.5,
                  backgroundColor: "#e2e2e2",
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  backgroundColor: "#e2e2e2",
                  width: 32,
                  alignSelf: "center",
                  textAlign: "center",
                  marginTop: -12,
                  color: "#565656",
                }}>
                OR
              </Text>
            </View>
  
            {/* Country India */}
            <View
              style={{
                borderRadius: 8,
                backgroundColor: "#e2e2e2",
                borderWidth: 0.4,
                borderColor: "gray",
                marginTop: 30,
                paddingVertical: 13,
                flexDirection: "row",
                paddingHorizontal: 20,
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: "400",
                }}>
                India
              </Text>
              <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
            </View>
  
            {/* Formik */}
            <Formik
              initialValues={{
                name: item.name,
                mobile: ""+item.mobile,
                building: item.building,
                street: item.street,
                landmark: item.landmark,
                pincode: ""+item.pincode,
                town_city: item.town_city,
                state: item.state,
                defaultaddress: isDefault,
              }}
              validationSchema={addressSchema}
              onSubmit={(data) => handleUpdateAddress(data)}>
              {({
                values,
                errors,
                touched,
                handleChange,
                setFieldValue,
                handleSubmit,
                handleReset,
                handleBlur,
                isValid,
              }) => {
                return (
                  <>
                    <View>
                      {/* Full name */}
                      <View style={{ marginTop: 45 }}>
                        <Text style={{ fontSize: 15, fontWeight: "500" }}>
                          {"Full name (First and Last name)"}
                        </Text>
                        <TextInput
                          value={values.name}
                          onChangeText={handleChange("name")}
                          onBlur={handleBlur("name")}
                          style={{
                            color: "#3f3f3f",
                            marginVertical: 10,
                            fontSize: 16,
                            fontWeight: "500",
                            paddingVertical: 10,
                            borderRadius: 3,
                            paddingHorizontal: 10,
                            borderWidth: errors.name && touched.name ? 2 : 1,
                            borderColor: errors.name && touched.name && "#d20404",
                          }}
                          autoCapitalize="none"
                          placeholder="eg. Vikash Kumar Khunte"
                          placeholderTextColor={"gray"}
                          autoFocus={true}
                        />
                      </View>
                      {errors.name && touched.name && (
                        <View
                          style={{
                            flexDirection: "row",
                            gap: 10,
                            alignItems: "center",
                          }}>
                          <AntDesign
                            name="exclamationcircle"
                            size={20}
                            color="#d20404"
                          />
                          <Text
                            style={{
                              color: "#d20404",
                              fontSize: 15,
                              fontWeight: "500",
                            }}>
                            {errors.name}
                          </Text>
                        </View>
                      )}
  
                      {/*  Mobile Number */}
                      <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 15, fontWeight: "500" }}>
                          Mobile number
                        </Text>
                        <TextInput
                          value={values.mobile}
                          onChangeText={handleChange("mobile")}
                          onBlur={handleBlur("mobile")}
                          style={{
                            color: "#3f3f3f",
                            marginVertical: 10,
                            fontSize: 16,
                            fontWeight: "500",
                            paddingVertical: 10,
                            borderWidth: errors.mobile && touched.mobile ? 2 : 1,
                            borderColor:
                              errors.mobile && touched.mobile && "#d20404",
                            borderRadius: 3,
                            paddingHorizontal: 10,
                          }}
                          placeholder="eg. 7566634500"
                          placeholderTextColor={"gray"}
                          keyboardType="numeric"
                          maxLength={10}
  
                        />
                        <Text
                          style={{ marginLeft: 5, marginTop: -5, fontSize: 12 }}>
                          May be used to assist delivery
                        </Text>
                      </View>
                      {errors.mobile && touched.mobile && (
                        <View
                          style={{
                            flexDirection: "row",
                            gap: 10,
                            alignItems: "center",
                          }}>
                          <AntDesign
                            name="exclamationcircle"
                            size={20}
                            color="#d20404"
                          />
                          <Text
                            style={{
                              color: "#d20404",
                              fontSize: 15,
                              fontWeight: "500",
                            }}>
                            {errors.mobile}
                          </Text>
                        </View>
                      )}
  
                      {/* Flat, He no., Building, Company, Apartmen */}
                      <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 15, fontWeight: "500" }}>
                          Flat, House no. Building, Company, Apartment
                        </Text>
                        <TextInput
                          value={values.building}
                          onChangeText={handleChange("building")}
                          onBlur={handleBlur("building")}
                          style={{
                            color: "#3f3f3f",
                            marginVertical: 10,
                            fontSize: 16,
                            fontWeight: "500",
                            paddingVertical: 10,
                            borderWidth:
                              errors.building && touched.building ? 2 : 1,
                            borderColor:
                              errors.building && touched.building && "#d20404",
                            borderRadius: 3,
                            paddingHorizontal: 10,
                          }}
                          autoCapitalize="none"
                          placeholder="eg. Ground Floor Room No. 8 Sengar Niwas"
                          placeholderTextColor={"gray"}
                        />
                      </View>
                      {errors.building && touched.building && (
                        <View
                          style={{
                            flexDirection: "row",
                            gap: 10,
                            alignItems: "center",
                          }}>
                          <AntDesign
                            name="exclamationcircle"
                            size={20}
                            color="#d20404"
                          />
                          <Text
                            style={{
                              color: "#d20404",
                              fontSize: 15,
                              fontWeight: "500",
                            }}>
                            {errors.building}
                          </Text>
                        </View>
                      )}
  
                      {/* Area, street, Sector, village */}
                      <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 15, fontWeight: "500" }}>
                          Area, street, Sector, Village
                        </Text>
                        <TextInput
                          value={values.street}
                          onChangeText={handleChange("street")}
                          onBlur={handleBlur("street")}
                          style={{
                            color: "#3f3f3f",
                            marginVertical: 10,
                            fontSize: 16,
                            fontWeight: "500",
                            paddingVertical: 10,
                            borderWidth: errors.street && touched.street ? 2 : 1,
                            borderColor:
                              errors.street && touched.street && "#d20404",
                            borderRadius: 3,
                            paddingHorizontal: 10,
                          }}
                          autoCapitalize="none"
                          placeholder="eg. Mukut Nagar"
                          placeholderTextColor={"gray"}
                        />
                      </View>
                      {errors.street && touched.street && (
                        <View
                          style={{
                            flexDirection: "row",
                            gap: 10,
                            alignItems: "center",
                          }}>
                          <AntDesign
                            name="exclamationcircle"
                            size={20}
                            color="#d20404"
                          />
                          <Text
                            style={{
                              color: "#d20404",
                              fontSize: 15,
                              fontWeight: "500",
                            }}>
                            {errors.street}
                          </Text>
                        </View>
                      )}
  
                      {/* Landmark */}
                      <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 15, fontWeight: "500" }}>
                          Landmark{" "}
                        </Text>
                        <TextInput
                          value={values.landmark}
                          onChangeText={handleChange("landmark")}
                          onBlur={handleBlur("landmark")}
                          style={{
                            color: "#3f3f3f",
                            marginVertical: 10,
                            fontSize: 16,
                            fontWeight: "500",
                            paddingVertical: 10,
                            borderWidth: 1,
                            borderRadius: 3,
                            paddingHorizontal: 10,
                          }}
                          autoCapitalize="none"
                          placeholder="eg. Near Raipur Naka Y Bridge"
                          placeholderTextColor={"gray"}
                        />
                      </View>
  
                      {/* Pincode */}
                      <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 15, fontWeight: "500" }}>
                          Pincode{" "}
                        </Text>
                        <TextInput
                          value={values.pincode}
                          onChangeText={handleChange("pincode")}
                          onBlur={handleBlur("pincode")}
                          style={{
                            color: "#3f3f3f",
                            marginVertical: 10,
                            fontSize: 16,
                            fontWeight: "500",
                            paddingVertical: 10,
                            borderWidth:
                              errors.pincode && touched.pincode ? 2 : 1,
                            borderColor:
                              errors.pincode && touched.pincode && "#d20404",
                            borderRadius: 3,
                            paddingHorizontal: 10,
                          }}
                          autoCapitalize="none"
                          placeholder="eg. 491001"
                          placeholderTextColor={"gray"}
                          keyboardType="numeric"
                          maxLength={6}
                        />
                      </View>
                      {errors.pincode && touched.pincode && (
                        <View
                          style={{
                            flexDirection: "row",
                            gap: 10,
                            alignItems: "center",
                          }}>
                          <AntDesign
                            name="exclamationcircle"
                            size={20}
                            color="#d20404"
                          />
                          <Text
                            style={{
                              color: "#d20404",
                              fontSize: 15,
                              fontWeight: "500",
                            }}>
                            {errors.pincode}
                          </Text>
                        </View>
                      )}
  
                      {/* Town/City */}
                      <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 15, fontWeight: "500" }}>
                          Town/City{" "}
                        </Text>
                        <TextInput
                          value={values.town_city}
                          onChangeText={handleChange("town_city")}
                          onBlur={handleBlur("town_city")}
                          style={{
                            color: "#3f3f3f",
                            marginVertical: 10,
                            fontSize: 16,
                            fontWeight: "500",
                            paddingVertical: 10,
                            borderWidth:
                              errors.town_city && touched.town_city ? 2 : 1,
                            borderColor:
                              errors.town_city && touched.town_city && "#d20404",
                            borderRadius: 3,
                            paddingHorizontal: 10,
                          }}
                          autoCapitalize="none"
                          placeholder="eg. Durg"
                          placeholderTextColor={"gray"}
                        />
                      </View>
                      {errors.town_city && touched.town_city && (
                        <View
                          style={{
                            flexDirection: "row",
                            gap: 10,
                            alignItems: "center",
                          }}>
                          <AntDesign
                            name="exclamationcircle"
                            size={20}
                            color="#d20404"
                          />
                          <Text
                            style={{
                              color: "#d20404",
                              fontSize: 15,
                              fontWeight: "500",
                            }}>
                            {errors.town_city}
                          </Text>
                        </View>
                      )}
  
                      {/* State */}
                      <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 15, fontWeight: "500" }}>
                          State{" "}
                        </Text>
                        <Pressable
                          onPress={() => {setOpenedStateDrop(true);}}
                          style={{
                            marginVertical: 10,
                            borderRadius: 3,
                            backgroundColor: "#e2e2e2",
                            borderWidth: 0.5,
                            borderColor: "gray",
                            paddingVertical: 13,
                            flexDirection: "row",
                            paddingHorizontal: 20,
                            justifyContent: "space-between",
                            alignItems: "center",
                            elevation: errors.state && 5,
                            shadowColor: errors.state && "red",
                          }}>
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 15,
                              fontWeight: "400",
                              paddingHorizontal: 20,
                            }}>
                            {values.state === "" ? "Select State" : values.state}
                          </Text>
                          <MaterialIcons
                            name="keyboard-arrow-down"
                            size={24}
                            color="black"
                          />
                        </Pressable>
                      </View>
                      {errors.state && touched.state && (
                        <View
                          style={{
                            flexDirection: "row",
                            gap: 10,
                            alignItems: "center",
                          }}>
                          <AntDesign
                            name="exclamationcircle"
                            size={20}
                            color="#d20404"
                          />
                          <Text
                            style={{
                              color: "#d20404",
                              fontSize: 15,
                              fontWeight: "500",
                            }}>
                            Please enter a state, region or province
                          </Text>
                        </View>
                      )}
  
                      {/* Make This My default address checkbox */}
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 10,
                          alignItems: "center",
                          marginTop: 30,
                        }}>
                        <Pressable
                          onPress={() =>
                            setFieldValue(
                              "defaultaddress",
                              !values.defaultaddress
                            )
                          }
                          style={[
                            {
                              height: 22,
                              width: 22,
                              borderWidth: 0.8,
                              borderRadius: 3,
                              justifyContent: "center",
                              alignItems: "center",
                            },
                            values.defaultaddress && {
                              backgroundColor: "#038998",
                              elevation: 10,
                              shadowColor: "#0076c5",
                            },
                          ]}>
                          <Ionicons
                            name="checkmark-sharp"
                            size={22}
                            color="#ffffff"
                            style={{
                              marginTop: -2,
                              display: values.defaultaddress ? "flex" : "none",
                            }}
                          />
                        </Pressable>
                        <Text style={{ fontSize: 15, fontWeight: "400" }}>
                          Make this my default address
                        </Text>
                      </View>
  
                      {/* Update Address button */}
                      <Pressable
                        onPress={handleSubmit}
                        style={{
                          marginTop: 30,
                          backgroundColor: "#fff707",
                          borderRadius: 6,
                          padding: 15,
                          opacity: 1,
                        }}>
                        <Text
                          style={{
                            textAlign: "center",
                            color: "#000000",
                            fontSize: 16,
                            fontWeight: "400",
                          }}>
                          Update address
                        </Text>
                      </Pressable>
                    </View>
  
                    {/* Modal for State */}
                    <Modal
                      transparent
                      animationType="slide"
                      visible={openedStateDrop}>
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: "rgba(136, 136, 136, 0.6)",
                          marginTop: 45,
                          paddingHorizontal: 50,
                          paddingBottom: 60,
                        }}>
                        <View
                          style={{
                            backgroundColor: "white",
                            marginVertical: 60,
                            borderRadius: 10,
                            overflow: "hidden",
                            elevation: 5,
                          }}>
                          <Pressable
                            onPress={() => {
                              setOpenedStateDrop(false);
                            }}
                            style={{
                              paddingHorizontal: 10,
                              paddingVertical: 18,
                              backgroundColor: "#e8e8e8",
                            }}>
                            <Entypo
                              name="cross"
                              size={24}
                              color="black"
                              style={{ alignSelf: "flex-end" }}
                            />
                          </Pressable>
                          <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ backgroundColor: "white" }}>
                              {states.map((state, index) => {
                                return (
                                  <Pressable
                                    key={index}
                                    style={{ borderBottomWidth: 0.2 }}
                                    onPress={() => {
                                      handleChange("state")(state);
                                      setOpenedStateDrop(false);
                                    }}>
                                    <Text
                                      style={{
                                        paddingVertical: 16,
                                        paddingHorizontal: 20,
                                        textAlign: "center",
                                        fontSize: 15,
                                        backgroundColor:
                                          values.state === state
                                            ? "#e0e0e0"
                                            : "transparent",
                                      }}>
                                      {state}
                                    </Text>
                                  </Pressable>
                                );
                              })}
                            </View>
                          </ScrollView>
                        </View>
                      </View>
                    </Modal>
                  </>
                );
              }}
            </Formik>
  
  
          </Pressable>
        </ScrollView>
          
  
          {/* Loader  */}
        <Modal visible={isLoading} transparent style={{ flex: 1 }}>
            <View
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                flex: 1,
                paddingTop: 300,
                marginTop: 45,
              }}>
              <ActivityIndicator size={50} />
            </View>
          </Modal>
  
      </>
    );
  };
  
  export default UpdateAddress;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingTop: StatusBar.currentHeight,
      backgroundColor: "#ecf0f1",
      padding: 8,
    },
    item: {
      margin: 24,
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
    },
  });
  
  const states = [
    "ANDHRA PRADESH",
    "ARUNACHAL PRADESH",
    "ASSAM",
    "BIHAR",
    "CHANDIGARH",
    "CHHATISGARH",
    "DADRA AND NAGAR HAVELI AND DAMAN AND DIU",
    "DELHI",
    "GUJRAT",
    "HARYANA",
    "HIMACHAL PRADESH",
    "JAMMU & KASHMIR",
    "JHARKHAND",
    "KARNATAKA",
    "KERALA",
    "LADAKH",
    "LAKSHADWEEP",
    "MADHYA PRADESH",
    "MAHARASTRA",
    "MANIPUR",
    "MEGHALAYA",
    "MIZORAM",
    "NAGALAND",
    "ODISHA",
    "PUDUCHERRY",
    "PUNJAB",
    "RAJASTHAN",
    "SIKKIM",
    "TAMIL NADU",
    "TELANGANA",
    "TRIPURA",
    "UTTAR PRADESH",
    "UTTRAKHAND",
    "WEST BENGAL",
  ];
  