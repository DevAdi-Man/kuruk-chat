// firebaseConfig.ts
import Constants from "expo-constants"
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import firebase from '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from "@react-native-google-signin/google-signin";

firebase.setReactNativeAsyncStorage(AsyncStorage);
// ✅ Just export the native SDK instances
// GoogleSignin.configure({
//     webClientId: Constants.expoConfig?.extra?.webClientId,
//     // offlineAccess:true
// })
const webClientId =  Constants.expoConfig?.extra?.webClientId
console.log("Web Client ID:", webClientId);

GoogleSignin.configure({
    webClientId,
    offlineAccess: true,
});
export { auth, firestore, GoogleSignin };
