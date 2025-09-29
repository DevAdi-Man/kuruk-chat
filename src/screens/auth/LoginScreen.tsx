import { Pressable, Text, View } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Entypo from '@expo/vector-icons/Entypo'
import OTPInput from '@/src/components/OTPInput'

const Login = () => {
    return (
        <View className='flex-1 bg-blue-500 border-2  p-4'>
            <View className='flex-row ' >
                <Pressable>
                    <MaterialIcons name="arrow-back-ios-new" size={24} color="black" />
                </Pressable>
                <Pressable>
                    <Entypo name="dots-three-horizontal" size={24} color="black" />
                </Pressable>
            </View>
            <OTPInput />
        </View>
    )
}

export default Login

