import { useTheme } from "@/Context/ThemeContext";
import Ionicons from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

type SearchFetchProps = {
  setModalVisible?: (set: boolean) => void;
  setSearchQuery: (search: string) => void;
  searchQuery: string;
};
const SearchFetch = ({
  setModalVisible,
  searchQuery,
  setSearchQuery,
}: SearchFetchProps) => {
  const { theme } = useTheme();
  return (
    <View style={{ backgroundColor: theme.background }} className="flex-1 p-4">
      {/* En-tête avec bouton retour */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center space-x-3">
          <TouchableOpacity
            onPress={() => router.back()}
            // style={{ backgroundColor: theme.background, borderColor: theme.border }}
            className="w-10 h-10 rounded-xl items-center justify-center border bg-blue-600"
          >
            <Ionicons name="arrow-back" size={20} color={"#FFF"} />
          </TouchableOpacity>
          <Text
            style={{ color: theme.textPrimary }}
            className="text-2xl font-bold ml-2"
          >
            Disciples
          </Text>
        </View>

        {/* Bouton Ajouter : Ouvre la Modal avec setModalVisible(true) */}
        {setModalVisible && (
          <TouchableOpacity
            activeOpacity={0.8}
            className="w-10 h-10 rounded-xl bg-blue-600 justify-center items-center shadow-md shadow-blue-500/30"
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>

      {/* Barre de Recherche */}
      <View
        style={{
          backgroundColor: theme.formColor || "#0F172A",
          borderColor: theme.border || "#1E293B",
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
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#64748B" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchFetch;
