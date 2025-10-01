import { ActivityIndicator, Image,  Text, View } from 'react-native'
import React, { useState } from 'react'
import { auth } from '@/src/config/firebaseConfig'
import Button from '@/src/components/Button'
import { Logout } from '@/src/services/auth'
import { useRouter } from 'expo-router'

const Chat = () => {
    const user = auth().currentUser
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const routes = useRouter()
    const handleLogout = async () => {
        try {
            setIsLoading(true)
            await Logout()
        } catch (error) {
            console.log("error while logout")
        } finally {
            routes.navigate("/(auth)")
            setIsLoading(false)
        }
    }
    return (
        <View className='flex flex-1 justify-center items-center bg-[#dda15e] px-4'>
            <Text>{user?.displayName}</Text>
            {user?.photoURL && (
                <Image source={{ uri: user.photoURL }} style={{ width: 100, height: 100 }} />
            )}
            {
                isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <Button title="logout" className='border-2 px-4 my-4 py-4  rounded-3xl w-full' onPress={handleLogout} />
                )
            }
        </View>
    )
}

export default Chat
