
import { RF } from "@/src/utils/dimensions";
import Entypo from "@expo/vector-icons/Entypo";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";
import Button from "@/src/components/Button";
import CountryPicker, { CountryCode } from "react-native-country-picker-modal";
import { useAuthStore } from "@/src/store/auth";
import { loginWithPhone } from "@/src/services/auth";
import { useRouter } from "expo-router";

export const SignInWithPhone = () => {
    const routes = useRouter();
    const [countryCode, setCountryCode] = useState<CountryCode>("IN");
    const [callingCode, setCallingCode] = useState("91");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handlePhoneAuth = async () => {
        try {
            setIsLoading(true);
            const confirmation = await loginWithPhone(`+${callingCode}${phoneNumber}`);

            useAuthStore.getState().setConfirmation(confirmation);
            routes.push("/(auth)/otp"); // redirect to OTP verification
        } catch (error) {
            console.log("Phone Auth error ", error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <View className="flex flex-1 my-8 justify-between">
            <View className="w-full mb-4">
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
                        className="border-[2px] rounded-3xl flex-1 py-4 pl-6 border-[#9DA6A7]"
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
                    onPress={handlePhoneAuth}
                    title="Continue"
                    className="border-2 border-[#9DA6A7] rounded-3xl py-4 bg-black mb-4 mx-4"
                    textName="text-white"
                />
            )}
        </View>
    )
}
