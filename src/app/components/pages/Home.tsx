import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from '@/Context/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@/Context/ThemeContext'
import { ActivitiesType, loadActivities } from '@/services/appelApi'
import { Picker } from '@react-native-picker/picker'
import Ionicons from '@react-native-vector-icons/ionicons'
import { router } from 'expo-router'
import { CardUser } from '../CardUser'
import MenuOptions from '../MenuOptions'
import LogOut from '../LogOut'

const Home = () => {
const { user, logOut, ip, token } = useAuth()
const { theme } = useTheme()
const [tabActivities, setTabActivities] = useState<ActivitiesType[]>([])
const [value, setValue] = useState(null)
  // Génère les initiales si aucune photo de profil n'est fournie
const getInitials = (name?: string) => {
if (!name) return 'U'
return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()
}
useEffect(() => {
loadActivities({ setActivities: setTabActivities, ip, token })
}, [ip, token])
return (
<SafeAreaView 
    style={{ backgroundColor: theme.background }} 
    className="flex-1 px-4 py-0"
    >
    <View className="flex-row items-center justify-between mb-4">
    {/* Avatar avec Badge en ligne */}
    <View className="relative">
    <Text
        style={{ color: theme.textPrimary }}
        className="text-[12px] font-medium "
        numberOfLines={1}
        >
            Bienvenu(e) {user?.prenom || 'U'} {user?.nom || ''} 👋</Text>
    </View>
    </View>
    <View>
    {/* En-tête / Profil Utilisateur */}
    <CardUser />
            
    {/* Les options du menu */}
    <MenuOptions />      
    {
        tabActivities &&
                (
                <>
                    <View style={[styles.container, { backgroundColor: theme.background, borderColor: theme.border}]}>
                            <Picker
                                selectedValue={value}
                                    onValueChange={setValue}
                                    style={[{ color: theme.textPrimary }]}
                                >   
                            {
                                tabActivities.map(tab => (
                                    <Picker.Item key={tab.id} label={tab.activity} value={tab.id} style={[{color: theme.textPrimary}]} />
                                ))}
                        </Picker>
                    </View>
                </>
            )
        }
        </View> 

      {/* Bouton de Déconnexion */}
        <LogOut />
    </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
})

// import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useAuth } from '@/Context/AuthContext'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { useTheme } from '@/Context/ThemeContext'
// import { ActivitiesType, loadActivities } from '@/services/appelApi'
// import { Picker } from '@react-native-picker/picker'
// import { Dropdown, IDropdownRef } from 'react-native-element-dropdown'
// import { DropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model'
// import Ionicons from '@react-native-vector-icons/ionicons'
// import { router } from 'expo-router'

// const Home = () => {
//     const { user, logOut, ip, token } = useAuth()
// const [bascul, setIsBascul] = useState(true)
// const { theme } = useTheme()
// const [tabActivities, setTabActivities] = useState<ActivitiesType[]>([])
// const [selectedActivity, setSelectedActivity] = useState('')
//     const [value, setValue] = useState(null);
//     const actions = [
//         { id: '1', title: 'Statistiques', icon: 'bar-chart-outline', color: '#3B82F6', route: router.push('/')},
//         { id: '2', title: 'Créer Disciple', icon: 'person-add-outline', color: '#10B981' },
//         { id: '3', title: 'Créer DB', icon: 'book-outline', color: '#F59E0B' },
//         { id: '4', title: 'Études', icon: 'school-outline', color: '#8B5CF6' },
//     ];
    
// useEffect(() => {
//         loadActivities({setActivities: setTabActivities, ip, token})
// }, [ip, token])
    
// return (
//     <SafeAreaView 
//         style={{ backgroundColor: theme.background }} 
//         className="flex-1 p-4 justify-between"
//     >
//     {/* En-tête / Profil Utilisateur */}
//     <View 
//     style={{ borderColor: theme.border }} 
//     className="p-4 rounded-2xl border mb-6"
//     >
//         <Text 
//             style={{ color: theme.textPrimary }} 
//             className="text-xl font-bold mb-1"
//         > Bienvenue, {user?.nom || 'Utilisateur'} 👋</Text>
//         <Text style={{ color: theme.textSecondary }} className="text-sm">
//             Rôle : <Text className="font-semibold">{user?.role || 'Non défini'}</Text>
//         </Text>
//     </View>
        
//     <View className="flex-row flex-wrap justify-between gap-y-4 px-1">
//         {actions.map((item) => (
//             <TouchableOpacity
//                 key={item.id}
//                 activeOpacity={0.75}
//                 onPress={() =>
//                     item.route
//                     //console.log(`Action: ${item.title}`)
//                 }
//                 style={{
//                 backgroundColor: theme.formColor || '#0F172A',
//                 borderColor: theme.border || '#1E293B',
//                 }}
//                 className="w-[48%] py-5 px-4 rounded-2xl border-2 flex-col items-center justify-center space-y-3 shadow-lg shadow-black/20 active:scale-95"
//                 >
//                     {/* Badge Icône */}
//                     <View
//                     style={{ backgroundColor: `${item.color}1E` }} // 12% d'opacité pour le fond d'icône
//                     className="w-12 h-12 rounded-xl items-center justify-center"
//                     >
//                         <Ionicons name={item.icon as any} size={24} color={item.color} />
//                     </View>
//                     {/* Libellé du bouton */}
//                     <Text
//                     style={{ color: theme.textPrimary || '#FFFFFF' }}
//                     className="text-sm font-bold text-center tracking-wide"
//                     >
//                         {item.title}
//                     </Text>
//             </TouchableOpacity>
//         ))}
//     </View>
//     );
//     {
//         tabActivities &&
//         (
//             <>
//                 <View style={[styles.container, { backgroundColor: theme.background, borderColor: theme.border}]}>
//                     <Picker
//                         selectedValue={value}
//                         onValueChange={setValue}
//                         style={[{ color: theme.textPrimary }]}
//                     >   
//                         {
//                             tabActivities.map(tab => (
//                                 <Picker.Item key={tab.id} label={tab.activity} value={tab.id} style={[{color: theme.textPrimary}]} />
//                             ))}
//                     </Picker>
//                 </View>
//             </>
//         )
//     }
//     {/* Bouton de Déconnexion */}
//     <TouchableOpacity 
//     activeOpacity={0.8}
//             onPress={logOut}
//             style={{ backgroundColor: theme.btnLogout }}
//             className=" p-4 rounded-xl items-center justify-center mt-auto"
//     >
//     <Text  className="text-white font-semibold">
//         Se déconnecter
//     </Text>
//     </TouchableOpacity>
// </SafeAreaView>
// )
// }

// export default Home

// const styles = StyleSheet.create({
//     container: {
//     borderWidth: 2,
//     //borderColor: '#CBD5E1',
//     borderRadius: 8,
//     overflow: 'hidden',
//     },
// });

