import { BibleSharingType } from "@/constants/Colors";
import { useAuth, UserRole } from "@/Context/AuthContext";
import { useTheme } from "@/Context/ThemeContext";
import { searhPartageBiblique } from "@/services/appelApi";
import { createDisciple, defaultpsw } from "@/services/Disciple";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import InputTextLabel from "../Input";
import InputDateLabel from "../InputDateLabel";
import AutoCompleteCard from "./AutoCompleteCard";
import PhotoPicker from "../PhotoPicker";

type FormDisciplesProps = {
  modalVisible: boolean;
  setModalVisible: (state: boolean) => void;
};

const FormDisciples = ({
  modalVisible,
  setModalVisible,
}: FormDisciplesProps) => {
  const { theme } = useTheme();
  const { ip, token } = useAuth();

  // États du formulaire
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [selectedIdDb, setSelectedIdDb] = useState<string | number | null>(
    null,
  );
  const [email, setEmail] = useState("");
  const password = defaultpsw;
  const passwordConfirmed = defaultpsw;
  const [dateBaptism, setDateBaptism] = useState<Date | null>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null)

  // Correction 1 : selectedRole est une valeur unique (ou vide), pas un tableau
  const [selectedRole, setSelectedRole] = useState<UserRole | "">("");

  // Recherche & Autocomplétion
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [resultatQuery, setResultatQuery] = useState<BibleSharingType[]>([]);

  // 1. Handler pour la saisie : reinitialise immédiatement la liste si < 2 caractères
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    setSelectedIdDb(null);
    if (text.trim().length < 2) {
      setResultatQuery([]);
    }
  };

  // 2. useEffect sans setState synchrone : gère uniquement l'anti-rebond (debounce) d'appel API
  useEffect(() => {
    if (searchQuery.trim().length < 2) return;
    const delayDebounceFn = setTimeout(() => {
      searhPartageBiblique({
        searchQuery,
        setIsLoading,
        setResultatQuery,
        ip,
        token,
      });
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, ip, token]);

  const clearZone = () => {
    setNom("");
    setPrenom("");
    setEmail("");
    setDateBaptism(new Date());
    setSearchQuery("");
    setResultatQuery([]);
    setSelectedRole("");
    setSelectedIdDb(null);
    setPhotoUri(null)
  };

  const handleSave = () => {
    Alert.alert("Avertissement", "Voulez-vous enregister ?", [
      {
        text: "Valider",
        onPress: () =>
          createDisciple({
            ip,
            token,
            selectedIdDb,
            nom,
            prenom,
            email,
            password,
            passwordConfirmed,
            selectedRole,
            dateBaptism: dateBaptism ?? undefined, // Convertit null en undefined
            setIsLoadingCreate,
          }),
      }, {
        text: "Annuler",
        //onPress: () => setModalVisible(false)
        style: 'cancel'
      }
    ]);
    // Réinitialisation et fermeture
    clearZone();
    setModalVisible(false);
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
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
            style={{
              backgroundColor: theme.background,
              borderColor: theme.border,
            }}
            className="rounded-t-3xl border-t-2 p-6 max-h-[85%]"
          >
            <ScrollView showsVerticalScrollIndicator={false}>
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
                  Nouveau Disciple{" "}
                  <Ionicons
                    name="person-add"
                    size={26}
                    style={{ color: theme.textPrimary }}
                  />
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    clearZone();
                    setModalVisible(false);
                  }}
                  
                >
                  <Ionicons name="close-circle" size={28} style={{ color: theme.textPrimary }} />
                </TouchableOpacity>
              </View>

              {/* Formulaire */}
              <View className="space-y-4">

                <View>
                  <PhotoPicker photoUri={photoUri} onSelectPhoto={setPhotoUri} />
                </View>
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

                {/* Champ Partage Biblique avec Autocomplétion */}
                <View className="relative z-50">
                  <InputTextLabel
                    value={searchQuery}
                    onChangeText={handleSearchChange}
                    placeholder="Recherche..."
                    textLabel="Partage Biblique"
                    placeholderColor="#94A3B8"
                    keyboardType="default"
                    isPassword={false}
                  />

                  {/* Dynamic rendering sécurisé sans l'opérateur non-null (!) */}
                  {resultatQuery && resultatQuery.length > 0 && (
                    <AutoCompleteCard
                      data={resultatQuery.map((item) => ({
                        id: item.id,
                        nameDb: item.nameDb,
                      }))}
                      isLoading={isLoading}
                      onSelect={(item) => {
                        setSearchQuery(item.nameDb);
                        setSelectedIdDb(item.id);
                        setResultatQuery([]);
                      }}
                    />
                  )}
                </View>

                <InputTextLabel
                  value={email}
                  onChangeText={setEmail}
                  placeholder="pkimpambudi@gmail.com"
                  textLabel="Email"
                  placeholderColor="#94A3B8"
                  keyboardType="email-address"
                  isPassword={false}
                />

                <Text
                  style={{ color: theme.textPrimary }}
                  className="text-base py-1.5"
                >
                  Rôle
                </Text>

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
                    selectedValue={selectedRole}
                    onValueChange={(itemValue) => setSelectedRole(itemValue)}
                    dropdownIconColor={theme.textPrimary}
                    style={{
                      color: theme.textPrimary,
                      backgroundColor: "transparent",
                    }}
                  >
                    <Picker.Item
                      style={{
                        color: theme.textPrimary,
                        backgroundColor: theme.background,
                      }}
                      label="Sélectionner un rôle..."
                      value=""
                    />
                    {Object.values(UserRole).map((role) => (
                      <Picker.Item
                        key={role}
                        label={role}
                        value={role}
                        style={{
                          color: theme.textPrimary,
                          backgroundColor: theme.background,
                        }}
                      />
                    ))}
                  </Picker>
                </View>

                <InputDateLabel
                  value={dateBaptism}
                  onChange={setDateBaptism}
                  textLabel="Date Bapteme"
                />
              </View>
              {/* Bouton d'action */}
              <TouchableOpacity
                activeOpacity={0.8}
                disabled={isLoadingCreate}
                onPress={handleSave}
                className={`bg-blue-600 p-4 rounded-xl items-center justify-center mt-6 shadow-md shadow-blue-500/30
                     ${
                       isLoadingCreate ?
                         `${theme.buttonDisabled} border-slate-300`
                       : `${theme.background} active:bg-blue-[#1e293b]`
                     }`}
              >
                {isLoadingCreate ?
                  <ActivityIndicator size={20} color={"#ffffff"} />
                : <Text className="text-white font-bold text-base">
                    Enregistrer
                  </Text>
                }
              </TouchableOpacity>
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default FormDisciples;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 16,
    overflow: "hidden",
  },
});
