// firebaseConfig.ts
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import firebase from '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

firebase.setReactNativeAsyncStorage(AsyncStorage);
// ✅ Just export the native SDK instances

export { auth, firestore };
