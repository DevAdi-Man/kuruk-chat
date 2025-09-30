import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import { BlurView } from "expo-blur";
import Entypo from "@expo/vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";
import { EmojiPopup } from "react-native-emoji-popup";
import { useUserStore } from "../store/user";
import firestore from "@react-native-firebase/firestore";
import { auth } from "../config/firebaseConfig";
import Button from "./Button";
import { hp, RF } from "../utils/dimensions";
import { uploadImageAsync } from "../services/imageStorage";

type ProfileModalProps = {
  visible: boolean;
  onClose: () => void;
  onComplete?: () => void;
};

const ProfileModal = ({ visible, onClose, onComplete }: ProfileModalProps) => {
  const [displayName, setDisplayName] = useState<string>("");
  const [photoURL, setPhotoURL] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [isDisplayNameFocused, setIsDisplayNameFocused] = useState(false);
  const [isBioFocused, setIsBioFocused] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  const setUser = useUserStore((state) => state.setUser);
  const maxLenghtname = 25;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoURL(result.assets[0].uri);
    }
  };

  const handleSaveProfile = async () => {
    if (!displayName.trim()) {
      Alert.alert("Error", "Display name cannot be empty");
      return;
    }

    try {
      setSavingProfile(true);
      const user = auth().currentUser;
      if (!user) throw new Error("No user found");

      let uploadedPhotoURL = photoURL;
      if (photoURL) {
        uploadedPhotoURL = await uploadImageAsync(photoURL, user.uid);
      }

      await firestore()
        .collection("users")
        .doc(user.uid)
        .set({
          uid: user.uid,
          displayName,
          photoURL: uploadedPhotoURL || null,
          bio: bio || "",
          phoneNumber: user.phoneNumber || "",
          email: user.email || "",
          createdAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });

      setUser({
        uid: user.uid,
        displayName,
        photoURL: uploadedPhotoURL || "",
        bio: bio || "",
        phoneNumber: user.phoneNumber || "",
        email: user.email || "",
      });

      onClose();
      onComplete && onComplete();
    } catch (error) {
      console.log("Save profile error:", error);
      Alert.alert("Error", "Failed to save profile");
    } finally {
      setSavingProfile(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <BlurView
        intensity={70}
        tint="light"
        style={{ backgroundColor: "#a2d2ff" }}
        className="flex-1 pt-24 p-6"
      >
        <Text
          className="text-[#0E2629] text-center font-medium"
          style={{ fontSize: RF(40) }}
        >
          Profile Info
        </Text>
        <Text
          className="mt-4 text-center text-[#9DA6A7]"
          style={{ fontSize: RF(18) }}
        >
          Please provide your name and optional profile photo
        </Text>

        <Pressable
          onPress={pickImage}
          className="rounded-full relative mt-8 self-center w-32 h-32 bg-[#d4a373] flex justify-center items-center"
        >
          <Entypo name="camera" size={38} color="black" />
          {photoURL && (
            <Image
              source={{ uri: photoURL }}
              className="w-full absolute h-full rounded-full"
            />
          )}
        </Pressable>

        <View className="mt-8 mx-4 flex relative flex-row items-center gap-4">
          <TextInput
            placeholder="Enter your name"
            placeholderTextColor="#888888"
            value={displayName}
            onFocus={() => setIsDisplayNameFocused(true)}
            onBlur={() => setIsDisplayNameFocused(false)}
            onChangeText={(text) =>
              text.length <= maxLenghtname && setDisplayName(text)
            }
            className={`border-[2px] pl-4 w-full py-4 text-lg text-[#0E2629] ${isDisplayNameFocused ? "border-[#008192]" : "border-[#9DA6A7]"}  rounded-2xl`}
          />
          <Text className="absolute right-14 top-[20px] text-[#9DA6A7]">
            {displayName.length}/{maxLenghtname}
          </Text>
          <Pressable className="absolute right-4 top-5">
            <EmojiPopup
              onEmojiSelected={(select) =>
                setDisplayName((prev) => prev + " " + select)
              }
            >
              <Entypo name="emoji-flirt" size={24} color="#9DA6A7" />
            </EmojiPopup>
          </Pressable>
        </View>

        <TextInput
          placeholder="Bio (About you)"
          placeholderTextColor="#888888"
          value={bio}
          onFocus={() => setIsBioFocused(true)}
          onBlur={() => setIsBioFocused(false)}
          onChangeText={setBio}
          className={`border-[2px] ${isBioFocused ? "border-[#008192]" : "border-[#9DA6A7]"} mt-4 mx-4 px-4 py-4 text-lg text-[#0E2629] rounded-2xl`}
          style={{ height: hp(16), textAlignVertical: "top" }}
          multiline
          numberOfLines={4}
        />

        <View className="flex-1 mx-4" />

        {savingProfile ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button
            title="Continue"
            className="border-2 border-[#9DA6A7] rounded-3xl py-4 bg-black mb-4 mx-4"
            textName="text-white"
            onPress={handleSaveProfile}
            textStyle={{ fontSize: RF(18) }}
          />
        )}
      </BlurView>
    </Modal>
  );
};

export default ProfileModal;
