// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
// } from "react-native";
// import Ionicons from "@react-native-vector-icons/ionicons";
// import { useTheme } from "@/Context/ThemeContext";

// type AutoCompleteItem = {
//   id: string | number;
//   title: string;
//   subtitle?: string;
// };

import {  DiscipleType } from "@/constants/Colors";
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
export type AutoCompleteItem = {
    id: number;
    day?: string;
    hour?: string;
    site?: string;
    diriId?: string;
    nameDb: string;
    disciples?: DiscipleType[];
  //subtitle?: string;
};
type AutoCompleteCardProps = {
  data: AutoCompleteItem[] | null | undefined;
  onSelect: (item: AutoCompleteItem) => void;
  isLoading?: boolean;
};
const AutoCompleteCard = ({
  data,
  onSelect,
  isLoading,
}: AutoCompleteCardProps) => {
  const { theme } = useTheme();
  if ((!data || data.length === 0) && !isLoading) {
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
      className="absolute left-0 right-6 top-[100%] z-50 mt-1 max-h-48 w-full rounded-xl border shadow-lg"
    >
      <ScrollView
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={true}
      >
        {isLoading ?
          <View className="items-center p-4">
            <ActivityIndicator color={theme.formColor} size={24} />
            <Text
              style={{ color: theme.textPrimary }}
              className="text-ms opacity-60"
            >
              Recherche en cours...
            </Text>
          </View>
        : data?.map((item, index) => (
            <TouchableOpacity
              key={item.id ?? index}
              activeOpacity={0.7}
              onPress={() => onSelect(item)}
              style={{
                borderBottomWidth: index !== data.length - 1 ? 1 : 0,
                borderColor: theme.border,
              }}
              className="flex-row items-center justify-center p-3"
            >
              <View className="flex-1 pr-2">
                <Text
                  style={{ color: theme.textPrimary }}
                  className="text-sm font-semibold"
                  numberOfLines={1}
                >
                  {item.nameDb}
              </Text>
              {item.site && (
                <Text className="text-xs text-slate-400 mt-0.5" numberOfLines={1}>
                  {item.site}
                </Text>
              )}
            </View>
              <Ionicons name="chevron-forward" size={16} color={theme.textSecondary}/>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </View>
  );
};
export default AutoCompleteCard;
// const AutoCompleteCard = ({
//   data,
//   onSelect,
//   isLoading,
// }: AutoCompleteCardProps) => {
//   const { theme } = useTheme();
//   return (
//       <ScrollView
//         nestedScrollEnabled={true}
//         keyboardShouldPersistTaps="handled"
//         showsVerticalScrollIndicator={true}
//       >
//         {isLoading ?
//         : data?.map((item, index) => (
//               <View className="flex-1 pr-2">
//                 <Text
//                   style={{ color: theme.textPrimary }}
//                   className="text-sm font-semibold"
//                   numberOfLines={1}
//                 >
//                   {item.title}
//                 </Text>
//                 {item.subtitle && (
//                   <Text
//                     className="text-xs text-slate-400 mt-0.5"
//                     numberOfLines={1}
//                   >
//                     {item.subtitle}
//                   </Text>
//                 )}
//               </View>
//               <Ionicons name="chevron-forward" size={16} color="#64748B" />
//             </TouchableOpacity>
//           ))
//         }
//       </ScrollView>
//     </View>
//   );
// };

// export default AutoCompleteCard;

const styles = StyleSheet.create({
  container: {
    // Ombre pour iOS et Android
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
