import { View, Text, TextInput, Pressable } from "react-native";
import Button from "./Button";
import { RF } from "../utils/dimensions";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required."),
  password: Yup.string().min(6, "Too short!").required("Password is required."),
  confpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required."),
});

const SignUpEmailForm = () => {
  const [showpassword, setShowPassword] = useState<boolean>(false);
  const [showconfpassword, setConfShowPassword] = useState<boolean>(false);
  return (
    <View className="flex flex-1 my-8 justify-between">
      <Formik
        initialValues={{ email: "", password: "", confpassword: "" }}
        validationSchema={SignUpSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View className="flex flex-1 justify-between">
            <View className="w-full mb-4">
              {/* Email Field */}
              <Text
                className="text-[#0E2629] font-medium mb-2"
                style={{ fontSize: RF(14) }}
              >
                Email
              </Text>
              <View className="flex flex-row items-center relative gap-4 w-full">
                <MaterialCommunityIcons
                  name="email-outline"
                  size={24}
                  color="black"
                  style={{ position: "absolute", left: 16 }}
                />
                <TextInput
                  className="border-[2px] rounded-3xl flex-1 pl-12 py-4 border-[#9DA6A7]"
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  placeholderTextColor="#888888"
                />
              </View>
              {touched.email && errors.email && (
                <Text style={{ color: "red", fontSize: RF(12) }}>
                  {errors.email}
                </Text>
              )}

              {/* Password Field */}
              <Text
                className="text-[#0E2629] font-medium mb-2 mt-4"
                style={{ fontSize: RF(14) }}
              >
                Password
              </Text>
              <View className="flex flex-row items-center relative gap-2">
                <Ionicons
                  name="lock-closed-outline"
                  className="absolute left-4"
                  size={24}
                  color="black"
                />
                <TextInput
                  className="border-[2px] rounded-3xl flex-1 py-4 pl-12  border-[#9DA6A7]"
                  placeholder="Enter password"
                  secureTextEntry={!showpassword}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  placeholderTextColor="#888888"
                />
                <Pressable
                  onPress={() => setShowPassword(!showpassword)}
                  className="absolute right-4"
                >
                  <MaterialCommunityIcons
                    name={showpassword ? "eye-off" : "eye"}
                    size={20}
                    color={"bg-gray-200"}
                  />
                </Pressable>
              </View>
              {touched.password && errors.password && (
                <Text style={{ color: "red", fontSize: RF(12) }}>
                  {errors.password}
                </Text>
              )}

              {/* Confirm Password Field */}
              <Text
                className="text-[#0E2629] font-medium mb-2 mt-4"
                style={{ fontSize: RF(14) }}
              >
                Confirm Password
              </Text>
              <View className="flex flex-row items-center relative gap-2">
                <Ionicons
                  name="lock-closed-outline"
                  className="absolute left-4"
                  size={24}
                  color="black"
                />
                <TextInput
                  className="border-[2px] rounded-3xl flex-1 pl-12 py-4 border-[#9DA6A7]"
                  placeholder="Confirm password"
                  secureTextEntry={!showconfpassword}
                  value={values.confpassword}
                  onChangeText={handleChange("confpassword")}
                  onBlur={handleBlur("confpassword")}
                  placeholderTextColor="#888888"
                />
                <Pressable
                  onPress={() => setConfShowPassword(!showconfpassword)}
                  className="absolute right-4"
                >
                  <MaterialCommunityIcons
                    name={showconfpassword ? "eye-off" : "eye"}
                    size={20}
                    color={"bg-gray-200"}
                  />
                </Pressable>
              </View>
              {touched.confpassword && errors.confpassword && (
                <Text style={{ color: "red", fontSize: RF(12) }}>
                  {errors.confpassword}
                </Text>
              )}
            </View>
            {/* Submit Button */}
            <Button
              title="Continue"
              className="w-full border-[1px] rounded-3xl py-4 bg-gray-200 flex-end mt-6"
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignUpEmailForm;
