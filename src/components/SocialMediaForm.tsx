import { Image, View } from "react-native"
import Button from "./Button"
import { hp, RF, wp } from "../utils/dimensions"

const SocialMediaForm = () => {

    return (
        <View className="my-16 mx-4 gap-8">
            <View className="relative flex flex-row w-full items-center">
                <Image source={require("../../assets/images/apple.png")} className="absolute left-8" style={{ width: wp(6), height: hp(3) }} />
                <Button title="Continue with Apple" className="border-[2px] w-full border-[#9DA6A7] rounded-3xl py-4 text-center " textName="font-bold" textStyle={{ fontSize: RF(17) }} />
            </View>
            <View className="relative flex flex-row w-full items-center">
                <Image source={require("../../assets/images/google.png")} className="absolute left-8" style={{ width: wp(6), height: hp(3) }} />
                <Button title="Continue with Google" className="border-[2px] w-full border-[#9DA6A7] rounded-3xl py-4 text-center " textName="font-bold" textStyle={{ fontSize: RF(17) }} />
            </View>
            <View className="relative flex flex-row w-full items-center">
                <Image source={require("../../assets/images/facebook.png")} className="absolute left-8" style={{ width: wp(6.2), height: hp(3) }} />
                <Button title="Continue with Facebook" className="border-[2px] w-full border-[#9DA6A7] rounded-3xl py-4 text-center " textName="font-bold" textStyle={{ fontSize: RF(17) }} />
            </View>
            <View className="relative flex flex-row w-full items-center">
                <Image source={require("../../assets/images/x.png")} className="absolute left-8 rounded-full" style={{ width: wp(6), height: hp(3) }} />
                <Button title="Continue with Twitter" className="border-[2px] w-full border-[#9DA6A7] rounded-3xl py-4 text-center " textName="font-bold" textStyle={{ fontSize: RF(17) }} />
            </View>
        </View>
    )
}

export default SocialMediaForm
