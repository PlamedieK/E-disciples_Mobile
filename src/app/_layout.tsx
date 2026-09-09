import { Stack } from "expo-router";
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Réduit à 3s pour améliorer le UX
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View
        style={{ backgroundColor: theme.background }}
        className="flex-1 items-center justify-between py-12 px-6"
      >
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

        {/* Section Supérieure : Logo & Loader */}
        <View className="items-center justify-center flex-1 w-full max-w-sm">
          <View className="relative items-center justify-center mb-6">
            <View className="w-28 h-28 rounded-full bg-white dark:bg-slate-800 items-center justify-center shadow-lg shadow-black/10 p-2 border border-slate-100 dark:border-slate-700">
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
        <View className="w-full max-w-sm p-6 rounded-2xl border border-slate-200/60 dark:border-slate-700/50 shadow-sm" style={{ backgroundColor: theme.background }} >
          <Text
            style={{ color: theme.textPrimary }}
            className="text-xs italic font-medium text-center leading-relaxed"
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
            <View className="ml-2 my-1 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
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
        <Stack.Screen name="index" options={{ title: "" }} />
        {user && (
          <Stack.Screen name="components/pages/Home" options={{ title: "" }} />
        )}
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
