import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@react-native-vector-icons/ionicons'
import { UserRole } from '@/Context/AuthContext'
import { useTheme } from '@/Context/ThemeContext'

const ListDeroulant = () => {
    const roles = Object.values(UserRole)
    const [selectedRole, setSelectedRole] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const { theme } = useTheme()
  return (
    <View>
      <FlatList
              data={roles}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const isSelected = selectedRole === item
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setSelectedRole(item as UserRole)
                      setIsOpen(false)
                    }}
                    className={`flex-row items-center justify-between p-4 mb-2 rounded-xl ${
                      isSelected ? 'bg-blue-600/20 border border-blue-500' : 'bg-slate-900/50'
                    }`}
                  >
                    <Text
                      style={{ color: isSelected ? '#3B82F6' : theme.textPrimary }}
                      className="text-base font-semibold"
                    >
                      {item}
                    </Text>
                    {isSelected && (
                      <Ionicons name="checkmark-circle" size={22} color="#3B82F6" />
                    )}
                  </TouchableOpacity>
                )
              }}
            />
    </View>
  )
}

export default ListDeroulant