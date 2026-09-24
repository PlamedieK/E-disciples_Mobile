import { useAuth } from "@/Context/AuthContext";
import { useTheme } from "@/Context/ThemeContext";
import {
  ActivitiesType,
  loadActivities,
  searchDisciple,
} from "@/services/appelApi";
import { formatDateToYMD, saveParticipations } from "@/services/Participations";
import Ionicons from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputDateLabel from "../InputDateLabel";
import AutoCompleteDisciple, { Disciple } from "../modals/AutoCompleteDisciple";

// Structure pour stocker les états de chaque activité
type ActivityFormState = {
  [activityId: number]: {
    isPresence: boolean;
    invite: number;
    date: Date | null;
  };
};

const Statistiques = () => {
  const { ip, token } = useAuth();
  const { theme } = useTheme();
  // Recherche disciple
  const [searchQuery, setSearchQuery] = useState("");
  const [resultatQuery, setResultatQuery] = useState<Disciple[]>([]);
  const [selectedDisciple, setSelectedDisciple] = useState<Disciple | null>(
    null,
  );
  const [isSearching, setIsSearching] = useState(false);
  // Activités & Saisies
  const [tabActivities, setTabActivities] = useState<ActivitiesType[]>([]);
  const [isLoadingActivities, setIsLoadingActivities] = useState(true);
  const [formData, setFormData] = useState<ActivityFormState>({});
  const [isSubmittting, setIsSubmtting] = useState(false);

  // Chargement initial des activités
  useEffect(() => {
    loadActivities({ setActivities: setTabActivities, ip, token }).finally(() =>
      setIsLoadingActivities(false),
    );
  }, [ip, token]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      return;
    }
    const delayDebounceFn = setTimeout(() => {
      searchDisciple({
        ip,
        token,
        searchQuery,
        setResultatQuery,
        setIsLoading: setIsSearching,
      });
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [ip, searchQuery, token]);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setResultatQuery([]);
      setSelectedDisciple(null);
    }
  };

  const handleSelectDisciple = (item: Disciple) => {
    setSearchQuery(`${item.prename} ${item.name}`.trim());
    setSelectedDisciple(item);
    setResultatQuery([]);
  };

  // Mise à jour de l'état d'une activité spécifique
  const updateActivityValue = (
    activityId: number,
    field: "isPresence" | "invite" | "date",
    value: boolean | number | Date | null,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [activityId]: {
        isPresence: prev[activityId]?.isPresence ?? false,
        invite: prev[activityId]?.invite ?? 0,
        date: prev[activityId]?.date ?? null,
        [field]: value,
      },
    }));
  };
  const handleSubmit = async () => {
    if (!selectedDisciple) {
      Alert.alert("Attention", "Veuillez sélectionner un disciple.");
      return;
    }
    // Vérifier qu'au moins une donnée a été saisie
    if (Object.keys(formData).length === 0) {
      Alert.alert("Attention", "Aucune statistique n'a été renseignée.");
      return;
    }
    const formatPayloadForApi = () => {
      const statistiquesArray = Object.entries(formData).map(
        ([activityId, values]) => ({
          activityId: Number(activityId),
          isPresence: values.isPresence,
          invite: values.invite,
          date: formatDateToYMD(values.date),
        }),
      );
      return {
        discipleId: selectedDisciple!.id,
        statistiques: statistiquesArray,
      };
    };
    // Alert.alert("Alert Title", "My Alert Msg", [
    //   {
    //     text: "Cancel",
    //     onPress: () => console.log("Cancel Pressed"),
    //     style: "cancel",
    //   },
    //   { text: "OK", onPress: () => console.log("OK Pressed") },
    // ]);
    const payload = formatPayloadForApi();
    console.log(payload);
    Alert.alert(
      "Avertissement",
      `Voulez-vous vraiment confirmer pour le Fr ${selectedDisciple.prename} ${selectedDisciple.name}`,
      [
        {
          text: "Cancel",
          style: "cancel",
          //onPress: ()
        },
        {
          text: "Valider",
          onPress: async () => {
            const result = await saveParticipations({
              ip,
              token,
              payload,
              setIsSubmtting,
            });
            if (result.success) {
              // Reconstitution/Réinitialisation du formulaire si nécessaire
              setFormData({});
              setSelectedDisciple(null);
              setSearchQuery('')
            }
          },
        },
      ],
    );
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: theme.background }}
      className="flex-1 w-full px-4 py-2 md:max-w-xl md:mx-auto"
    >
      {/* En-tête */}
      <View className="flex-row items-center pb-4 space-x-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="items-center justify-center w-10 h-10 bg-blue-600 rounded-xl"
        >
          <Ionicons name="arrow-back" size={20} color="#FFF" />
        </TouchableOpacity>
        <Text
          style={{ color: theme.textPrimary }}
          className="ml-3 text-xl font-bold tracking-wide"
        >
          Saisir les Statistiques
        </Text>
      </View>

      {/* Champ de recherche Disciple */}
      <View className="relative z-50 w-full mb-4">
        <View
          style={{
            backgroundColor: theme.formColor || "#0F172A",
            borderColor: theme.border || "#1E293B",
          }}
          className="flex-row items-center px-4 border-2 h-14 rounded-2xl"
        >
          <Ionicons name="search-outline" size={20} color="#94A3B8" />
          <TextInput
            value={searchQuery}
            onChangeText={handleSearchChange}
            placeholder="Rechercher un disciple..."
            placeholderTextColor="#64748B"
            style={{ color: theme.textPrimary }}
            className="flex-1 ml-3 text-sm font-medium"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearchChange("")}>
              <Ionicons name="close-circle" size={20} color="#64748B" />
            </TouchableOpacity>
          )}
        </View>

        {/* Résultats d'autocomplétion */}
        {resultatQuery.length > 0 && (
          <AutoCompleteDisciple
            disciple={resultatQuery}
            isLoading={isSearching}
            onSelect={handleSelectDisciple}
          />
        )}
      </View>

      {/* Formulaire des activités quand un disciple est sélectionné */}
      {selectedDisciple ?
        <View className="flex-1">
          {isLoadingActivities ?
            <ActivityIndicator size="large" color="#2563EB" className="mt-8" />
          : <FlatList
              data={tabActivities}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 24 }}
              renderItem={({ item }) => {
                const currentData = formData[item.id] || {
                  isPresence: false,
                  invite: 0,
                  date: null,
                };

                return (
                  <View
                    style={{
                      backgroundColor: theme.formColor || "#0F172A",
                      borderColor: theme.border || "#1E293B",
                    }}
                    className="p-4 mb-3 space-y-3 border rounded-2xl"
                  >
                    {/* Nom de l'activité */}
                    <Text
                      className="text-base font-bold"
                      style={{ color: theme.textPrimary }}
                    >
                      {item.activity}
                    </Text>

                    {/* Présence (Boutons Toggle) */}
                    <View className="flex-row items-center justify-between pt-2">
                      <Text
                        className="text-sm font-medium"
                        style={{ color: theme.textSecondary }}
                      >
                        Présence
                      </Text>

                      <View
                        className="flex-row p-1 mb-2 border bg-slate-800/50 rounded-xl "
                        style={{ borderColor: theme.border }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            updateActivityValue(item.id, "isPresence", true)
                          }
                          className={`px-4 py-1.5 rounded-lg ${
                            currentData.isPresence ? "bg-blue-600" : (
                              "bg-transparent"
                            )
                          }`}
                        >
                          <Text className="text-xs font-bold text-white">
                            Oui
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() =>
                            updateActivityValue(item.id, "isPresence", false)
                          }
                          className={`px-4 py-1.5 rounded-lg ${
                            !currentData.isPresence ? "bg-slate-700" : (
                              "bg-transparent"
                            )
                          }`}
                        >
                          <Text className="text-xs font-bold text-slate-300">
                            Non
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <InputDateLabel
                      value={currentData.date}
                      onChange={(text) =>
                        updateActivityValue(item.id, "date", text)
                      }
                    />
                    {/* Nombre d'invités */}
                    {item.activity !== "Formation" &&
                      item.activity !== "Evangelisation" && (
                        <View className="flex-row items-center justify-between pt-4 border-t border-slate-800">
                          <Text
                            className="text-sm font-medium"
                            style={{ color: theme.textSecondary }}
                          >
                            Nombre d&apos;invités
                          </Text>
                          <TextInput
                            keyboardType="numeric"
                            value={String(currentData.invite)}
                            onChangeText={(text) =>
                              updateActivityValue(
                                item.id,
                                "invite",
                                parseInt(text) || 0,
                              )
                            }
                            style={{
                              color: theme.textPrimary,
                              backgroundColor: theme.background,
                            }}
                            className="text-center border rounded-lg w-14 h-14 border-slate-700"
                          />
                        </View>
                      )}
                  </View>
                );
              }}
              ListFooterComponent={
                <TouchableOpacity
                  onPress={handleSubmit}
                  className="items-center w-full py-4 mt-4 bg-blue-600 shadow-lg rounded-2xl shadow-blue-600/30"
                >
                  {isSubmittting ?
                    <ActivityIndicator color="#FFF" />
                  : <Text className="text-base font-bold text-white">
                      Enregistrer les statistiques
                    </Text>
                  }
                </TouchableOpacity>
              }
            />
          }
        </View>
      : <View className="items-center justify-center flex-1 p-6 opacity-60">
          <Ionicons name="person-circle-outline" size={64} color="#64748B" />
          <Text
            style={{ color: theme.textSecondary }}
            className="mt-2 text-sm font-medium text-center"
          >
            Veuillez sélectionner un disciple ci-dessus pour afficher la grille
            des activités.
          </Text>
        </View>
      }
    </SafeAreaView>
  );
};

export default Statistiques;
