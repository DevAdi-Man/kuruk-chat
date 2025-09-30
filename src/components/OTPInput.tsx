import React, { useRef, useState } from "react";
import { View, TextInput, Alert, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import Button from "./Button";
import { auth } from "../config/firebaseConfig";
import ProfileModal from "./ProfileModal";
type OtpProps = {
  confirmation: any;
};

const OTPInput = ({ confirmation }: OtpProps) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputs = useRef<(TextInput | null)[]>([]);
  const routes = useRouter();
  const [loadingVerify, setLoadingVerify] = useState(false);

  //profile modal
  const [modalVisible, setModalVisible] = useState(false);
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
    } else {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };
  const verifyOtp = async () => {
    const code = otp.join("");
    if (!confirmation) {
      Alert.alert("Error", "No confirmation object available");
      return;
    }

    try {
      setLoadingVerify(true);

      await confirmation.confirm(code);
      await auth().currentUser?.reload();
      Alert.alert("Success", "OTP verified successfully!");
      setModalVisible(true);
    } catch (error) {
      console.log("OTP verification failed:", error);
      Alert.alert("Error", "Invalid OTP, please try again.");
    } finally {
      setLoadingVerify(false);
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
      {loadingVerify ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          title="Continue"
          className="w-full border-[1px] rounded-3xl py-4 bg-gray-200 mb-8"
          onPress={verifyOtp}
        />
      )}

      <ProfileModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onComplete={() => routes.navigate("/(main)/chat")}
      />
    </View>
  );
};

export default OTPInput;
