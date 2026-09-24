import { useTheme } from "@/Context/ThemeContext";
import Ionicons from "@react-native-vector-icons/ionicons";
import * as ImagePicker from "expo-image-picker";
import { Alert, Image, Pressable, Text, View } from "react-native";

type PhotoPickerProps = {
  photoUri: string | null;
  onSelectPhoto: (uri: string | null) => void;
  title?: string;
};
const PhotoPicker = ({ photoUri, onSelectPhoto, title }: PhotoPickerProps) => {
  const { theme } = useTheme();
  //choosing via gallery
  const pickFromGallery = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission refusée", "L'accès à la galerie est nécessaire");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets[0].uri) {
      onSelectPhoto(result.assets[0].uri);
    }
  };

  //taking capture via camera
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const takeWithCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission refusée", "L'accès à la caméra est nécessaire");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled && result.assets[0].uri) {
      onSelectPhoto(result.assets[0].uri);
    }
  };

  //showing the options taking or choosing a photo
  const showOptions = () => {
    Alert.alert(
      "Photo de profil",
      "Choisissez une option",
      [
        // { text: "Photo", onPress: takeWithCamera },
        { text: "Galerie 📷", onPress: pickFromGallery },
        photoUri ?
          {
            text: "Supprimer la photo",
            onPress: () => onSelectPhoto(null), // destroy champ
            style: "destructive",
          }
        : null,
        {
          text: "Annuler",
          style: "cancel",
        },
      ].filter(Boolean) as any,
    );
  };

  return (
    <View className="items-center my-4">
      <Pressable
        onPress={showOptions}
        style={{ backgroundColor: theme.background, borderColor: theme.border }}
        className="relative items-center justify-center overflow-hidden border-2 rounded-full w-28 h-28"
      >
        {photoUri ?
          <Image source={{ uri: photoUri }} className="w-full h-full" />
        : <>
            <Ionicons
              size={30}
              name="camera-outline"
              color={theme.textSecondary}
            />
          </>
        }
      </Pressable>

      {/* Bouton Annuler explicite si une photo est déjà choisie */}
      {photoUri && (
        <Pressable
          onPress={() => onSelectPhoto(null)}
          className="mt-2 bg-red-500/20 px-3 py-1.5 rounded-full "
        >
          <View className="flex-row items-center gap-2 p-2">
            <Text className="text-xs font-semibold text-red-400">Annuler</Text>
            <Ionicons size={14} name={"trash-outline"} color={"#ce5555"} />
          </View>
        </Pressable>
      )}
    </View>
  );
};

export default PhotoPicker;
