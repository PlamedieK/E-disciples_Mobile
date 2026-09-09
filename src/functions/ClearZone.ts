import * as ImagePicker from "expo-image-picker";

type ClearZoneType = {
  setNom: (nom: string) => void;
};
const clearZone = () => {};

// const pickImage = async () => {
//   const result = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     allowsEditing: true,
//     aspect: [1, 1],
//     quality: 0.7,
//   });

//   if (!result.canceled) {
//     setPhotoUri(result.assets[0].uri);
//   }
// };

// const clearZone = () => {
//   setNom("");
//   setPrenom("");
//   setEmail("");
//   setDateBaptism(new Date());
//   setSearchQuery("");
//   setResultatQuery([]);
//   setSelectedRole("");
//   setSelectedIdDb(null);
// };
