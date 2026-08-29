import { Alert } from "react-native";

export const defaultpsw = "123456789";

type createProps = {
  ip: string | null;
  token: string | null;
  selectedIdDb: string | number | null;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  passwordConfirmed: string;
  dateBaptism?: Date | string | null; // Assouplissement du type
  selectedRole: string;
  setIsLoadingCreate: (loading: boolean) => void;
};

export const createDisciple = async ({
  ip,
  token,
  selectedIdDb,
  nom,
  prenom,
  email,
  password,
  passwordConfirmed,
  selectedRole,
  dateBaptism,
  setIsLoadingCreate,
}: createProps) => {
  if (!nom.trim() || !prenom.trim() || !selectedIdDb) {
    Alert.alert(
      "Champs requis",
      "Veuillez remplir au moins le nom, le prénom et le partage biblique.",
    );
    return;
  }

  setIsLoadingCreate(true);
  const url = `http://${ip}:3333/api/new-disciples`;

  try {
    const ctlr = new AbortController();
    const timeoutId = setTimeout(() => ctlr.abort(), 6000);

    // Formater la date en YYYY-MM-DD de manière sécurisée
    let formattedDate: string | null = null;
    if (dateBaptism) {
      const d = new Date(dateBaptism);
      if (!isNaN(d.getTime())) {
        formattedDate = d.toISOString().split("T")[0];
      }
    }

    const payload = {
      name: nom.trim(),
      prename: prenom.trim(),
      email: email.trim(),
      password,
      passwordConfirmed,
      role: selectedRole,
      dbId: selectedIdDb ? Number(selectedIdDb) : null,
      dateBaptism: formattedDate,
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      signal: ctlr.signal,
      body: JSON.stringify(payload),
    });

    clearTimeout(timeoutId);

    const data = await res.json();

    if (!res.ok) {
      // Afficher le message exact de validation retourné par Adonis/VineJS
      console.log("Erreur Server Backend:", JSON.stringify(data, null, 2));

      if (res.status === 401) {
        throw new Error("Session expirée ou non autorisée (401)");
      }

      const serverMessage =
        data.message ||
        data.errors?.[0]?.message ||
        `Erreur serveur HTTP ${res.status}`;
      throw new Error(serverMessage);
    }

    Alert.alert("Succès", ` ${data.message} ✅ !`);
    console.log("User créé avec succès: ", JSON.stringify(data, null, 2));
  } catch (error: any) {
    console.log("Erreur lors de la création:", error);
    Alert.alert(
      "Attention ⚠️",
      error.message || "Impossible d'enregistrer le disciple sur le serveur",
    );
  } finally {
    setIsLoadingCreate(false);
  }
};
