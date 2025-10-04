import { ActivityIndicator, Alert, Image, View } from "react-native"
import Button from "./Button"
import { hp, RF, wp } from "../utils/dimensions"
import { googleSocialAccount } from "../services/auth"
import { useRouter } from "expo-router"
import ProfileModal from "./ProfileModal"
import { useState } from "react"
import { auth, firestore } from "../config/firebaseConfig"

const SocialMediaForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState(false);
    const routes = useRouter();
    const handleGoogleSubmit = async () => {
        try {
            setIsLoading(true)
            await googleSocialAccount();
            const user = auth().currentUser;
            if (!user) throw new Error("No logged in user");

            // Check if user profile exists in Firestore
            const docRef = firestore().collection("users").doc(user.uid);
            const docSnap = await docRef.get();

            if (docSnap.exists()) {
                // user already has profile → go to main screen
                routes.replace("/(main)/chat");
            } else {
                // new user → show profile modal
                setModalVisible(true);
            }
        } catch (error) {
            console.log("error with google :", error)
            Alert.alert("SignIn with google does not working.", (error as Error).message);
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <View className="my-16 mx-4 gap-8">
            <View className="relative flex flex-row w-full items-center">
                <Image source={require("../../assets/images/apple.png")} className="absolute left-8" style={{ width: wp(6), height: hp(3) }} />
                <Button title="Continue with Apple" className="border-[2px] w-full border-[#9DA6A7] rounded-3xl py-4 text-center " textName="font-bold" textStyle={{ fontSize: RF(17) }} />
            </View>
            {
                isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <View className="relative flex flex-row w-full items-center">
                        <Image source={require("../../assets/images/google.png")} className="absolute left-8" style={{ width: wp(6), height: hp(3) }} />
                        <Button onPress={handleGoogleSubmit} title="Continue with Google" className="border-[2px] w-full border-[#9DA6A7] rounded-3xl py-4 text-center " textName="font-bold" textStyle={{ fontSize: RF(17) }} />
                    </View>
                )
            }
            <View className="relative flex flex-row w-full items-center">
                <Image source={require("../../assets/images/facebook.png")} className="absolute left-8" style={{ width: wp(6.2), height: hp(3) }} />
                <Button title="Continue with Facebook" className="border-[2px] w-full border-[#9DA6A7] rounded-3xl py-4 text-center " textName="font-bold" textStyle={{ fontSize: RF(17) }} />
            </View>
            <View className="relative flex flex-row w-full items-center">
                <Image source={require("../../assets/images/x.png")} className="absolute left-8 rounded-full" style={{ width: wp(6), height: hp(3) }} />
                <Button title="Continue with Twitter" className="border-[2px] w-full border-[#9DA6A7] rounded-3xl py-4 text-center " textName="font-bold" textStyle={{ fontSize: RF(17) }} />
            </View>
            <ProfileModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onComplete={() => {
                    setModalVisible(false);
                    // navigate to chat screen
                    routes.replace("/(main)/chat");
                }}
            />
        </View>
    )
}

export default SocialMediaForm
