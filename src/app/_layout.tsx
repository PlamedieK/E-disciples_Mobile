import { Stack } from "expo-router";
//import "./global.css"; // Ajustez le chemin selon l'emplacement du fichier
import "../../global.css"; // Les deux "../" permettent de remonter de deux dossiers (sortir de app, puis de src)


export default function RootLayout() {
  return <Stack />;
}
