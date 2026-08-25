import React, { useState } from 'react'
import { View, Text, Modal, TouchableOpacity, Alert } from 'react-native'
import Ionicons from '@react-native-vector-icons/ionicons'
import { useTheme } from '@/Context/ThemeContext'
import InputTextLabel from '../Input'

type FormDisciplesProps = {
  modalVisible: boolean
  setModalVisible: (state: boolean) => void
}

const FormDisciples = ({ modalVisible, setModalVisible }: FormDisciplesProps) => {
  const { theme } = useTheme()
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
const [email, setEmail] = useState('')
const [nomDB, setNomDB] = useState('')

  const handleSave = () => {
    if (!nom.trim() || !prenom.trim()) {
      Alert.alert('Champs requis', 'Veuillez remplir au moins le nom et le prénom.')
      return
    }

    // Réinitialisation et fermeture
    setNom('')
    setPrenom('')
    setEmail('')
    setModalVisible(false)
  }

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      {/* Overlay sombre d'arrière-plan avec fermeture au clic */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setModalVisible(false)}
        className="flex-1 bg-black/60 justify-end"
      >
        {/* Conteneur de la carte modale (Bottom Sheet) */}
        <TouchableOpacity
          activeOpacity={1}
          style={{ backgroundColor: theme.background, borderColor: theme.border }}
          className="rounded-t-3xl border-t-2 p-6 max-h-[85%]"
        >
          {/* Poignée d'indicateur */}
          <View className="items-center mb-3">
            <View className="w-12 h-1.5 bg-slate-700 rounded-full" />
          </View>

          {/* En-tête de la Modal */}
          <View className="flex-row justify-between items-center mb-5 pb-3 border-b border-slate-800">
            <Text
              style={{ color: theme.textPrimary }}
              className="text-xl font-bold tracking-wide"
            >
              Nouveau Disciple
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close-circle" size={26} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Formulaire */}
          <View className="space-y-4">
            <InputTextLabel
              value={nom}
              onChangeText={setNom}
              placeholder="Nom de famille"
              textLabel="Nom"
              placeholderColor="#94A3B8"
              keyboardType="default"
              isPassword={false}
            />

            <InputTextLabel
              value={prenom}
              onChangeText={setPrenom}
              placeholder="Prénom"
              textLabel="Prénom"
              placeholderColor="#94A3B8"
              keyboardType="default"
              isPassword={false}
            />

            <InputTextLabel
              value={email}
              onChangeText={setEmail}
              placeholder="pkimpambudi@gmail.com"
              textLabel="Email"
              placeholderColor="#94A3B8"
              keyboardType="email-address"
              isPassword={false}
            />
                    
            <InputTextLabel
              value={email}
              onChangeText={setEmail}
              placeholder="pkimpambudi@gmail.com"
              textLabel="Email"
              placeholderColor="#94A3B8"
              keyboardType="email-address"
              isPassword={false}
            />
        </View>
                  

          {/* Bouton d'action */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSave}
            className="bg-blue-600 p-4 rounded-xl items-center justify-center mt-6 shadow-md shadow-blue-500/30"
          >
            <Text className="text-white font-bold text-base">Enregistrer</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}

export default FormDisciples