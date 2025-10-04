import {
    View,
    Text,
    TextInput,
    Pressable,
    Alert,
    ActivityIndicator,
} from "react-native";
import Button from "./Button";
import { RF } from "../utils/dimensions";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { loginWithEmail } from "../services/auth";
import { useRouter } from "expo-router";

const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required."),
    password: Yup.string().min(6, "Too short!").required("Password is required."),
});

const SignInEmailForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const routes = useRouter();

    const handleSignIn = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            await loginWithEmail(email, password);
            routes.replace("/(main)/chat");
        } catch (error) {
            console.log("Sign in error ", error);
            Alert.alert("Sign in failed. Please try again.", (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View className="flex flex-1 my-8 justify-between">
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={SignInSchema}
                onSubmit={(values) => handleSignIn(values.email, values.password)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View className="flex flex-1 justify-between">
                        <View className="mx-4 mb-4">
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
                                <Text style={{ color: "red", fontSize: RF(12) }}>{errors.email}</Text>
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
                                    className="border-[2px] rounded-3xl flex-1 text-[#0E2629] py-4 pl-12 border-[#9DA6A7]"
                                    placeholder="Enter password"
                                    secureTextEntry={!showPassword}
                                    value={values.password}
                                    onChangeText={handleChange("password")}
                                    onBlur={handleBlur("password")}
                                    placeholderTextColor="#888888"
                                />
                                <Pressable
                                    onPress={() => setShowPassword(!showPassword)}
                                    className="absolute right-4"
                                >
                                    <MaterialCommunityIcons
                                        name={showPassword ? "eye-off" : "eye"}
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
                        </View>

                        {/* Submit Button */}
                        {isLoading ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : (
                            <Button
                                title="Sign In"
                                className="border-2 border-[#9DA6A7] rounded-3xl py-4 bg-black mb-4 mx-4"
                                textName="text-white"
                                onPress={handleSubmit}
                            />
                        )}
                    </View>
                )}
            </Formik>
        </View>
    );
};

export default SignInEmailForm;

