import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { hp, wp } from "../utils/dimensions";


export const TopBackBar = () => {
    const routes = useRouter()
    return (
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
    )
}
