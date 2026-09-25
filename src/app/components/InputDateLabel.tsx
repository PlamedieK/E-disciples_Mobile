import { useTheme } from "@/Context/ThemeContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

type InputDateLabelProps = {
  textLabel?: string;
  value: string | Date | null;
  onChange: (date: Date) => void;
};

const InputDateLabel = ({
  textLabel,
  value,
  onChange,
}: InputDateLabelProps) => {
  const { theme } = useTheme();
  const [showPicker, setShowPicker] = useState(false);

  // Formater la date pour l'affichage (YYYY-MM-DD)
  const formatDate = (date?: string | Date | null) => {
    if (!date) return "Sélectionner une date";
    const d = new Date(date);
    return isNaN(d.getTime()) ?
        "Sélectionner une date"
      : d.toISOString().split("T")[0];
  };

  // Obtenir un objet Date valide pour DateTimePicker
  const getValidDate = (val: string | Date | null): Date => {
    if (!val) return new Date();
    const d = new Date(val);
    return isNaN(d.getTime()) ? new Date() : d;
  };

  return (
    <View className="w-full mb-4">
      {textLabel && (
        <Text style={{ color: theme.textPrimary }} className="text-base py-1.5">
          {textLabel}
        </Text>
      )}

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setShowPicker(true)}
        style={{
          backgroundColor: theme.formColor || "#0F172A",
          borderColor: theme.border || "#1E293B",
        }}
        className="flex-row items-center h-14 px-4 rounded-2xl border-2 justify-between"
      >
        <Text
          style={{ color: value ? theme.textPrimary || "#FFFFFF" : "#94A3B8" }}
          className="text-base font-medium"
        >
          {formatDate(value)}
        </Text>
        <Ionicons name="calendar-outline" size={20} color="#94A3B8" />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={getValidDate(value)}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onValueChange={(_, selectedDate) => {
            if (Platform.OS === "android") {
              setShowPicker(false);
            }
            if (selectedDate) {
              onChange(selectedDate);
            }
          }}
          onDismiss={() => setShowPicker(false)}
        />
      )}
    </View>
  );
};

export default InputDateLabel;
