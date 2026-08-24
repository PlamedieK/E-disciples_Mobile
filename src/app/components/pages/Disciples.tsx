import React, { useState, useMemo } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@react-native-vector-icons/ionicons'
import { useTheme } from '@/Context/ThemeContext'
import { router } from 'expo-router'

// Type de données Disciple
interface Disciple {
  id: string
  name: string
  phone: string
  status: 'Actif' | 'En formation' | 'Inactif'
  avatarUrl?: string
}

// Données de démonstration
const MOCK_DISCIPLES: Disciple[] = [
  { id: '1', name: 'Jean-Marc Kabanga', phone: '+243 81 234 5678', status: 'Actif' },
  { id: '2', name: 'Grace Tshilombo', phone: '+243 99 876 5432', status: 'En formation' },
  { id: '3', name: 'Samuel Mukendi', phone: '+243 82 345 6789', status: 'Actif' },
  { id: '4', name: 'Deborah Kanyinda', phone: '+243 90 123 4567', status: 'Inactif' },
]

const FILTERS = ['Tous', 'Actif', 'En formation', 'Inactif']

const Disciples = () => {
  const { theme } = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('Tous')

  // Filtrage dynamique en temps réel
  const filteredDisciples = useMemo(() => {
    return MOCK_DISCIPLES.filter((disciple) => {
      const matchesSearch =
        disciple.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        disciple.phone.includes(searchQuery)

      const matchesFilter =
        selectedFilter === 'Tous' || disciple.status === selectedFilter

      return matchesSearch && matchesFilter
    })
  }, [searchQuery, selectedFilter])

  // Générer des initiales si pas de photo
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }

  // Couleur du badge selon le statut
  const getStatusBadgeStyle = (status: Disciple['status']) => {
    switch (status) {
      case 'Actif':
        return { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' }
      case 'En formation':
        return { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' }
      default:
        return { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/30' }
    }
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: theme.background }}
      className="flex-1 p-4"
    >
      {/* En-tête avec bouton retour */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center space-x-3">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-xl items-center justify-center border border-slate-800 bg-slate-900"
          >
            <Ionicons name="arrow-back" size={20} color={theme.textPrimary || '#FFF'} />
          </TouchableOpacity>
          <Text
            style={{ color: theme.textPrimary }}
            className="text-2xl font-bold ml-2"
          >
            Disciples
          </Text>
        </View>

        {/* Bouton Ajouter */}
        <TouchableOpacity
          activeOpacity={0.8}
          className="w-10 h-10 rounded-xl bg-blue-600 justify-center items-center shadow-md shadow-blue-500/30"
          onPress={() => router.push('/create-disciple' as any)}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Barre de Recherche */}
      <View
        style={{
          backgroundColor: theme.formColor || '#0F172A',
          borderColor: theme.border || '#1E293B',
        }}
        className="flex-row items-center h-14 px-4 rounded-2xl border-2 mb-4"
      >
        <Ionicons name="search-outline" size={20} color="#94A3B8" />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Rechercher par nom ou téléphone..."
          placeholderTextColor="#64748B"
          style={{ color: theme.textPrimary }}
          className="flex-1 ml-3 text-base font-medium"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#64748B" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filtres Rapides (Badges Horizon) */}
      <View className="mb-4">
        <FlatList
          horizontal
          data={FILTERS}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            const isSelected = selectedFilter === item
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setSelectedFilter(item)}
                className={`px-4 py-2 rounded-xl mr-2 border ${
                  isSelected
                    ? 'bg-blue-600 border-blue-500'
                    : 'bg-slate-900 border-slate-800'
                }`}
              >
                <Text
                  className={`text-xs font-bold ${
                    isSelected ? 'text-white' : 'text-slate-400'
                  }`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )
          }}
        />
      </View>

      {/* Liste des Disciples */}
      <FlatList
        data={filteredDisciples}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => {
          const badgeStyle = getStatusBadgeStyle(item.status)
          return (
            <TouchableOpacity
              activeOpacity={0.75}
              style={{
                backgroundColor: theme.formColor || '#0F172A',
                borderColor: theme.border || '#1E293B',
              }}
              className="p-4 rounded-2xl border-2 mb-3 flex-row items-center justify-between shadow-sm"
            >
              <View className="flex-row items-center flex-1 mr-2">
                {/* Avatar */}
                {item.avatarUrl ? (
                  <Image
                    source={{ uri: item.avatarUrl }}
                    className="w-12 h-12 rounded-xl border border-blue-500/30"
                  />
                ) : (
                  <View className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 items-center justify-center">
                    <Text className="text-blue-500 font-bold text-base">
                      {getInitials(item.name)}
                    </Text>
                  </View>
                )}

                {/* Infos */}
                <View className="ml-3 flex-1">
                  <Text
                    style={{ color: theme.textPrimary }}
                    className="text-base font-bold"
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                  <Text className="text-slate-400 text-xs mt-0.5">
                    {item.phone}
                  </Text>
                </View>
              </View>

              {/* Statut Badge */}
              <View
                className={`px-2.5 py-1 rounded-lg border ${badgeStyle.bg} ${badgeStyle.border}`}
              >
                <Text className={`text-[10px] font-bold ${badgeStyle.text}`}>
                  {item.status}
                </Text>
              </View>
            </TouchableOpacity>
          )
        }}
        ListEmptyComponent={() => (
          <View className="items-center justify-center py-12">
            {/* <Ionicons name="search-discontent" size={48} color="#475569" /> */}
            <Text
              style={{ color: theme.textSecondary }}
              className="text-base font-semibold mt-3 text-center"
            >
              Aucun disciple trouvé
            </Text>
            <Text className="text-slate-500 text-xs text-center mt-1">
              Essayez un autre terme de recherche ou filtre.
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Disciples