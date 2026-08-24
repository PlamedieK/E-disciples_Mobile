import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/Context/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@/Context/ThemeContext'
import { ActivitiesType, loadActivities } from '@/services/appelApi'

const Home = () => {
    const { user, logOut, ip, token } = useAuth()
const [bascul, setIsBascul] = useState(true)
const { theme } = useTheme()
const [tabActivities, setTabActivities] = useState<ActivitiesType[]>([])
useEffect(() => {
        loadActivities({setActivities: setTabActivities, ip, token})
}, [ip, token])
return (
<SafeAreaView 
    style={{ backgroundColor: theme.background }} 
    className="flex-1 p-4 justify-between"
>
    {/* En-tête / Profil Utilisateur */}
    <View 
    style={{ borderColor: theme.border }} 
    className="p-4 rounded-2xl border mb-6"
    >
    <Text 
        style={{ color: theme.textPrimary }} 
        className="text-xl font-bold mb-1"
    >
        Bienvenue, {user?.nom || 'Utilisateur'} 👋 Ip: { ip }
    </Text>
    <Text style={{ color: theme.textSecondary }} className="text-sm">
        Rôle : <Text className="font-semibold">{user?.role || 'Non défini'}</Text>
    </Text>
    </View>
        {
            tabActivities ? (
                <>
                    <FlatList
                    data={tabActivities}
                        renderItem={({ item }) =>
                            <View>
                                <Text> {item.activity} </Text>
                            </View>
                        }
                    keyExtractor={item => item.id.toString()}
                    />
                </>
            ) : (
                <View>
                <Text> Vide </Text>
            </View>
            )
    }
      {/* Exemple de bouton d'action / Bascule */}
    {/* <TouchableOpacity 
    activeOpacity={0.8}
    onPress={() => setIsBascul(!bascul)}
    style={{ backgroundColor: theme.background, borderColor: theme.border }} 
    className="p-4 rounded-xl border items-center justify-center mb-4"
    >
    <Text style={{ color: theme.textPrimary }} className="font-medium">
        Basculer : {bascul ? 'Option A' : 'Option B'}
    </Text>
    </TouchableOpacity> */}

        {/* Bouton de Déconnexion */}
    
    <TouchableOpacity 
    activeOpacity={0.8}
            onPress={logOut}
            style={{ backgroundColor: theme.btnLogout }}
            className=" p-4 rounded-xl items-center justify-center mt-auto"
    >
    <Text  className="text-white font-semibold">
        Se déconnecter
    </Text>
    </TouchableOpacity>
</SafeAreaView>
)
}

export default Home