import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  Modal,
  Dimensions
} from "react-native";
import React, {
  useReducer,
  useRef,
  useMemo,
  useCallback,
  useState,
  memo,
} from "react";

import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import { AntDesign } from "@expo/vector-icons";
import CircularProgressBar from "./CircularProgressBar";

/* State Initial Value */
const initialState = {
  otp: "",
  forgotEmail: "",
  otpSent: false,
  resendOTP: false,
  isLoading: false,
  resendOTPTime: false,
};

const screenWidth = Dimensions.get("window").width
const ForgotPassword = ({handleCloseModal}) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const [hidePassword, setHidePassword] = useState(true);

  const reducer = useCallback((currentState, action) => {
    switch (action.type) {
      case "otp":
        return { ...currentState, otp: action.payload };
      case "otpSent":
        return { ...currentState, otpSent: action.payload };
      case "forgotEmail":
        return { ...currentState, forgotEmail: action.payload };
      case "isLoading":
        return { ...currentState, isLoading: action.payload };
      case "resendOTPTime":
        return { ...currentState, resendOTPTime: action.payload };
      default:
        return { ...currentState };
    }
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);

  const pin1Ref = useRef();
  const pin2Ref = useRef();
  const pin3Ref = useRef();
  const pin4Ref = useRef();
  const pin5Ref = useRef();
  const pin6Ref = useRef();
  const circularProgress = useRef();
  const formikRef = useRef();

  /* Yup Schema for Validation */
  let emailSchema = useMemo(() =>
    Yup.object().shape({
      email: Yup.string()
        .required("Email Address is required*")
        .matches(emailPattern, "Please enter a valid email address"),
      password: Yup.string()
        .required("New password is required*")
        .min(8, "Password length should be min of 8*"),
      pin1: Yup.string().required("OTP is Required*"),
      pin2: Yup.string().required("OTP is Required*"),
      pin3: Yup.string().required("OTP is Required*"),
      pin4: Yup.string().required("OTP is Required*"),
      pin5: Yup.string().required("OTP is Required*"),
      pin6: Yup.string().required("OTP is Required*"),
    })
  );

  /* handleOTPSend */
  const handleOTPSend = useCallback((email) => {
    if (email === "") {
      return;
    }
    dispatch({ type: "isLoading", payload: true });

    axios
      .post("https://amazone-backend.vercel.app/api/user/auth/passwordchangeotp", { email })
      .then((response) => {
        console.log(response?.data) // status code 200
        dispatch({ type: "isLoading", payload: false });
        console.log("OTP sent successfully");
        dispatch({ type: "otpSent", payload: true });
        circularProgress.current.handleRestart();
        dispatch({ type: "resendOTPTime", payload: false });
      })
      .catch((error) => {
        dispatch({ type: "isLoading", payload: false });
        if (error?.response) {
          if(error?.response?.status === 400){
            Alert.alert(
              "Bad request!!",
              "Required body elements are missing !!"
            );
          }
          else if (error?.response.status === 404) {
            Alert.alert(
              "Email id is not Registered !!",
              "Please register your email."
            );
          } else if (error?.response.status === 500) {
            Alert.alert("Internal Server Error", "Please try again.......");
          } else if(error?.response.status === 500){
            Alert.alert("SMTP Error", "OTP could not be sent.");
          }
        } else {
          console.log("An Error occurred while OTP Send");
          Alert.alert(
            "An Error occurred while OTP Send",
            "Please try again later...."
          );
        }
      });
  }, []);

  /* handleResendOTP */
  const handleResendOTP = useCallback((email) => {
    if (email === "") {
      return;
    }
    dispatch({ type: "isLoading", payload: true });
    axios
      .post("https://amazone-backend.vercel.app/api/user/auth/passwordchangeotp", { email })
      .then((response) => {
        console.log(response?.data)
        dispatch({ type: "isLoading", payload: false });
        console.log("OTP sent again successfully");
        circularProgress.current.handleRestart();
        dispatch({ type: "resendOTPTime", payload: false });
        circularProgress.current.handleRestart();
      })
      .catch((error) => {
        dispatch({ type: "isLoading", payload: false });
        if (error?.response) {
          if (error?.response.status === 404) {
            console.log("Email id is not Registered !!");
            Alert.alert(
              "Email id is not Registered !!",
              "Please check your entered email id"
            );
          } else if (error?.response.status === 500) {
            console.log("Internal Server Error");
            Alert.alert("Internal Server Error", "Please try again.......");
          }
        } else {
          console.log("An Error occurred while OTP Send");
          Alert.alert(
            "An Error occurred while OTP Send",
            "Please try again later...."
          );
        }
      });
  }, []);


  /* handlePassword Change */
  const handlePasswordChange = useCallback((email, password, otp) => {
    dispatch({ type: "isLoading", payload: true });
    axios
      .patch("https://amazone-backend.vercel.app/api/user/auth/passwordchange", {
        email,
        newpassword: password,
        otp,
      })
      .then((response) => {
        console.log(response?.data)
        dispatch({ type: "isLoading", payload: false });
        Alert.alert(
          "Password Changed successfully !!",
          "Please follow me on GitHub @imvikashkk"
        );
        formikRef.current.resetForm();
        dispatch({
          type: "otpSent",
          payload: false,
        }); /* if form is reset, then otp status will be reset */
        circularProgress.current.handlePauseResume(); /* Pause progress counter */
        dispatch({ type: "forgotEmail", payload: "" });
        handleCloseModal()
      })
      .catch((error) => {
        dispatch({ type: "isLoading", payload: false });
        if (error?.response) {
          console.log(error?.response)
          if(error?.response?.status === 400){
              Alert.alert(
                "Bad request",
                "Required body elements are missing !!"
              )
          }
          else if(error?.response?.status === 404){
              Alert.alert(
                "Not Found",
                "Email Address is not registered !!"
              )
          }
          else if (error?.response.status === 410) {
            Alert.alert(
              "OTP is exprired !!",
              "Do you want to send otp again? ",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Yes",
                  onPress: () => {
                    handleResendOTP(state.forgotEmail);
                    dispatch({ type: "isLoading", payload: false });
                    circularProgress.current.handleRestart();
                    dispatch({ type: "resendOTPTime", payload: false });
                  },
                },
              ]
            );
          } else if (error?.response.status === 409) {
            Alert.alert("Invalid OTP!!", "Please Enter Correct OTP !!");
          } else if (error?.response.status === 500) {
            Alert.alert("Internal Server Error!!", "Please try again later !!");
          } 
        } else {
          Alert.alert(
            "An error occured while password resetting !!",
            "Internal Server Error !!"
          );
        }
      });
  });

  return (
    <>
      {/* MAIN CONTENT */}
      <Pressable
        onPress={Keyboard.dismiss}
        style={{ backgroundColor: "white", flex: 1 }}>

        {/* Amazone Logo */}
        <Image
          source={require("../../assets/logo.png")}
          style={{ height: 50, width: 100, alignSelf: "center" }}
        />

        {/* Main Section */}
        <View>
          <Formik
            initialValues={{
              email: "",
              password: "",
              pin1: "",
              pin2: "",
              pin3: "",
              pin4: "",
              pin5: "",
              pin6: "",
            }}
            validationSchema={emailSchema}
            onSubmit={({
              email,
              password,
              pin1,
              pin2,
              pin3,
              pin4,
              pin5,
              pin6,
            }) => {
              Keyboard.dismiss();
              handlePasswordChange(
                email,
                password,
                +(pin1 + pin2 + pin3 + pin4 + pin5 + pin6)
              );
            }}
            innerRef={formikRef} 
            >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              handleReset,
              handleBlur,
              isValid,
            }) => (
              <View>
                {/* Email Input and Send OTP Button */}
                <View style={{ marginTop: 2 }}>
                  {/* Email Input */}
                  <>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        backgroundColor: "#f0f0f0",
                        paddingVertical: 3,
                        borderRadius: 8,
                        marginTop: 30,
                        opacity: state.otpSent ? 0.5 : 1,
                      }}>
                      <MaterialIcons
                        style={{ marginLeft: 8 }}
                        name="email"
                        size={32}
                        color={"#2f2f2f"}
                      />

                      <TextInput
                        value={values.email}
                        onChangeText={(data) => {
                          handleChange("email")(data);
                        }}
                        onBlur={handleBlur("email")}
                        editable={!state.otpSent}
                        style={{
                          color: "#3f3f3f",
                          marginVertical: 10,
                          width: 300,
                          fontSize: 19,
                          paddingRight: 10,
                          fontWeight: "500",
                        }}
                        autoCapitalize="none"
                        placeholder="Enter Your Email"
                        placeholderTextColor={"gray"}
                        keyboardType="email-address"
                      />
                    </View>
                    <Text style={{ color: "red", fontWeight: "500" }}>
                      {errors.email && touched.email && `${errors.email}`}
                    </Text>
                  </>

                  {/* Send OTP Button */}
                  <TouchableOpacity
                    onPress={(data) => {
                      handleBlur("email")(data);
                      handleOTPSend(
                        values.email
                      ); /* Handle Send OTP Function */
                      dispatch({
                        type: "forgotEmail",
                        payload: values.email,
                      }); /* put the email in state */
                    }}
                    disabled={errors.email}
                    style={{
                      alignSelf: "center",
                      backgroundColor: "#046dff",
                      paddingVertical: 10,
                      paddingHorizontal: 40,
                      marginTop: 100,
                      borderRadius: 5,
                      opacity: errors.email ? 0.5 : 1,
                      display: state.otpSent ? "none" : "flex",
                    }}>
                    <Text style={{ color: "white" }}>Send OTP</Text>
                  </TouchableOpacity>
                </View>

                {/* Verify OTP and Change Password and Resend OTP */}
                <View style={{ display: state.otpSent ? "flex" : "none" }}>
                  {/* Edit Email Buttom Opening Screen */}
                  <TouchableOpacity
                    onPress={() => {
                      handleReset(); /* Reset the Form */
                      dispatch({
                        type: "otpSent",
                        payload: false,
                      }); /* if form is reset, then otp status will be reset */
                      circularProgress.current.handlePauseResume(); /* Pause progress counter */
                      dispatch({
                        type: "forgotEmail",
                        payload: "",
                      }); /* forgot state will be empty  */
                    }}
                    style={{
                      alignSelf: "flex-end",
                      backgroundColor: "#046dff",
                      paddingVertical: 10,
                      paddingHorizontal: 40,
                      borderRadius: 5,
                      marginTop: -15,
                      display: state.otpSent ? "flex" : "none",
                    }}>
                    <Text style={{ color: "white" }}>Edit Email</Text>
                  </TouchableOpacity>

                  {/* OTP */}
                  <View style={{ marginTop: 3 }}>
                    <Text style={{ fontSize: 18 }}>Enter Your OTP :</Text>
                    {/* OTP InputField */}
                    <>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: screenWidth/100,
                        }}>


                        {/* OTP Pin1 */}
                        <View
                          style={{
                            borderBottomWidth: 1,
                            width: screenWidth/8,
                          }}>
                          <TextInput
                            value={values.pin1}
                            onChangeText={(pin) => {
                              const numericText = pin.replace(/[^0-9]/g, "");
                              handleChange("pin1")(numericText);
                            }}
                            onBlur={handleBlur("pin1")}
                            maxLength={1}
                            style={{
                              fontSize: 25,
                              alignSelf: "center",
                            }}
                            keyboardType="numeric"
                            ref={pin1Ref}
                            onKeyPress={(e) => {
                              if (!isNaN(+e.nativeEvent.key)) {
                                pin2Ref.current.focus();
                              }
                            }}
                          />
                        </View>

                        {/* OTP Pin2 */}
                        <View
                          style={{
                            borderBottomWidth: 1,
                            width: screenWidth/8,
                          }}>
                          <TextInput
                            value={values.pin2}
                            onChangeText={(pin) => {
                              const numericText = pin.replace(/[^0-9]/g, "");
                              handleChange("pin2")(numericText);
                            }}
                            onBlur={handleBlur("pin2")}
                            keyboardType="numeric"
                            maxLength={1}
                            style={{
                              fontSize: 25,
                              alignSelf: "center",
                            }}
                            ref={pin2Ref}
                            onKeyPress={(e) => {
                              if (!isNaN(+e.nativeEvent.key)) {
                                pin3Ref.current.focus();
                              }
                              if (
                                e.nativeEvent.key === "Backspace" &&
                                values.pin2 === ""
                              ) {
                                pin1Ref.current.focus();
                              }
                            }}
                          />
                        </View>

                        {/* OTP Pin3 */}
                        <View
                          style={{
                            borderBottomWidth: 1,
                            width: screenWidth/8,
                          }}>
                          <TextInput
                            value={values.pin3}
                            onChangeText={(pin) => {
                              const numericText = pin.replace(/[^0-9]/g, "");
                              handleChange("pin3")(numericText);
                            }}
                            onBlur={handleBlur("pin3")}
                            keyboardType="numeric"
                            maxLength={1}
                            style={{
                              fontSize: 25,
                              alignSelf: "center",
                            }}
                            ref={pin3Ref}
                            onKeyPress={(e) => {
                              if (!isNaN(+e.nativeEvent.key)) {
                                pin4Ref.current.focus();
                              }
                              if (
                                e.nativeEvent.key === "Backspace" &&
                                values.pin3 === ""
                              ) {
                                pin2Ref.current.focus();
                              }
                            }}
                          />
                        </View>

                        {/* OTP Pin4 */}
                        <View
                          style={{
                            borderBottomWidth: 1,
                            width: screenWidth/8,
                          }}>
                          <TextInput
                            value={values.pin4}
                            onChangeText={(pin) => {
                              const numericText = pin.replace(/[^0-9]/g, "");
                              handleChange("pin4")(numericText);
                            }}
                            onBlur={handleBlur("pin4")}
                            keyboardType="numeric"
                            maxLength={1}
                            style={{
                              fontSize: 25,
                              alignSelf: "center",
                            }}
                            ref={pin4Ref}
                            onKeyPress={(e) => {
                              if (!isNaN(+e.nativeEvent.key)) {
                                pin5Ref.current.focus();
                              }
                              if (
                                e.nativeEvent.key === "Backspace" &&
                                values.pin4 === ""
                              ) {
                                pin3Ref.current.focus();
                              }
                            }}
                          />
                        </View>

                        {/* OTP Pin5 */}
                        <View
                          style={{
                            borderBottomWidth: 1,
                            width: screenWidth/8,
                          }}>
                          <TextInput
                            value={values.pin5}
                            onChangeText={(pin) => {
                              const numericText = pin.replace(/[^0-9]/g, "");
                              handleChange("pin5")(numericText);
                            }}
                            onBlur={handleBlur("pin5")}
                            keyboardType="numeric"
                            maxLength={1}
                            style={{
                              fontSize: 25,
                              alignSelf: "center",
                            }}
                            ref={pin5Ref}
                            onKeyPress={(e) => {
                              if (!isNaN(+e.nativeEvent.key)) {
                                pin6Ref.current.focus();
                              }
                              if (
                                e.nativeEvent.key === "Backspace" &&
                                values.pin5 === ""
                              ) {
                                pin4Ref.current.focus();
                              }
                            }}
                          />
                        </View>

                        {/* OTP Pin6 */}
                        <View
                          style={{
                            borderBottomWidth: 1,
                            width: screenWidth/8,
                          }}>
                          <TextInput
                            value={values.pin6}
                            onChangeText={(pin) => {
                              const numericText = pin.replace(/[^0-9]/g, "");
                              handleChange("pin6")(numericText);
                            }}
                            onBlur={handleBlur("pin6")}
                            keyboardType="numeric"
                            maxLength={1}
                            style={{
                              fontSize: 25,
                              alignSelf: "center",
                            }}
                            ref={pin6Ref}
                            onKeyPress={(e) => {
                              if (
                                e.nativeEvent.key === "Backspace" &&
                                values.pin6 === ""
                              ) {
                                pin5Ref.current.focus();
                              }
                            }}
                          />
                        </View>
                      </View>
                      <Text
                        style={{
                          color: "red",
                          alignSelf: "center",
                          fontWeight: "500",
                        }}>
                        {((touched.pin1 && errors.pin1) ||
                          (touched.pin2 && errors.pin2) ||
                          (touched.pin3 && errors.pin3) ||
                          (touched.pin4 && errors.pin4) ||
                          (touched.pin5 && errors.pin5) ||
                          (touched.pin6 && errors.pin6)) &&
                          "OTP is required*"}
                      </Text>
                    </>
                  </View>

                  {/* New Password Input */}
                  <View style={{ marginTop: -5 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        backgroundColor: "#f0f0f0",
                        paddingVertical: 3,
                        borderRadius: 8,
                        marginTop: 30,
                      }}>
                      {/* Toggle Hide Password */}
                      <TouchableOpacity
                        onPress={() => setHidePassword(!hidePassword)}
                        style={{ marginLeft: 8 }}>
                        <AntDesign
                          name={hidePassword ? "lock1" : "unlock"}
                          size={32}
                          color={"gray"}
                        />
                      </TouchableOpacity>

                      {/* Input Field for New Password */}
                      <TextInput
                        value={values.password}
                        onChangeText={handleChange("password")}
                        secureTextEntry={hidePassword}
                        onBlur={handleBlur("password")}
                        style={{
                          color: "#3f3f3f",
                          marginVertical: 10,
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

                  {/* Resend OTP Button and Timig 100s*/}
                  <View
                    style={{
                      marginTop: 20,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    {/* otp time counting */}
                    <View
                      style={{
                        display: !state.resendOTPTime ? "flex" : "none",
                        marginRight: 50,
                      }}>
                      <CircularProgressBar
                        ref={circularProgress}
                        dispatch={dispatch}
                      />
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        handleResendOTP(
                          values.email
                        ); /* handle resend OTP through API calling */
                      }}
                      disabled={!state.resendOTPTime}
                      style={{
                        paddingHorizontal: 40,
                        paddingVertical: 10,
                        backgroundColor: "#007FFF",
                        borderRadius: 6,
                        alignSelf: "center",
                        opacity: state.resendOTPTime ? 1 : 0.5,
                      }}>
                      <Text style={{ color: "white" }}>Resend OTP</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Submit OTP and Password Button */}
                  <TouchableOpacity
                    onPress={(data)=>{
                       handleSubmit(data)
                    }}
                    disabled={!isValid}
                    style={{
                      width:screenWidth/1.5,
                      height:screenWidth/8,
                      alignSelf: "center",
                      backgroundColor: "#007FFF",
                      marginTop: 20,
                      borderRadius: 5,
                      opacity: !isValid ? 0.5 : 1,
                      justifyContent:"center",
                      alignItems:"center",
                    }}>
                    <Text style={{ color: "white", fontSize:18, fontWeight:"600" }}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </Pressable>

      {/* MODAL ACTIVITY INDICATOR */}
      {state.isLoading && (
        <Modal transparent style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              flex: 1,
              paddingTop: 300,
            }}>
            <ActivityIndicator size={50} />
          </View>
        </Modal>
      )}
    </>
  );
};

export default memo(ForgotPassword);

const styles = StyleSheet.create({});
