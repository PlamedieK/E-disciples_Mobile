import { Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StatusBar, Text, View } from "react-native";
import "../../global.css";

import AuthProvider, { useAuth } from "@/Context/AuthContext";
import { ThemeProvider, useTheme } from "@/Context/ThemeContext";
import ToggleMode from "./components/ToggleMode";

export function RootLayoutContent() {
  const { theme, isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // 1. Gestion du Splash Screen (3 secondes)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // 2. Protection globale des routes : redirection automatique vers l'index si déconnecté
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <View
        style={{ backgroundColor: theme.background }}
        className="items-center justify-between flex-1 px-6 py-12"
      >
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

        {/* Section Supérieure : Logo & Loader */}
        <View className="items-center justify-center flex-1 w-full max-w-sm">
          <View className="relative items-center justify-center mb-6">
            <View className="items-center justify-center p-2 bg-white border rounded-full shadow-lg w-28 h-28 dark:bg-slate-800 shadow-black/10 border-slate-100 dark:border-slate-700">
              <Image
                style={{ height: "100%", width: "100%", borderRadius: 50 }}
                resizeMode="contain"
                source={require("@/assets/images/logo-ecik.jpg")}
              />
            </View>
          </View>

          <ActivityIndicator size="large" color="#1E3A8A" className="mb-3" />

          <Text
            style={{ color: theme.textSecondary }}
            className="text-[11px] font-bold opacity-60"
          >
            Chargement en cours...
          </Text>
        </View>

        {/* Section Inférieure : Carte Verset Biblique */}
        <View
          className="w-full max-w-sm p-6 border shadow-sm rounded-2xl border-slate-200/60 dark:border-slate-700/50"
          style={{ backgroundColor: theme.background }}
        >
          <Text
            style={{ color: theme.textPrimary }}
            className="text-xs italic font-medium leading-relaxed text-center"
          >
            « Allez, faites de toutes les nations des disciples... et
            enseignez-leur à observer tout ce que je vous ai prescrit... »
          </Text>
          <Text
            style={{ color: theme.textSecondary }}
            className="mt-3 text-[11px] font-bold text-center uppercase tracking-wider opacity-80"
          >
            Matthieu 28:19-20
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <Stack
        screenOptions={{
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: theme.background },
          headerTitleStyle: { color: theme.textPrimary, fontWeight: "600" },
          headerLeft: () => (
            <View className="my-1 ml-2 overflow-hidden border rounded-full border-slate-200 dark:border-slate-700">
              <Image
                style={{ height: 36, width: 36 }}
                source={require("@/assets/images/logo-ecik.jpg")}
              />
            </View>
          ),
          headerRight: () => (
            <View className="mr-2">
              <ToggleMode />
            </View>
          ),
        }}
      >
        {/* Tous les écrans sont déclarés à plat de manière stable sans conditionnel */}
        <Stack.Screen name="index" options={{ title: "" }} />
        <Stack.Screen name="components/pages/Home" options={{ title: "" }} />
        <Stack.Screen
          name="components/pages/Statistiques"
          options={{ title: "" }}
        />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RootLayoutContent />
      </ThemeProvider>
    </AuthProvider>
  );
}

// import { Stack } from "expo-router";
// import { useEffect, useState } from "react";
// import { ActivityIndicator, Image, StatusBar, Text, View } from "react-native";
// import "../../global.css";

// import AuthProvider, { useAuth } from "@/Context/AuthContext";
// import { ThemeProvider, useTheme } from "@/Context/ThemeContext";
// import ToggleMode from "./components/ToggleMode";

// export function RootLayoutContent() {
//   const { theme, isDark } = useTheme();
//   const [isLoading, setIsLoading] = useState(true);
//   const { user } = useAuth();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 3000); // Réduit à 3s pour améliorer le UX
//     return () => clearTimeout(timer);
//   }, []);

//   if (isLoading) {
//     return (
//       <View
//         style={{ backgroundColor: theme.background }}
//         className="items-center justify-between flex-1 px-6 py-12"
//       >
//         <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

//         {/* Section Supérieure : Logo & Loader */}
//         <View className="items-center justify-center flex-1 w-full max-w-sm">
//           <View className="relative items-center justify-center mb-6">
//             <View className="items-center justify-center p-2 bg-white border rounded-full shadow-lg w-28 h-28 dark:bg-slate-800 shadow-black/10 border-slate-100 dark:border-slate-700">
//               <Image
//                 style={{ height: "100%", width: "100%", borderRadius: 50 }}
//                 resizeMode="contain"
//                 source={require("@/assets/images/logo-ecik.jpg")}
//               />
//             </View>
//           </View>

//           <ActivityIndicator size="large" color="#1E3A8A" className="mb-3" />

//           <Text
//             style={{ color: theme.textSecondary }}
//             className="text-[11px] font-bold opacity-60"
//           >
//             Chargement en cours...
//           </Text>
//         </View>

//         {/* Section Inférieure : Carte Verset Biblique */}
//         <View
//           className="w-full max-w-sm p-6 border shadow-sm rounded-2xl border-slate-200/60 dark:border-slate-700/50"
//           style={{ backgroundColor: theme.background }}
//         >
//           <Text
//             style={{ color: theme.textPrimary }}
//             className="text-xs italic font-medium leading-relaxed text-center"
//           >
//             « Allez, faites de toutes les nations des disciples... et
//             enseignez-leur à observer tout ce que je vous ai prescrit... »
//           </Text>
//           <Text
//             style={{ color: theme.textSecondary }}
//             className="mt-3 text-[11px] font-bold text-center uppercase tracking-wider opacity-80"
//           >
//             Matthieu 28:19-20
//           </Text>
//         </View>
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1, backgroundColor: theme.background }}>
//       <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

//       <Stack
//         screenOptions={{
//           headerShown: true,
//           headerShadowVisible: false,
//           headerStyle: { backgroundColor: theme.background },
//           headerTitleStyle: { color: theme.textPrimary, fontWeight: "600" },
//           headerLeft: () => (
//             <View className="my-1 ml-2 overflow-hidden border rounded-full border-slate-200 dark:border-slate-700">
//               <Image
//                 style={{ height: 36, width: 36 }}
//                 source={require("@/assets/images/logo-ecik.jpg")}
//               />
//             </View>
//           ),
//           headerRight: () => (
//             <View className="mr-2">
//               <ToggleMode />
//             </View>
//           ),
//         }}
//       >
//         <Stack.Screen name="index" options={{ title: "" }} />
//             <Stack.Screen
//               name="components/pages/Home"
//           options={{
//             title: "",

//            }}
//             />
//             <Stack.Screen
//               name="components/pages/Statistiques"
//               options={{ title: "" }}
//             />
//       </Stack>
//     </View>
//   );
// }

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <ThemeProvider>
//         <RootLayoutContent />
//       </ThemeProvider>
//     </AuthProvider>
//   );
// }
