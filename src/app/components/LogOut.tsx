import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { useAuth } from '@/Context/AuthContext'
import { useTheme } from '@/Context/ThemeContext'

const LogOut = () => {
    const { logOut } = useAuth()
    const { theme } = useTheme()
    return (
    <View >
        <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={logOut}
                    style={{ backgroundColor: theme.btnLogout }}
                    className="p-4 rounded-xl items-center justify-center mt-auto"
                >
                    <Text className="text-white font-semibold">
                    Se déconnecter
                    </Text>
                </TouchableOpacity>
                
        </View >
    ) 
}

export default LogOut