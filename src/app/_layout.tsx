import { Stack } from "expo-router";
//import "./global.css"; // Ajustez le chemin selon l'emplacement du fichier
import "../../global.css"; 



export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }}/>;
}
