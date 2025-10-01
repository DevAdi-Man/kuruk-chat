// firebaseConfig.ts
import Constants from "expo-constants"
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import firebase from '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from "@react-native-google-signin/google-signin";

firebase.setReactNativeAsyncStorage(AsyncStorage);
const webClientId = Constants.expoConfig?.extra?.webClientId
// console.log("--> ", webClientId)
GoogleSignin.configure({
    webClientId
});
export { auth, firestore, GoogleSignin };
