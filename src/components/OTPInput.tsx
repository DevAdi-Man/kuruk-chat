import React, { useRef, useState } from "react";
import { View, TextInput, Alert, Text } from "react-native";
import { useRouter } from "expo-router";
import Button from "./Button";

type OtpProps = {
    confirmation: any; 
}

const OTPInput = ({ confirmation }: OtpProps) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputs = useRef<(TextInput | null)[]>([]);
  const routes = useRouter();
  const handleChange = (text: string, index: number) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && otp[index] === "") {
      inputs.current[index]?.focus();
    }
  };

  const verifyOtp = async () => {
    const code = otp.join("");
    if (!confirmation) {
      Alert.alert("Error", "No confirmation object available");
      return;
    }

    try {
      const result = await confirmation.confirm(code);
      console.log("User signed in successfully:", result);
      Alert.alert("Success", "OTP verified successfully!");
      routes.navigate("/(main)/Chat");
    } catch (error) {
      console.log("OTP verification failed:", error);
      Alert.alert("Error", "Invalid OTP, please try again.");
    }
  };
  return (
    <View className="flex gap-4 items-center justify-center">
      <View className="flex flex-row justify-center gap-2">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputs.current[index] = ref;
            }}
            className="w-14 h-14  text-center border-[2px]  border-green-600 rounded-full text-lg"
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
        ))}
      </View>
      <Text className="text-center mt-4">00:42</Text>
      <View className=" flex flex-1" />
      <Button
        title="Continue"
        className="w-full border-[1px] rounded-3xl py-4 bg-gray-200 mb-8"
        onPress={verifyOtp}
      />
    </View>
  );
};

export default OTPInput;
