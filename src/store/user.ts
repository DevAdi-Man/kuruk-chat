import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
    uid: string;
    displayName: string;
    bio: string;
    email: string;
    photoURL: string;
    phoneNumber: string;
}

type UserState = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage", // name of the item in storage
      storage: createJSONStorage(() => AsyncStorage), // use AsyncStorage for React Native
    }
  )
);  