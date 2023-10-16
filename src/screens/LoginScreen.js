import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
  Keyboard,
  Dimensions,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef, useMemo, useCallback, memo } from "react";
import { useNavigation } from "@react-navigation/native";

import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";

import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import ForgotPassword from "../components/ForgotPassword";

const LoginScreen = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;
  const [isLoading, setIsLoading] = useState(false);
  const [resendVerLink, setResendVerLink] = useState(false);

  /* Resend Verification Token */
  const resendVerificationLink = useCallback((email) => {
    axios
      .post("https://amazone-backend.vercel.app/api/user/auth/verify/resendtoken", email)
      .then((response) => {
        if (response?.status === 204) {
          Alert.alert("No Content !!", "User Already Verified !! ");
        } else {
          // 200
          Alert.alert(
            "Verification link sent successfully!!",
            "Please verify your email which is sent to your email. Please follow me on GitHub @imvikashkk "
          );
        }

        setResendVerLink(false);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error?.response) {
          if (error?.response?.status === 400) {
            Alert.alert(
              "Bad Request !!",
              "Required body elements are missing !!"
            );
          } else if (error?.response?.status === 404) {
            Alert.alert(
              "Entered email is not registered !!",
              "Please register your email. Do you want to register ??",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Yes",
                  onPress: () => {
                    setResendVerLink(false);
                    navigation.navigate("RegisterScreen");
                  },
                },
              ]
            );
          } else if (error?.response?.status === 500) {
            Alert.alert("Internal Server Error !!", "Please try again later");
          }
        } else {
          Alert.alert(
            "An error occurred while Loging In !!",
            "Please try again later !!"
          );
        }
      });
  }, []);

  /* Handle Login */
  const handleLogin = useCallback(({ email, password }) => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("https://amazone-backend.vercel.app/api/user/auth/login", user)
      .then(async (response) => {
        // console.log(response.data);
        setIsLoading(false);
        if (response.status === 202) {
          Alert.alert(
            "User is not verified !!",
            "Please verify your email which is sent to your email. Do you want to send again ? ",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Yes",
                onPress: () => {
                  setResendVerLink(true);
                },
              },
            ]
          );
        } else if (response.status === 200) {
          Alert.alert(
            "You are successfully logged in !!",
            "Please follow me on GitHub @imvikashkk"
          );
          await AsyncStorage.setItem("authtoken", response?.data?.data?.token);
          await AsyncStorage.setItem(
            "userinfo",
            JSON.stringify({ name: response?.data?.data?.name })
          );
          navigation.replace("Main");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error?.response) {
          console.log(error?.response);
          if (error.response.status === 400) {
            Alert.alert("Bad Request", "Required body elements are missing !!");
          } else if (error.response.status === 404) {
            Alert.alert(
              "Email Address is not Registered !!",
              "Please Register...."
            );
          } else if (error.response.status === 401) {
            Alert.alert(
              "Email and Password did not match.",
              "Please try again...."
            );
          } else if (error.response.status === 500) {
            Alert.alert("Sorry.......", "Internal Server Error");
          } else {
            console.log(error);
            Alert.alert(
              "An error occurred while logging in.",
              "Please try again"
            );
          }
        } else {
          Alert.alert(
            "An error occurred while logging in.",
            "Please try again"
          );
        }
      });
  }, []);

  /* Yup Validation Schema Login Screen */
  const loginSchema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string()
          .required("Email Address is required*")
          .email("Please enter a valid email address*"),
        password: Yup.string()
          .min(8, "Should be min of 4 characters*")
          .required("Password is required*"),
      }),
    []
  );

  /* Yup Validation Schema Resent Verification Token */
  const resendVTSchema = useMemo(() =>
    Yup.object().shape({
      email: Yup.string()
        .required("Email Address is required*")
        .email("Please enter a valid email address*"),
    })
  );

  /* BottomSheetModal Ref */
  const bottomSheetModalRef = useRef(null);

  /* BottomSheetModal Open Function */
  const handlePresentModal = () => {
    bottomSheetModalRef.current?.snapToIndex(2);
  };

  /* BottomSheetModal Open Function */
  const handleCloseModal = () => {
    bottomSheetModalRef?.current?.close();
  };

  return (
    <>
      {
        //! ****************** Login  **************
      }
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          paddingHorizontal: 50,
        }}
        onPress={() => Keyboard.dismiss()}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(data) => {
            handleLogin(data);
            setIsLoading(true);
          }}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            handleReset,
            handleBlur,
            isValid,
          }) => {
            return (
              <>
                {/* Logo Image */}
                <View>
                  <Image
                    style={{ width: 200, height: 200, marginTop: 1 }}
                    source={require("../../assets/logo.png")}
                  />
                </View>

                {/* Login Form */}
                <KeyboardAvoidingView enabled={true} behavior="padding">
                  {/* Login To Your Account Text */}
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        marginTop: -40,
                        color: "#041E42",
                      }}>
                      Login In to your Account
                    </Text>
                  </View>

                  {/* Enter Email Address */}
                  <View style={{ marginTop: 20 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        backgroundColor: "#D0D0D0",
                        paddingVertical: 3,
                        borderRadius: 8,
                        marginTop: 30,
                        width: (screenWidth / 20) * 17,
                        alignSelf: "center",
                      }}>
                      <MaterialIcons
                        style={{ marginLeft: 8 }}
                        name="email"
                        size={32}
                        color={"gray"}
                      />

                      <TextInput
                        value={values.email}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        style={{
                          color: "#3f3f3f",
                          marginVertical: 10,
                          width: (screenWidth / 20) * 17 - 40,
                          fontSize: values.email ? 19 : 17,
                          paddingRight: 10,
                          fontWeight: "500",
                        }}
                        autoCapitalize="none"
                        placeholder="Enter Your Email"
                        placeholderTextColor={"gray"}
                        keyboardType="email-address"
                      />
                    </View>
                    {touched.email && errors.email && (
                      <Text style={{ color: "red", fontWeight: "500" }}>
                        {errors.email}
                      </Text>
                    )}
                  </View>

                  {/* Enter Your Password */}
                  <View style={{ marginTop: 2 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        backgroundColor: "#D0D0D0",
                        paddingVertical: 3,
                        borderRadius: 8,
                        marginTop: 30,
                        width: (screenWidth / 20) * 17,
                      }}>
                      <TouchableOpacity
                        onPress={() => setHidePassword(!hidePassword)}
                        style={{ marginLeft: 8 }}>
                        <AntDesign
                          name={hidePassword ? "lock1" : "unlock"}
                          size={32}
                          color={"gray"}
                        />
                      </TouchableOpacity>

                      <TextInput
                        value={values.password}
                        onChangeText={handleChange("password")}
                        secureTextEntry={hidePassword}
                        onBlur={handleBlur("password")}
                        style={{
                          color: "#3f3f3f",
                          marginVertical: 10,
                          width: (screenWidth / 20) * 17 - 40,
                          fontSize: values.password ? 19 : 17,
                          paddingRight: 10,
                          fontWeight: "500",
                        }}
                        placeholder="Enter Your Password"
                        placeholderTextColor={"gray"}
                        autoCapitalize="none"
                      />
                    </View>
                    {touched.password && errors.password && (
                      <Text style={{ color: "red", fontWeight: "500" }}>
                        {errors.password}
                      </Text>
                    )}
                  </View>

                  {/* Resend Verification LInk & Forgot Password */}
                  <View
                    style={{
                      marginTop: 12,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                    <TouchableOpacity onPress={() => setResendVerLink(true)}>
                      <Text style={{ color: "#007FFF", fontWeight: "500" }}>
                        Resend Verification Link
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handlePresentModal}>
                      <Text style={{ color: "#007FFF", fontWeight: "500" }}>
                        Forgot Password
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Login Button */}
                  <Pressable
                    disabled={!isValid}
                    onPress={handleSubmit}
                    style={{
                      width: 200,
                      backgroundColor: "#FEBE10",
                      borderRadius: 6,
                      marginLeft: "auto",
                      marginRight: "auto",
                      padding: 15,
                      opacity: isValid ? 1 : 0.6,
                      marginTop: 80,
                    }}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}>
                      Login
                    </Text>
                  </Pressable>

                  {/* Jump To Sign Up Screen */}
                  <Pressable
                    onPress={() => navigation.navigate("RegisterScreen")}
                    style={{ marginTop: 15 }}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "gray",
                        fontSize: 16,
                      }}>
                      Don't have an account? Sign Up
                    </Text>
                  </Pressable>
                </KeyboardAvoidingView>
              </>
            );
          }}
        </Formik>
      </Pressable>

      {
        //! ****************** Activity Indicator   **************
      }

        <Modal visible={isLoading} transparent style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              flex: 1,
              paddingTop: 300,
            }}>
            <ActivityIndicator size={50} />
          </View>
        </Modal>
    
      {
        //! ****************** Resend Verification Token   **************
      }
        <Modal visible={resendVerLink} animationType="slide" transparent style={{ flex: 1 }}>
          <Pressable
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => Keyboard.dismiss()}>
            <Formik
              initialValues={{ email: "" }}
              validationSchema={resendVTSchema}
              onSubmit={(data) => {
                resendVerificationLink(data);
                setIsLoading(true);
              }}>
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                handleBlur,
                isValid,
              }) => {
                return (
                  <View
                    style={{
                      backgroundColor: "#ffffff",
                      padding: 20,
                      shadowColor: "#000000",
                      elevation: 10,
                      borderRadius: 10,
                      maxWidth: (screenWidth / 4) * 3,
                    }}>
                    <Text
                      onPress={() => setResendVerLink(false)}
                      style={{
                        alignSelf: "flex-end",
                        fontSize: 20,
                        marginTop: -10,
                        marginRight: -10,
                        color: "gray",
                      }}>
                      X
                    </Text>

                    <Text style={{ fontSize: 18, marginBottom: 10 }}>
                      Enter Your Email Address :
                    </Text>

                    <View style={{ flexDirection: "row" }}>
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: "gray",
                          borderRadius: 3,
                        }}>
                        <MaterialIcons
                          style={{}}
                          name="email"
                          size={32}
                          color={"#978c5a"}
                        />
                      </View>
                      <TextInput
                        value={values.email}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        style={{
                          width: "85%",
                          borderWidth: 1,
                          borderColor: "gray",
                          borderRadius: 3,
                          paddingVertical: -10,
                          paddingHorizontal: 2,
                          fontSize: values.email ? 18 : 14,
                        }}
                        autoCapitalize="none"
                        placeholder="eg. imvikashkk@gmail.com"
                        placeholderTextColor={"gray"}
                        keyboardType="email-address"
                      />
                    </View>
                    {errors.email && touched.email && (
                      <Text style={{ color: "red" }}>{errors.email}</Text>
                    )}

                    <TouchableOpacity
                      disabled={!isValid}
                      onPress={handleSubmit}
                      style={{
                        width: "80%",
                        backgroundColor: "#2544ef",
                        alignSelf: "center",
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        borderRadius: 5,
                        marginTop: 30,
                        opacity: !isValid ? 0.5 : 1,
                      }}>
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "500",
                          alignSelf: "center",
                        }}>
                        Resend Verification Link
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            </Formik>
          </Pressable>
        </Modal>
    
      {
        //! ****************** Forgot Password BottomSheet **************
      }
      <>
        <BottomSheet
          ref={bottomSheetModalRef}
          enablePanDownToClose={true}
          index={-1}
          snapPoints={["25%", "48%", "75%", "95%"]}
          backgroundStyle={{
            borderRadius: 50,
            borderColor: "#959595",
            borderWidth: 1,
            width: screenWidth,
          }}
          keyboardBehavior={"extend"}
          handleIndicatorStyle={{
            height: 2,
            width: 60,
            backgroundColor: "black",
          }}
          animateOnMount={true}
          enabledInnerScrolling={false}>
          <BottomSheetScrollView style={{ flex: 1, paddingHorizontal: 28 }}>
            <ForgotPassword handleCloseModal={handleCloseModal} />
          </BottomSheetScrollView>
        </BottomSheet>
      </>
    </>
  );
};

export default memo(LoginScreen);

const styles = StyleSheet.create({});
