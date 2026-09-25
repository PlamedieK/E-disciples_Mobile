import { useAuth } from "@/Context/AuthContext";
import { useTheme } from "@/Context/ThemeContext";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { handleLoginMobile, healthTest } from "../services/appelApi";
import InputTextLabel from "./components/Input";

export default function Index() {
  const [ip, setIp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTestingLogin, setIsTestingLogin] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const { theme } = useTheme();
  const { setUser, setip } = useAuth();

  return (
    <SafeAreaView
      style={{ backgroundColor: theme.background }}
      className="flex-1"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="px-5 py-6"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* En-tête Tactique */}
          {/*  */}
          <View className="items-start mb-4">
            <View
              style={{ borderColor: theme.textPrimary }}
              className="px-3 py-1 mb-3 border rounded-full bg-emerald-500/10"
            >
              <Text
                style={{ color: theme.textPrimary }}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400"
              >
                AdonisJS & React Native
              </Text>
            </View>
            <Text
              style={{ color: theme.textPrimary }}
              className="text-xl font-extrabold tracking-tight"
            >
              Connexion
            </Text>
            <Text
              style={{ color: theme.textSecondary }}
              className="mt-1 text-sm opacity-80"
            >
              Configurez l&apos;adresse du serveur pour accéder à votre espace.
            </Text>
          </View>
          <View className="flex-col">
            {/* Section 1 : Configuration Serveur */}
            <View
              style={{
                backgroundColor: theme.formColor,
                borderColor: theme.border,
              }}
              className="px-5 py-3 mb-5 border-2 shadow-xl rounded-2xl shadow-slate-200/50"
            >
              <View
                style={{ borderColor: theme.border }}
                className="flex-row items-center justify-between pb-2 mb-3 border-b"
              >
                <Text
                  style={{ color: theme.textSecondary }}
                  className="text-[#F8FAFC] font-extrabold text-xs tracking-widest uppercase"
                >
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
                  className={`flex-row justify-center items-center py-3.5 px-4 rounded-2xl border ${
                    isTesting ?
                      `${theme.buttonDisabled} border-slate-300`
                    : "bg-[#16A34A] border-[#16A34A] active:bg-[#15803D]"
                  }`}
                >
                  {isTesting ?
                    <ActivityIndicator size="small" color="#16A34A" />
                  : <Text className="text-sm font-semibold tracking-wider text-white uppercase">
                      Tester la connexion
                    </Text>
                  }
                </TouchableOpacity>
              </View>
            </View>

            {/* Section 2 : Authentification */}
            {ip.trim().length >= 9 && (
              <View
                style={{
                  backgroundColor: theme.formColor,
                  borderColor: theme.border,
                }}
                className="px-5 py-6 mb-8 space-y-2 border-2 shadow-xl rounded-2xl shadow-slate-200/50"
              >
                <View
                  style={{ borderColor: theme.border }}
                  className="flex-row items-center justify-between pb-2 mb-2 border-b"
                >
                  <Text
                    style={{ color: theme.textSecondary }}
                    className="text-[#F8FAFC] font-extrabold text-xs tracking-widest uppercase"
                  >
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
                    onPress={() =>
                      handleLoginMobile({
                        ip,
                        email,
                        password,
                        setIsTestingLogin,
                        onSuccess: (responseData, serverIp) => {
                          const userObj = responseData.user || responseData;
                          const tokenStr = responseData.token || userObj.token;
                          setUser({
                            ...userObj,
                            token: tokenStr,
                          });
                          if (setip) setip(serverIp);
                          router.replace("/components/pages/Home");
                        },
                      })
                    }
                    style={{
                      backgroundColor: theme.colorBtn,
                      borderColor: theme.border,
                    }}
                    className={`flex-row justify-center items-center py-4 rounded-2xl shadow-md ${
                      isTestingLogin ?
                        `${theme.buttonDisabled} border-slate-300`
                      : `${theme.background} active:bg-[#1e293b]`
                    }`}
                  >
                    {isTestingLogin ?
                      <ActivityIndicator size="small" color="#ffffff" />
                    : <Text
                        style={{ color: theme.textSecondary }}
                        className="text-base font-black tracking-widest text-white uppercase"
                      >
                        Se Connecter
                      </Text>
                    }
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
