import { useState } from "react";
import { Text, View, ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { handleLoginMobile, healthTest } from "../services/appelApi";
import InputTextLabel from "./components/Input";
import { useTheme } from "@/Context/ThemeContext";

export default function Index() {
  const [ip, setIp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTestingLogin, setIsTestingLogin] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  //const colorScheme = useColorScheme() // 'light' ou 'dark'
  const {theme} = useTheme()

  // if(loadingApp){
  //  //1E3A8A  F8FAFC
  // }
  return (
    <ScrollView>
    <SafeAreaView style={{ backgroundColor: theme.background }} className="flex-1 top-0">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          className="px-5 py-6 space-y-6"
          showsVerticalScrollIndicator={false}
        >

          {/* En-tête Tactique */}
          <View className="items-center mb-2 space-y-1">
            <Text style={{ color: theme.textPrimary }} className="text-2xl font-extrabold text-center tracking-tight">
              React-Native (Mobile) & AdonisJS (Server)
            </Text>
          </View>

          <View className="gap-5">
            {/* Section 1 : Configuration Serveur */}
            <View style={{ backgroundColor: theme.formColor, borderColor: theme.border }} className="px-5 py-5 rounded-2xl border-2  shadow-xl shadow-slate-200/50">
              <View style={{ borderColor: theme.border }} className="flex-row items-center justify-between mb-3 border-b pb-2">
                <Text style={{ color: theme.textSecondary }} className="text-[#F8FAFC] font-extrabold text-xs tracking-widest uppercase">
                  Configuration Réseau
                </Text>
                <View className="h-2.5 w-2.5 rounded-full bg-[#16A34A]" />
              </View>

              <InputTextLabel
                value={ip}
                onChangeText={setIp}
                placeholder="192.168.1.14"
                textLabel="Adresse IP Serveur"
                placeholderColor="#94A3B8"
                keyboardType="numeric"
                isPassword={false}
              />

              <View className="mt-3">
                <TouchableOpacity
                  onPress={() => healthTest({ ip, setIsTesting })}
                  disabled={isTesting}
                  activeOpacity={0.8}
                  className={`flex-row justify-center items-center py-3.5 px-4 rounded-2xl border ${isTesting
                      ? `${theme.buttonDisabled} border-slate-300`
                      : 'bg-[#16A34A] border-[#16A34A] active:bg-[#15803D]'}`}
                >
                  {isTesting ? (
                    <ActivityIndicator size="small" color="#16A34A" />
                  ) : (
                    <Text className="text-white text-sm font-semibold tracking-wider uppercase">
                      Tester la connexion
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Section 2 : Authentification */}
            <View style={{ backgroundColor: theme.formColor, borderColor: theme.border }} className="px-5 py-6 rounded-2xl border-2 shadow-xl shadow-slate-200/50 space-y-2">
              <View style={{ borderColor: theme.border }} className="flex-row items-center justify-between mb-2 border-b  pb-2">
                <Text style={{ color: theme.textSecondary }} className="text-[#F8FAFC] font-extrabold text-xs tracking-widest uppercase">
                  Authentification
                </Text>
              </View>

              <InputTextLabel
                value={email}
                onChangeText={setEmail}
                placeholder="pkimpambudi@gmail.com"
                textLabel="Identifiant / Email"
                placeholderColor="#94A3B8"
                keyboardType="email-address"
                isPassword={false}
              />

              <InputTextLabel
                value={password}
                onChangeText={setPassword}
                placeholder="•••••••••"
                textLabel="Mot de passe"
                placeholderColor="#94A3B8"
                secureTextEntry={true}
                keyboardType="default"
                isPassword={true}
              />

              <View className="pt-4">
                <TouchableOpacity
                  disabled={isTestingLogin}
                  activeOpacity={0.85}
                  onPress={() => handleLoginMobile({
                    ip,
                    email,
                    password,
                    setIsTestingLogin,
                    onSuccess: (userData) => {
                      console.log('Utilisateur connecté :', userData);
                    }
                  })}
                  style={{ backgroundColor: theme.colorBtn, borderColor: theme.border }}
                  className={`flex-row justify-center items-center py-4 rounded-2xl shadow-md ${isTestingLogin
                      ? `${theme.buttonDisabled} border-slate-300`
                      : `${theme.background} active:bg-[#1e293b]`}`}
                >
                  {isTestingLogin ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                  ) : (
                    <Text style={{ color: theme.textSecondary }} className="text-white font-black text-base tracking-widest uppercase">
                      Se Connecter
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>

          </View>

        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  )
}
{/* Liste // type TableauData = {
//   id: number;
//   nom: string;
//   job: string;
// };des données reçues */ }
        {/* <View className="py-3 max-h-48">
          {tabData && tabData.length > 0 ? (
            <FlatList
              data={tabData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View className="py-2 border-b border-slate-800">
                  <Text className="text-white font-semibold">{item.nom}</Text>
                  <Text className="text-slate-400 text-sm">{item.job}</Text>
                </View>
              )}
            />
          ) : (
            <View className="py-3 items-center">
              <Text className="text-slate-500">Aucune donnée disponible</Text>
            </View>
          )}
        </View> */}
// import React, { useState, useEffect } from 'react';
// import { 
//   StyleSheet, 
//   Text, 
//   TextInput, 
//   View, 
//   TouchableOpacity, 
//   ActivityIndicator, 
//   Alert, 
//   SafeAreaView 
// } from 'react-native';
// //import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function App() {
//   const [ipAddress, setIpAddress] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [isTesting, setIsTesting] = useState(false);

//   // 1. Charger l'IP sauvegardée au démarrage
//   // useEffect(() => {
//   //   const loadSavedIp = async () => {
//   //     try {
//   //       const savedIp = await AsyncStorage.getItem('@adonis_backend_ip');
//   //       if (savedIp) {
//   //         setIpAddress(savedIp);
//   //       }
//   //     } catch (error) {
//   //       console.error("Erreur lors de la lecture de l'IP :", error);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };
//   //   loadSavedIp();
//   // }, []);

//   // // 2. Fonction de test de connexion au clic du bouton
//   // const handleTestConnection = async () => {
//   //   // Nettoyer les espaces inutiles
//   //   const cleanIp = ipAddress.trim();

//   //   if (!cleanIp) {
//   //     Alert.alert('Attention', 'Veuillez saisir une adresse IP valide.');
//   //     return;
//   //   }

//   //   setIsTesting(true);

//   //   // Construction de l'URL vers la route GET que nous avons créée dans AdonisJS
//   //   const url = `http://${cleanIp}:3333/api/test-connection`;

//   //   try {
//   //     // Configuration d'une limite de temps (Timeout) à 6 secondes
//   //     const controller = new AbortController();
//   //     const timeoutId = setTimeout(() => controller.abort(), 6000);

//   //     const response = await fetch(url, {
//   //       method: 'GET',
//   //       headers: {
//   //         'Accept': 'application/json',
//   //         'Content-Type': 'application/json',
//   //       },
//   //       signal: controller.signal
//   //     });

//   //     clearTimeout(timeoutId);
//   //     const data = await response.json();

//   //     // Vérification du statut renvoyé par AdonisJS
//   //     if (data && data.status === 'connected') {
//   //       // Sauvegarde de l'IP réussie dans le téléphone
//   //       await AsyncStorage.setItem('@adonis_backend_ip', cleanIp);
        
//   //       Alert.alert(
//   //         'Succès 🎉', 
//   //         `Connexion établie avec succès !\n\nMessage du serveur : ${data.message}`
//   //       );
//   //     } else {
//   //       Alert.alert('Erreur', 'Réponse inattendue du serveur.');
//   //     }

//   //   } catch (error) {
//   //     console.log(error);
//   //     Alert.alert(
//   //       'Échec de connexion ❌',
//   //       `Impossible de joindre le serveur à l'adresse :\n${url}\n\nVérifiez que :\n1. Votre téléphone et votre PC sont sur le MÊME Wi-Fi.\n2. L'IP saisie est correcte.\n3. Le serveur AdonisJS est actif.`
//   //     );
//   //   } finally {
//   //     setIsTesting(false);
//   //   }
//   // };

//   // if (loading) {
//   //   return (
//   //     <View style={styles.center}>
//   //       <ActivityIndicator size="large" color="#4F46E5" />
//   //     </View>
//   //   );
//   // }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.title}>Configuration Backend</Text>
//         <Text style={styles.subtitle}>Saisissez l'IP locale de votre ordinateur pour lier l'application.</Text>

//         <Text style={styles.label}>Adresse IP :</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Ex: 192.168.1.50"
//           value={ipAddress}
//           onChangeText={setIpAddress}
//           keyboardType="numeric"
//           autoCorrect={false}
//           autoCapitalize="none"
//         />

//         <TouchableOpacity 
//           style={[styles.button, isTesting && styles.buttonDisabled]} 
//          // onPress={handleTestConnection}
//           disabled={isTesting}
//         >
//           {isTesting ? (
//             <ActivityIndicator size="small" color="#FFFFFF" />
//           ) : (
//             <Text style={styles.buttonText}>Tester la connexion</Text>
//           )}
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F3F4F6', justifyContent: 'center' },
//   center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   card: { backgroundColor: '#FFFFFF', margin: 20, padding: 24, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
//   title: { fontSize: 22, fontWeight: 'bold', color: '#111827', marginBottom: 6, textAlign: 'center' },
//   subtitle: { fontSize: 14, color: '#6B7280', marginBottom: 24, textAlign: 'center', lineHeight: 20 },
//   label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 },
//   input: { backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 14, fontSize: 16, color: '#111827', marginBottom: 20 },
//   button: { backgroundColor: '#4F46E5', padding: 14, borderRadius: 8, alignItems: 'center', justifyContent: 'center', height: 50 },
//   buttonDisabled: { backgroundColor: '#9CA3AF' },
//   buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
// });
