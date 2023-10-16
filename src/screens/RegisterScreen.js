import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  Alert,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  Modal,
} from "react-native";
import React, { useState, useMemo, memo, useRef, useCallback } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import ForgotPassword from "../components/ForgotPassword";
import { WebView } from "react-native-webview";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const RegisterScreen = () => {
  const navigation = useNavigation();
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false); // Track if WebView can go back
  const webViewRef = useRef(null); // reference to the WebView

  /* BottomSheetModal */
  const bottomSheetModalRef = useRef(null);

  /* BottomSheetModal Open Function */
  const handlePresentModal = () => {
    bottomSheetModalRef.current?.snapToIndex(2);
  };

  /* BottomSheetModal Open Function */
  const handleCloseModal = (index) => {
    bottomSheetModalRef?.current?.close();
  };

  /* Handle Registration API */
  const handleRegister = useCallback(({ name, email, password }) => {
    setIsLoading(true);
    const user = {
      name: name,
      email: email,
      password: password,
    };

    axios
      .post("https://amazone-backend.vercel.app/api/user/auth/register", user)
      .then((response) => {
        // Status Code Must be 201
        console.log(response.data);
        setIsLoading(false);
        Alert.alert(
          "Registration successful !!",
          "Please check your email and verify",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.goBack();
                handleCloseModal();
              },
            },
          ]
        );
      })
      .catch((error) => {
        setIsLoading(false);
        if (error?.response) {
          console.log(error.response);
          if (error.response.status === 400) {
            Alert.alert("Bad Request", "Required body elements are missing !!");
          } else if (error.response.status === 403) {
            Alert.alert(
              "Email Already Registered !!",
              "Please login with your email or create a new user with different email."
            );
          } else if (error.response.status === 450) {
            Alert.alert(
              "SMTP Error",
              "Please make sure you are registered with a valid email address !!"
            );
          } else if (error.response.status === 500) {
            Alert.alert("Internal Server Error", "Please try again later !!");
          }
        } else {
          console.log(error);
          Alert.alert(
            "An error occurred while registeration",
            "Please try again later !!"
          );
        }
      });
  }, []);

  /* Yup Validation Schema */
  const RegisterSchema = useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string()
          .matches(/^[a-zA-Z\s]*$/, "Please enter a valid name*")
          .min(3, "Please enter a valid name*")
          .required("Name field is required*"),
        email: Yup.string()
          .required("Email Address is required*")
          .email("Please enter a valid email address*"),
        password: Yup.string()
          .min(8, "Should be min of 8 characters*")
          .max(16, "Should be max of 16 characters*")
          .required("Password is required*"),
      }),
    []
  );

  /* Function to toggle the WebView's visibility */
  const toggleWebView = useCallback(() => {
    setShowWebView(!showWebView);
  }, [showWebView]);

  /* Function to close the WebView */
  const closeWebView = useCallback(() => {
    setShowWebView(false);
  }, []);

  /* Function to handle WebView navigation state changes */
  const handleNavigationStateChange = useCallback((navState) => {
    setCanGoBack(navState.canGoBack);
  }, []);

  /* Function to go back in the WebView */
  const goBackInWebView = () => {
    if (canGoBack) {
      webViewRef.current.goBack();
    }
  };

  return (
    <>
      {
        //! ****************** Register Main Screen   **************
      }

      <Pressable
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          paddingTop: 1,
        }}
        onPress={() => Keyboard.dismiss()}>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={RegisterSchema}
          onSubmit={(data) => {
            handleRegister(data);
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
                <View style={styles.keyboardContainer}>
                  {/* Amazone Logo */}
                  <View>
                    <Image
                      style={{ width: 200, height: 150, marginTop: 0 }}
                      source={require("../../assets/logo.png")}
                    />
                  </View>

                  {/* Register to your Account */}
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        marginTop: -40,
                        color: "#041E42",
                      }}>
                      Register to your Account
                    </Text>
                  </View>

                  {/* Enter Your Name */}
                  <View
                    style={{
                      width: (screenWidth / 20) * 17,
                      alignSelf: "center",
                    }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        backgroundColor: "#D0D0D0",
                        paddingVertical: 3,
                        borderRadius: 8,
                        marginTop: 30,
                        alignSelf: "center",
                      }}>
                      <Ionicons
                        name="ios-person"
                        size={32}
                        color="gray"
                        style={{ marginLeft: 8 }}
                      />
                      <TextInput
                        value={values.name}
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                        style={{
                          color: "#3f3f3f",
                          marginVertical: 10,
                          width: (screenWidth / 20) * 17 - 40,
                          fontSize: values.name ? 19 : 17,
                          paddingRight: 10,
                          fontWeight: "500",
                        }}
                        autoCapitalize="none"
                        placeholder="Enter Your Name"
                        placeholderTextColor={"gray"}
                      />
                    </View>
                    {touched.name && errors.name && (
                      <Text style={{ color: "red", fontWeight: "500" }}>
                        {errors.name}
                      </Text>
                    )}
                  </View>

                  {/* Enter Your Email */}
                  <View
                    style={{
                      width: (screenWidth / 20) * 17,
                      alignSelf: "center",
                    }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        backgroundColor: "#D0D0D0",
                        paddingVertical: 3,
                        borderRadius: 8,
                        marginTop: 30,
                        alignSelf: "center",
                      }}>
                      <MaterialIcons
                        style={{ marginLeft: 8 }}
                        name="email"
                        size={32}
                        color="gray"
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
                  <View
                    style={{
                      width: (screenWidth / 20) * 17,
                      alignSelf: "center",
                    }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        backgroundColor: "#D0D0D0",
                        paddingVertical: 3,
                        borderRadius: 8,
                        marginTop: 30,
                        alignSelf: "center",
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
                        onBlur={handleBlur("password")}
                        secureTextEntry={hidePassword}
                        style={{
                          color: "#3f3f3f",
                          marginVertical: 10,
                          width: (screenWidth / 20) * 17 - 40,
                          fontSize: values.email ? 19 : 17,
                          paddingRight: 10,
                          fontWeight: "500",
                        }}
                        autoCapitalize="none"
                        placeholder="Enter Your Password"
                        placeholderTextColor={"gray"}
                      />
                    </View>
                    {touched.password && errors.password && (
                      <Text style={{ color: "red", fontWeight: "500" }}>
                        {errors.password}
                      </Text>
                    )}
                  </View>

                  {/* GitHub @1imvikashkk & Forgot Password */}
                  <View
                    style={{
                      width: (screenWidth / 20) * 17,
                      alignSelf: "center",
                      marginTop: 12,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        toggleWebView();
                        setIsLoading(true);
                      }}>
                      <Text style={{ color: "#007FFF", fontWeight: "500" }}>
                        GitHub @imvikashkk
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handlePresentModal(2)}>
                      <Text style={{ color: "#007FFF", fontWeight: "500" }}>
                        Forgot Password
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Register Button */}
                  <Pressable
                    disabled={!isValid}
                    onPress={handleSubmit}
                    style={{
                      marginTop: 60,
                      width: 200,
                      backgroundColor: "#FEBE10",
                      borderRadius: 6,
                      marginLeft: "auto",
                      marginRight: "auto",
                      padding: 15,
                      opacity: isValid ? 1 : 0.6,
                    }}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}>
                      Register
                    </Text>
                  </Pressable>

                  {/* Jump To LoginScreen */}
                  <Pressable
                    onPress={() => navigation.goBack()}
                    style={{ marginTop: 15 }}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "gray",
                        fontSize: 16,
                      }}>
                      Already have an account? Sign In
                    </Text>
                  </Pressable>
                </View>
              </>
            );
          }}
        </Formik>
      </Pressable>

      {
        //! ****************** Loading Modal   **************
      }

      {isLoading && (
        <Modal transparent style={{ flex: 1 }}>
          <View
            style={{
              paddingTop: 300,
              alignItems: "center",
              flex: 1,
              backgroundColor: "rgba(255,255,255,0.5)",
            }}>
            <ActivityIndicator size={52} />
          </View>
        </Modal>
      )}

      {
        //! ****************** BottomUp Modal For Reset Password  **************
      }
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

      {
        //! ****************** Open WebSite GitHub   **************
      }

      <View
        style={[styles.container, { display: showWebView ? "flex" : "none" }]}>
        {!showWebView ? null : (
          <View style={styles.webviewContainer}>
            <WebView
              ref={webViewRef}
              source={{ uri: "https://github.com/imvikashkk" }}
              style={styles.webview}
              onNavigationStateChange={handleNavigationStateChange}
              // onLoadStart={() => setIsLoading(true)} // set in onclick GitHub @imvikashkk
              onLoadEnd={() => setIsLoading(false)}
            />
            <View style={styles.buttonContainer}>
              <Pressable
                style={{ borderRadius: 10, overflow: "hidden" }}
                onPress={closeWebView}>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    color: "white",
                    backgroundColor: "red",
                  }}>
                  close
                </Text>
              </Pressable>
              <Pressable
                style={{ borderRadius: 10, overflow: "hidden" }}
                disabled={!canGoBack}
                onPress={goBackInWebView}>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    color: "white",
                    backgroundColor: canGoBack ? "#007AFF" : "gray",
                  }}>
                  back
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

export default memo(RegisterScreen);

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    // WebView
    height: screenHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  webviewContainer: {
    flex: 1,
    width: "100%",
  },
  webview: {
    flex: 1,
    width: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 8,
  },
});
