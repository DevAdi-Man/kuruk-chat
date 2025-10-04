import { RF } from "@/src/utils/dimensions";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Text,
    View,
} from "react-native";
import Button from "@/src/components/Button";
import SocialMediaForm from "@/src/components/SocialMediaForm";
import { TopBackBar } from "@/src/components/TopBackBar";
import SignInEmailForm from "@/src/components/SignInEmailForm";
import { SignInWithPhone } from "@/src/components/SignInWithPhone";

const Login = () => {
    const routes = useRouter();
    const [activeTab, setActiveTab] = useState<string>("Phone");

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View className="flex-1 pt-10 p-4">
                <TopBackBar />

                {/* Header */}
                <View className="flex items-center mt-12">
                    <Text
                        className="text-[#0E2629] font-semibold pb-4"
                        style={{ fontSize: RF(28) }}
                    >
                        Welcome Back
                    </Text>
                    <Text
                        className="text-[#9DA6A7] font-normal pb-1"
                        style={{ fontSize: RF(14) }}
                    >
                        Sign in with your phone, email, or social
                    </Text>
                    <Text
                        className="text-[#9DA6A7] font-normal"
                        style={{ fontSize: RF(14) }}
                    >
                        account to continue.
                    </Text>
                </View>

                {/* Tabs */}
                <View className="flex flex-row justify-evenly mt-12">
                    {["Phone", "Email", "Social"].map((tab) => (
                        <Button
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            title={tab}
                            className={`border-[1px] border-[#9DA6A7] px-8 py-2 rounded-3xl ${activeTab === tab ? "bg-[#0E2629]" : "bg-[#FFFFFF]"
                                }`}
                            textName={`text-center ${activeTab === tab ? "text-[#FFFFFF]" : "text-[#0E2629]"
                                }`}
                        />
                    ))}
                </View>

                {/* Phone Sign In */}
                {activeTab === "Phone" && (
                    <SignInWithPhone />
                )}

                {/* Email Sign In */}
                {activeTab === "Email" && <SignInEmailForm />}

                {/* Social Sign In */}
                {activeTab === "Social" && <SocialMediaForm />}
            </View>
        </KeyboardAvoidingView>)
}

export default Login

