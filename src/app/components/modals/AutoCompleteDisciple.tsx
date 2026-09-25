import { UserRole } from "@/constants/Colors";
import { useTheme } from "@/Context/ThemeContext";
import Ionicons from "@react-native-vector-icons/ionicons";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export type DB = {
  id: number;
  day?: string;
  hour?: string;
  site?: string;
  diriId?: string;
  nameDb: string;
};

export type Disciple = {
  id: string;
  name: string;
  prename: string;
  username?: string | null;
  email?: string;
  phone?: string | null;
  role?: UserRole;
  isFall?: boolean;
  dbId?: number;
  dateBaptism?: string;
  bibleSharing: DB;
};

type AutoCompleteCardProps = {
  disciple: Disciple[] | null | undefined;
  onSelect: (item: Disciple) => void;
  isLoading?: boolean;
};

const AutoCompleteDisciple = ({
  disciple,
  onSelect,
  isLoading,
}: AutoCompleteCardProps) => {
  const { theme } = useTheme();

  if ((!disciple || disciple.length === 0) && !isLoading) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          borderColor: theme.border,
        },
      ]}
      className="absolute top-[100%] left-0 right-0 z-50 mt-2 max-h-56 rounded-xl border shadow-lg overflow-hidden"
    >
      <ScrollView
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true} // Activation de la barre verticale
        showsHorizontalScrollIndicator={false} // Désactivation de la barre horizontale inutile
      >
        {isLoading ?
          <View className="items-center p-4">
            <ActivityIndicator color={theme.formColor || "#3b82f6"} size={24} />
            <Text
              style={{ color: theme.textPrimary }}
              className="mt-2 text-sm opacity-60"
            >
              Recherche en cours...
            </Text>
          </View>
        : disciple?.map((item, index) => (
            <TouchableOpacity
              key={item.id ?? index}
              activeOpacity={0.7}
              onPress={() => onSelect(item)}
              style={{
                borderBottomWidth: index !== disciple.length - 1 ? 1 : 0,
                borderColor: theme.border,
              }}
              className="flex-row items-center justify-between p-4" // Correction alignement
            >
              {/* Le ScrollView parasite interne a été supprimé ici */}
              <View className="flex-1 pr-4">
                <Text
                  style={{ color: theme.textPrimary }}
                  className="text-sm font-semibold"
                  numberOfLines={1}
                >
                  {item.prename} {item.name}
                </Text>
                {item.bibleSharing?.nameDb && (
                  <Text
                    className="mt-1 text-xs text-slate-400"
                    numberOfLines={1}
                  >
                    {item.bibleSharing.nameDb}
                  </Text>
                )}
              </View>

              <Ionicons
                name="chevron-forward"
                size={16}
                color={theme.textSecondary || "#64748b"}
              />
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </View>
  );
};

export default AutoCompleteDisciple;

const styles = StyleSheet.create({
  container: {
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
});
