/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuth } from "@/Context/AuthContext";
import { useTheme } from "@/Context/ThemeContext";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CardUser } from "../CardUser";
import LogOut from "../LogOut";
import MenuOptions from "../MenuOptions";

const Home = () => {
  const { user, ip, token } = useAuth();
  const { theme } = useTheme();
  // const [tabActivities, setTabActivities] = useState<ActivitiesType[]>([]);
  // const [value, setValue] = useState(null);
  // // Génère les initiales si aucune photo de profil n'est fournie
  // useEffect(() => {
  //   loadActivities({ setActivities: setTabActivities, ip, token });
  // }, [ip, token]);
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
            Bienvenu(e) {user?.prenom || "U"} {user?.nom || ""} 👋
          </Text>
        </View>
      </View>
      <View>
        {/* En-tête / Profil Utilisateur */}
        <CardUser />
        {/* Les options du menu */}
        <MenuOptions />
        {/* {tabActivities && (
          <>
            <View
              style={[
                styles.container,
                {
                  backgroundColor: theme.background,
                  borderColor: theme.border,
                },
              ]}
            >
              <Picker
                selectedValue={value}
                onValueChange={setValue}
                style={[{ color: theme.textPrimary }]}
              >
                {tabActivities.map((tab) => (
                  <Picker.Item
                    key={tab.id}
                    label={tab.activity}
                    value={tab.id}
                    style={[{ color: theme.textPrimary }]}
                  />
                ))}
              </Picker>
            </View>
          </>
        )} */}
      </View>

      {/* Bouton de Déconnexion */}
      <LogOut />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 8,
    overflow: "hidden",
  },
});
