
import { Alert } from "react-native";

export type ParticipationItem = {
  activityId: number;
  isPresence: boolean;
  invite: number;
  date: string | Date | null;
  heure?: string | null;
};
export const formatDateToYMD = (dateInput: Date | string | null): string | null => {
  if (!dateInput) return null;
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return null;

  // Extrait directement la partie YYYY-MM-DD
  return d.toISOString().split("T")[0];
};
export type ParticipationPayload = {
  discipleId: string | number;
  statistiques: ParticipationItem[];
};

type SaveParticipation = {
  ip: string | null;
  token: string | null;
  payload: ParticipationPayload;
  setIsSubmtting: (submit: boolean) => void;
};

export const saveParticipations = async ({
  ip,
  token,
  payload,
  setIsSubmtting,
}: SaveParticipation) => {
  if (!ip) {
    Alert.alert("Erreur", "L'adresse IP du serveur est manquante.");
    return { success: false, message: "IP manquante" };
  }

  const url = `http://${ip}:3333/api/stats`;

  try {
    setIsSubmtting(true);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      const errorMsg = data.message || `Erreur HTTP ${res.status}`;
      Alert.alert("Erreur", errorMsg);
      return { success: false, message: errorMsg };
    }

    Alert.alert(
      "Succès",
      "Les statistiques ont été enregistrées avec succès !",
    );
    return { success: true, data };
  } catch (error: any) {
    console.error("Erreur d'envoi des stats :", error);
    Alert.alert(
      "Erreur réseau",
      "Impossible de contacter le serveur. Vérifiez votre connexion.",
    );
    return { success: false, message: error.message };
  } finally {
    setIsSubmtting(false);
  }
};
