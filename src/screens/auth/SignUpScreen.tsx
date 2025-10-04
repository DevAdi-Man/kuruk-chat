import { RF } from "@/src/utils/dimensions";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";
import Button from "@/src/components/Button";
import CountryPicker, { CountryCode } from "react-native-country-picker-modal";
import SignUpEmailForm from "@/src/components/SignUpEmailForm";
import SocialMediaForm from "@/src/components/SocialMediaForm";
import { useAuthStore } from "@/src/store/auth";
import { loginWithPhone } from "@/src/services/auth";
import { TopBackBar } from "@/src/components/TopBackBar";

const SignUp = () => {
    const routes = useRouter();
    const [activeTab, setActiveTab] = useState<string>("Phone");
    const [countryCode, setCountryCode] = useState<CountryCode>("IN");
    const [callingCode, setCallingCode] = useState("91");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const handlePhoneAuth = async () => {
        try {
            setIsLoading(true);
            const confirmation = await loginWithPhone(`+${callingCode}${phoneNumber}`);

            useAuthStore.getState().setConfirmation(confirmation);
            routes.push("/(auth)/otp");
        } catch (error) {
            console.log("Phone Auth error ", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View className="flex-1  pt-10  p-4">
                <TopBackBar />
                <View className="flex items-center mt-12 ">
                    <Text
                        className="text-[#0E2629]  font-semibold pb-4"
                        style={{ fontSize: RF(28) }}
                    >
                        Let&apos;s join with us
                    </Text>
                    <Text
                        className="text-[#9DA6A7] font-normal pb-1"
                        style={{ fontSize: RF(14) }}
                    >
                        Enter your phone number/social
                    </Text>
                    <Text
                        className="text-[#9DA6A7] font-normal"
                        style={{ fontSize: RF(14) }}
                    >
                        account to get started.
                    </Text>
                </View>
                <View className="flex flex-row justify-evenly mt-12">
                    {["Phone", "Email", "Social"].map((tab) => (
                        <Button
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            title={tab}
                            className={`border-[1px] border-[#9DA6A7] px-8 py-2 rounded-3xl ${activeTab === tab ? "bg-[#0E2629]" : "bg-[#FFFFFF]"}`}
                            textName={`text-center ${activeTab === tab ? "text-[#FFFFFF]" : "text-[#0E2629]"}`}
                        />
                    ))}
                </View>
                {activeTab === "Phone" && (
                    <View className="flex flex-1 my-8 justify-between  ">
                        <View className="w-full mb-4 ">
                            <Text
                                className="text-[#0E2629] font-medium mb-2"
                                style={{ fontSize: RF(14) }}
                            >
                                Phone Number
                            </Text>
                            <View className="flex flex-row gap-2 w-full">
                                <Pressable className="border-[2px] border-[#9DA6A7] px-4 py-2 rounded-3xl flex flex-row items-center justify-center">
                                    <CountryPicker
                                        countryCode={countryCode}
                                        withCallingCode
                                        withFlag
                                        withFilter
                                        withCallingCodeButton
                                        withCloseButton
                                        onSelect={(country) => {
                                            setCountryCode(country.cca2);
                                            setCallingCode(country.callingCode[0]);
                                        }}
                                    />
                                    <Entypo name="chevron-down" size={20} color="#0E2629" />
                                </Pressable>
                                <TextInput
                                    className="border-[2px] rounded-3xl  flex-1 py-4 pl-6 border-[#9DA6A7] "
                                    placeholder="Enter phone number"
                                    keyboardType="numeric"
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                    placeholderTextColor="#888888"
                                />
                            </View>
                        </View>
                        {isLoading ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : (
                            <Button
                                onPress={() => handlePhoneAuth()}
                                title="Continue"
                                className="border-2 border-[#9DA6A7] rounded-3xl py-4 bg-black mb-4 mx-4"
                                textName="text-white"
                            />
                        )}
                    </View>
                )}

                {activeTab === "Email" && <SignUpEmailForm />}

                {activeTab === "Social" && <SocialMediaForm />}
            </View>
        </KeyboardAvoidingView>
    );
};

export default SignUp;
