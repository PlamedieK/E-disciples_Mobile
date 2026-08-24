import { View, Text, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import { router } from 'expo-router'
import { useAuth } from '@/Context/AuthContext'
import { useTheme } from '@/Context/ThemeContext'
import Ionicons from '@react-native-vector-icons/ionicons'

const MenuOptions = () => {
    const { user } = useAuth()
    const { theme } = useTheme()
    //const { theme } = useTheme()
    const actions = useMemo(() => [
    { id: '1', title: 'Statistiques', icon: 'bar-chart-outline', color: '#3B82F6', route: '/components/pages/Statistiques' },
    ...(user?.role === 'diri_ministere' ? [{ id: '2', title: 'Créer Disciple', icon: 'person-add-outline', color: '#10B981', route: '/components/pages/Disciples' }] : []),
    { id: '3', title: 'Créer DB', icon: 'book-outline', color: '#F59E0B', route: '/components/pages/PartageBiblique' },
    { id: '4', title: 'Études', icon: 'school-outline', color: '#8B5CF6', route: '/components/pages/Etudes' },
    ], [user])
  return (
    <View>
                 
         <View className="flex-row flex-wrap justify-between gap-y-4 px-1 mb-6">
             {actions.map((item) => (
             <TouchableOpacity
                 key={item.id}
                 activeOpacity={0.75}
                 // ✅ CORRECTION 2 : On exécute le router.push UNIQUEMENT au clic
                 onPress={() => {
                     if (item.route) router.push(item.route as any)
                     // router.push('/components/pages/Statistiques')
                 }}
                 style={{
                 backgroundColor: theme.formColor || '#0F172A',
                 borderColor: theme.border || '#1E293B',
                 }}
                 className="w-[48%] py-5 px-4 rounded-2xl border-2 flex-col items-center justify-center space-y-3 shadow-lg shadow-black/20 active:scale-95"
             >
                 <View
                 style={{ backgroundColor: `${item.color}1E` }}
                 className="w-12 h-12 rounded-xl items-center justify-center"
                 >
                 <Ionicons name={item.icon as any} size={24} color={item.color} />
                 </View>
                 <Text
                 style={{ color: theme.textPrimary || '#FFFFFF' }}
                 className="text-sm font-bold text-center tracking-wide"
                 >
                 {item.title}
                 </Text>
             </TouchableOpacity>
             ))}
         </View>
    </View>
  )
}

export default MenuOptions