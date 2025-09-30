import OTPInput from "@/src/components/OTPInput";
import { useAuthStore } from "@/src/store/auth";
import { hp, RF, wp } from "@/src/utils/dimensions";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

const Otp = () => {
  const routes = useRouter();
  const { confirmation } = useAuthStore();
  return (
    <View className="flex-1   pt-10  p-4">
      <View className="flex flex-row justify-between items-center">
        <Pressable
          onPress={() => routes.back()}
          className="border-2 border-[#D7DADB] flex justify-center items-center rounded-full"
          style={{ width: wp(10), height: hp(5) }}
        >
          <MaterialIcons name="arrow-back-ios-new" size={20} color="black" />
        </Pressable>
        <Pressable
          className="border-2 border-[#D7DADB] flex justify-center items-center rounded-full"
          style={{ width: wp(10), height: hp(5) }}
        >
          <Entypo name="dots-three-horizontal" size={20} color="black" />
        </Pressable>
      </View>

      <View className="text-center flex items-center my-12">
        <Text className={`mb-4 font-semibold `} style={{ fontSize: RF(32) }}>
          Enter OTP Code
        </Text>
        <Text
          className={`text-[#849091] font-medium`}
          style={{ fontSize: RF(16) }}
        >
          Enter the 4-digit code sent to +91 8800607564.
        </Text>
        <View className="flex flex-row mt-2 gap-2 items-center">
          <Text
            className={`text-[#849091] font-medium`}
            style={{ fontSize: RF(16) }}
          >
            Don&apos;t get a code?
          </Text>
          <Pressable>
            <Text
              className="text-[#0E2629] font-semibold"
              style={{ fontSize: RF(16) }}
            >
              Resend code
            </Text>
          </Pressable>
        </View>
      </View>

      <OTPInput confirmation={confirmation} />
    </View>
  );
};

export default Otp;
