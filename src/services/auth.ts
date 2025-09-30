import { auth } from "../config/firebaseConfig";

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
