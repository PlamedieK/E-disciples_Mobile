import { Stack } from "expo-router";
//import "./global.css"; // Ajustez le chemin selon l'emplacement du fichier
import "../../global.css"; 
import { ThemeProvider, useTheme } from "@/Context/ThemeContext";
import ToggleMode from "./components/ToggleMode";
import { ActivityIndicator, View, Text, Image, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { TabsHost } from "react-native-screens/lib/typescript/components/tabs/host";



export  function RootLayoutContent() {
  const { theme, isDark } = useTheme()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])
  if (isLoading) {
        return (
          <View 
          style={{ backgroundColor: theme.background }} 
          className="flex-1 items-center justify-center space-y-4"
          >
            <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
                <Image style={{ height: 120, width: 120 }} source={require('@/assets/images/logo-ecik.jpg')} />
                <ActivityIndicator
                  size="large"
                  color={'#1E3A8A'}
                  className="mt-4"
                />
                <Text style={{ color: theme.textSecondary }} className="mt-2 font-mono text-xs font-semibold">[ CHARGEMENT... ]</Text>
        </View>
    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* Navigation principale Expo Router */}
      <Stack 
      screenOptions={{ 
        headerShown: true, // Header activé
        headerStyle: { backgroundColor: theme.background },
          headerTitleStyle: { color: theme.textPrimary },
          headerLeft: () => <View style={{ backgroundColor: theme.background }}  className="px-3 rounded-full">
          <Image style={{ height: 45, width: 45 }} source={require('@/assets/images/logo-ecik.jpg')} />
        </View>,
        headerRight: () => <ToggleMode />, // Place le Toggle à l'extrême gauche
      }} 
      >
      <Stack.Screen name="index" options={{ title: '' }} />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider> 
      <RootLayoutContent />
    </ThemeProvider>
  );
}