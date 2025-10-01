import Button from "@/src/components/Button";
import { auth } from "@/src/config/firebaseConfig";
import { hp, hs, RF, wp } from "@/src/utils/dimensions";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

export default function Index() {
  const routes = useRouter();
    console.log("user: ",auth().currentUser )
  return (
    <View className="flex-1  p-4  justify-center items-center">
      <View
        className=" border-gray-600 border-2 rounded-full mb-4"
        style={{ width: wp(64), height: hp(30) }}
      >
        <Image
          source={require("../../../assets/images/luffyIllustration.png")}
          className="w-full h-full  rounded-full"
          resizeMode="contain"
        />
      </View>
      <Text
        className="text-[#0E2629]"
        style={{ fontSize: RF(40), marginTop: hs(20), marginBottom: hs(14) }}
      >
        Welcome to Kuruk
      </Text>
      <Text
        className="text-[#849091]"
        style={{ fontSize: RF(18), marginBottom: hs(8) }}
      >
        Chat with your friends and family.
      </Text>
      <Text
        className="text-[#849091]"
        style={{ fontSize: RF(18), marginBottom: hs(8) }}
      >
        Stay connected, stay happy!
      </Text>
      <Button
        title="Sign In"
        textName="text-[#FFFFFF]"
        textStyle={{ fontSize: RF(18) }}
        style={{ marginTop: hs(36) }}
        className="w-full  py-4 rounded-3xl bg-[#8c07dd] mx-8 "
        onPress={() => routes.navigate("/login")}
      />
      <Button
        title="Create an account"
        textName="text-[#0E2629]"
        textStyle={{ fontSize: RF(18) }}
        style={{ marginTop: hs(16) }}
        className="w-full  py-4 rounded-3xl border-2 border-[#CDD1D2] mx-8 "
        onPress={() => routes.navigate("/signUp")}
      />
    </View>
  );
}
