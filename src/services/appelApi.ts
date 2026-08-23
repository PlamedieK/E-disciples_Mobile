import { Alert } from "react-native"
import * as SecureStore from 'expo-secure-store'
type healthTestProps = {
    ip: string
    setIsTesting: (test: boolean) => void
    //setTabData: (data: any[]) => void;
}

type TypeLogin = {
  ip: string
  email: string
  password: string,
  prenom?: string,
  setIsTestingLogin: (load: boolean) => void
  onSuccess: (user: any) => void
}



export const healthTest = async ({ ip, setIsTesting }: healthTestProps) => {
    const cleanIp = ip.trim()
    if (!cleanIp) {
      Alert.alert('Attention ⚠️', 'Veuillez saisir une adresse IP valide.')
      return
    }

    setIsTesting(true)
    const url = `http://${cleanIp}:3333/api/testApi`
    try {
      // Configuration d'une limite de temps (Timeout) à 6 secondes
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000)
      
      const res = await fetch(url, {
        method: 'GET', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      })
      clearTimeout(timeoutId)
      const data = await res.json()
      if (data && data.status === 'connected') {
        //setTabData(data.tab) 
        Alert.alert('Succès 🎉', 
          `Connexion établie avec succès !
          \nMessage du serveur : ${data.message}`)
      } else {
      Alert.alert('Erreur',  'Réponse inattendue du serveur.')

      }

    } catch (error) {
      console.log(error);
      Alert.alert(
        'Échec de connexion ❌',
        `Impossible de joindre le serveur à l'adresse :\n${url}\n\nVérifiez que :
        \n1. Votre téléphone et votre PC sont sur le MÊME Wi-Fi.
        \n2. L'IP saisie est correcte.
        \n3. Le serveur AdonisJS est actif.`
      )
    } finally {
      setIsTesting(false)
    }
}
  

export const handleLoginMobile = async ({ ip, email, password, onSuccess, prenom, setIsTestingLogin }: TypeLogin) => {
 // const cleanIp = ip.trim()
  if (!ip || !email || !password) {
    Alert.alert('Attention ⚠️','Veuillez remplir tous les champs');
    return;
  }
  setIsTestingLogin(true)
  try {
    const response = await fetch(`http://${ip.trim()}:3333/api/api-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // Tenter d'extraire le JSON en toute sécurité
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      console.log('Status HTTP :', response.status);
      console.log('Réponse complète AdonisJS :', data);
      const errorMessage = data?.message || `Erreur serveur (Code ${response.status})`;
      throw new Error(errorMessage);
    }

    if (!data || !data.token) {
      throw new Error('Réponse invalide du serveur (token manquant)');
    }

    // Sauvegarde du token
    await SecureStore.setItemAsync('user_token', data.token);

    alert(`Connexion réussie ! ${data.user!.nom!}-${data.user!.prenom!} 🎉`);
    onSuccess(data.user);
  } catch (error: any) {
    // Affichage détaillé de l'erreur dans la console Metro
   // console.error('[Login Error Details] :', error);
    alert(error.message || 'Impossible de joindre le serveur');
  } finally {
    setIsTestingLogin(false);
  }
}



// export type UserData = {
//   id?: number
//   email: string
//   nom?: string
//   prenom?: string
// }

// type LoginParams = {
//   ip: string
//   email: string
//   password: string
//   setIsTestingLogin: (loading: boolean) => void
//   onSuccess: (user: UserData) => void
// }

// export const handleLoginMobile = async ({
//   ip,
//   email,
//   password,
//   setIsTestingLogin,
//   onSuccess,
// }: LoginParams) => {
//   if (!ip.trim() || !email.trim() || !password.trim()) {
//     Alert.alert(
//       'Champs requis',
//       'Veuillez renseigner l’adresse IP, l’email et le mot de passe.'
//     )
//     return
//   }

//   setIsTestingLogin(true)

//   const url = `http://${ip.trim()}:3333/api/api-login`

//   try {
//     console.log('================================')
//     console.log('🔐 LOGIN MOBILE')
//     console.log('URL:', url)
//     console.log('EMAIL:', email)
//     console.log('================================')

//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//       },
//       body: JSON.stringify({
//         email: email.trim(),
//         password,
//       }),
//     })

//     console.log('📡 STATUS:', response.status)
//     console.log(
//       '📡 CONTENT-TYPE:',
//       response.headers.get('content-type')
//     )

//     // IMPORTANT : on lit la réponse brute
//     const rawResponse = await response.text()


// console.log('📡 STATUS:', response.status)
// console.log('📡 CONTENT-TYPE:', response.headers.get('content-type'))
// console.log('📦 RÉPONSE BRUTE:', rawResponse)
//     // console.log('================================')
//     // console.log('📦 RÉPONSE BRUTE ADONIS')
//     // console.log('================================')
//     // console.log(rawResponse)
//     // console.log('================================')

//     if (!rawResponse) {
//       throw new Error(
//         `Le serveur a répondu avec HTTP ${response.status}, mais le corps de la réponse est vide.`
//       )
//     }

//     let data: any

//     try {
//       data = JSON.parse(rawResponse)
//     } catch (jsonError) {
//       console.error('❌ JSON PARSE ERROR:', jsonError)

//       throw new Error(
//         `Le serveur a répondu HTTP ${response.status}, mais sa réponse n'est pas un JSON valide.`
//       )
//     }

//     console.log('📦 JSON PARSÉ:', data)

//     if (!response.ok) {
//       throw new Error(
//         data?.message ||
//           `Erreur serveur HTTP ${response.status}`
//       )
//     }

//     if (!data?.token) {
//       throw new Error(
//         'Le serveur répond correctement, mais aucun token n’a été reçu.'
//       )
//     }

//     await SecureStore.setItemAsync(
//       'user_token',
//       data.token
//     )

//     if (data.user) {
//       await SecureStore.setItemAsync(
//         'user_data',
//         JSON.stringify(data.user)
//       )
//     }

//     console.log('✅ TOKEN ENREGISTRÉ')

//     Alert.alert(
//       'Connexion réussie 🎉',
//       `Bienvenue ${data.user?.prenom || data.user?.nom || ''}`
//     )

//     onSuccess(data.user)

//   } catch (error) {
//     console.error('================================')
//     console.error('❌ LOGIN ERROR')
//     console.error('================================')

//     if (error instanceof Error) {
//       console.error('Message :', error.message)
//       Alert.alert('Erreur', error.message)
//     } else {
//       console.error('Erreur inconnue :', error)
//       Alert.alert(
//         'Erreur',
//         'Impossible de joindre le serveur.'
//       )
//     }

//   } finally {
//     setIsTestingLogin(false)
//   }
// }
