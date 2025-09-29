import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  confirmation: FirebaseAuthTypes.ConfirmationResult | null;
  setConfirmation: (c: FirebaseAuthTypes.ConfirmationResult) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      confirmation: null,
      setConfirmation: (c) => set({ confirmation: c }),
    }),
    {
      name: "auth-storage", // key name in storage
      storage: createJSONStorage(() => AsyncStorage), // 👈 use AsyncStorage for React Native
    }
  )
);
