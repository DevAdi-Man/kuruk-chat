import storage from "@react-native-firebase/storage";
import { Platform } from "react-native";

export const uploadImageAsync = async (uri: string, userId: string) => {
  try {
    const filename = uri.substring(uri.lastIndexOf("/") + 1);
    const storageRef = storage().ref(`profile_images/${userId}/${filename}`);
    console.log("Uploading to:", storageRef); 
    let uploadUri = uri;
    if (Platform.OS === "ios") uploadUri = uri.replace("file://", "");
    await storageRef.putFile(uploadUri);
    const downloadedURL =  await storageRef.getDownloadURL();
    return downloadedURL;
  } catch (error) {
    console.log("Image upload failed:", error);
    throw error;
  }
};
