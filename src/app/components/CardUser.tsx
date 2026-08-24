import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Ionicons from '@react-native-vector-icons/ionicons'
import { useAuth } from '@/Context/AuthContext'
import { useTheme } from '@/Context/ThemeContext'

export const CardUser = () => {
  const { user } = useAuth()
  const { theme } = useTheme()

  // Génère les initiales si aucune photo de profil n'est fournie
    const getInitials = (name?: string, prenom?: string) => {
    const fullName = `${prenom} ${name || ''}`.trim()
    if (!fullName) return 'U'
    return fullName
        .split(/\s+/) // Découpage robuste gérant plusieurs espaces
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
}

return (
<View
    style={{
    backgroundColor: theme.formColor || '#0F172A',
    borderColor: theme.border || '#1E293B',
    }}
    className="p-4 rounded-3xl border mb-6 flex-row items-center justify-between shadow-sm"
>
    <View className="flex-row items-center flex-1 mr-3">
    {/* Avatar avec Badge en ligne */}
    <View className="relative">

        <View className="w-14 h-14 rounded-2xl bg-blue-600/20 border-2 border-blue-500/30 items-center justify-center">
            <Text className="text-blue-500 text-lg font-bold">
            {getInitials(user?.nom, user?.prenom)}
            </Text>
        </View>
        {/* Badge statut connecté */}
        <View 
        style={{ borderColor: theme.formColor || '#0F172A' }}
        className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2"
        />
    </View>
    {/* Textes de profil */}
    <View className="ml-3 flex-1 justify-center">
        {/* <Text
        style={{ color: theme.textPrimary }}
        className="text-lg font-bold tracking-wide"
        numberOfLines={1}
        >
        Hey, {user?.prenom || 'U'}  {user?.nom || 'U'}  👋
        </Text> */}  
        <Text 
        style={{ color: theme.textSecondary }} 
        className="font-medium text-[10px] mt-0.5"
        >
            Phone :{' '}
                    <Text
                        style={{ color: theme.textSecondary }}
                        className="font-base text-[10px] text-blue-500">
                {user?.phone || '+243 --- --- ---'}
            </Text>        
            </Text>
                
        <Text 
        style={{ color: theme.textSecondary }} 
        className="font-medium text-[10px] mt-0.5"
        >
            Emai :{' '}
                    <Text
                        style={{ color: theme.textSecondary }}
                        className="font-base text-[10px] text-blue-500">
                {user?.email || ''}
            </Text>        
        </Text>
        <Text 
        style={{ color: theme.textSecondary }} 
        className="font-base text-[10px] mt-0.5"
        >
        Rôle :{' '}
                    <Text
                        style={{ color: theme.textSecondary }}
                        className="font-medium text-blue-500">
            {user?.role || 'Non défini'}
        </Text>
        </Text>
    </View>
    </View>
    {/* Bouton Option / Profil (Facultatif) */}
    <TouchableOpacity
    activeOpacity={0.7}
    className="w-10 h-10 rounded-xl bg-blue-500/10 items-center justify-center border border-blue-500/20"
    >
    <Ionicons name="notifications-outline" size={20} color="#3B82F6" />
    </TouchableOpacity>
</View>
)
}

export default CardUser