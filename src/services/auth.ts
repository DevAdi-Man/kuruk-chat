import { auth } from "../config/firebaseConfig";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
export async function loginWithPhone(phoneNumber: string) {
    try {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        return confirmation; // later use confirmation.confirm(code)
    } catch (error) {
        console.error("Phone login error:", error);
        throw error;
    }
}

// Confirm OTP
export async function confirmOTP(confirmation: any, code: string) {
    try {
        const userCredential = await confirmation.confirm(code);
        return userCredential.user;
    } catch (error) {
        console.error("OTP confirmation error:", error);
        throw error;
    }
}

//create user with email and password
export async function createUserWithEmail(email: string, password: string) {
    try {
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Email sign up error:", error);
        throw error;
    }
}

//Sign up with social account
export const googleSocialAccount = async () => {
    //check kre ga ke google play serivce device support kr rha hai ya nhi
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })

    //get user id token
    const signInResult = await GoogleSignin.signIn();
    console.log("signInResult: ",signInResult)
    let idToken = signInResult.data?.idToken
    console.log("token: ", idToken)
    if (!idToken) {
        throw new Error("No id token found");
    }

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCredential)

}
