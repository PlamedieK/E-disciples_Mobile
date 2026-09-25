import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { useAuth } from '@/Context/AuthContext'
import { useTheme } from '@/Context/ThemeContext'
import Ionicons from '@react-native-vector-icons/ionicons'

const LogOut = () => {
    const { logOut } = useAuth()
    const { theme } = useTheme()
    return (
    <View className='flex-1 pb-3'>
        <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={logOut}
                    style={{ backgroundColor: theme.btnLogout }}
                    className="p-4 rounded-xl  gap-4 items-center flex-row justify-center mt-auto"
                >
                    <Text className="text-white font-semibold">
                    Se déconnecter
                </Text>
                <Ionicons name='log-out-outline' size={30} color={'#fff'}/>
                </TouchableOpacity>
                
        </View >
    ) 
}

export default LogOut