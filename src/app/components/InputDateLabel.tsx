import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import DateTimePicker, {
DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import Ionicons from '@react-native-vector-icons/ionicons'
import { useTheme } from '@/Context/ThemeContext'

type InputDateLabelProps = {
textLabel?: string
value: Date
onChange: (date: Date) => void
}

const InputDateLabel = ({ textLabel, value, onChange }: InputDateLabelProps) => {
const { theme } = useTheme()
const [showPicker, setShowPicker] = useState(false)

// Formater la date en FR (JJ/MM/AAAA)
const formatDate = (date: Date) => {
return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
})
}

const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
if (Platform.OS === 'android') {
    setShowPicker(false)
}
if (selectedDate) {
    onChange(selectedDate)
}
}

return (
<View className="w-full mb-4">
    {textLabel && (
    <Text
        style={{ color: theme.textPrimary }}
        className="text-base text-white py-1.5">
        {textLabel}
    </Text>
    )}

    {/* Bouton du champ Date */}
    <TouchableOpacity
    activeOpacity={0.7}
    onPress={() => setShowPicker(true)}
    style={{
        backgroundColor: theme.formColor || '#0F172A',
        borderColor: theme.border || '#1E293B',
    }}
    className="flex-row items-center h-14 px-4 rounded-2xl border-2 justify-between"
    >
    <Text
        style={{ color: theme.textPrimary || '#FFFFFF' }}
        className="text-base font-medium"
    >
        {formatDate(value)}
    </Text>
    <Ionicons name="calendar-outline" size={20} color="#94A3B8" />
    </TouchableOpacity>

    {/* Sélecteur Natif Android / iOS */}
    {showPicker && (
    <DateTimePicker
        value={value}
        mode="date"
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        onChange={handleChange}
        maximumDate={new Date()} // Empêche les dates dans le futur si nécessaire
    />
    )}
</View>
)
}

export default InputDateLabel