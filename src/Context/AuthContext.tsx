import { router } from "expo-router";
import { createContext, ReactNode, useContext, useState } from "react";
import { Alert } from "react-native";

export enum UserRole {
  user = "user",
  diri_db = "diri_db",
  diri_ministere = "diri_ministere",
  //admin = 'admin'
}
export type User = {
  id: string; // "76c3880a-8273-4628-9bce-b92b0030ba86",
  email: string;
  nom: string;
  prenom: string;
  username: string | null;
  EstChuter: boolean;
  idDb: number;
  phone: string;
  dateBaptem: string;
  role: UserRole;
  token: string;
  nomDb: string;
};
// Remplacement du type IpType par un simple string
type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  ip: string | null; // Objet simplifié en string
  setip: (ip: string | null) => void; // Retrait du '?' facultatif
  logOut: () => void;
  token: string | null;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [ip, setip] = useState<string | null>(null);
  const token = user?.token || null;
  const logOut = () => {
    Alert.alert("Avertissement ⚠️", "Voulez-vous vous déconnecter ? ", [
      {
        text: "Oui",
        onPress: () => router.push("/"),
        //return  ()  =>  setUser(null),
      },
      {
        text: "Non",
        style: "cancel",
      },
    ]);
  };
  return (
    <AuthContext.Provider value={{ user, setUser, logOut, ip, setip, token }}>
      {children}
      {/* <Text>AuthContext</Text> */}
    </AuthContext.Provider>
  );
};
// Hook personnalisé pour consommer le context facilement
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider",
    );
  }
  return context;
};
export default AuthProvider;
