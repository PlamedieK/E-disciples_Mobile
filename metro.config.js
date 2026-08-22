// const { getDefaultConfig } = require("expo/metro-config");
// const { withNativeWind } = require('nativewind/metro');
 
// const config = getDefaultConfig(__dirname)
 
// module.exports = withNativeWind(config, { input: './global.css' })
import { getDefaultConfig } from "expo/metro-config";
import { withNativeWind } from "nativewind/metro";

const config = getDefaultConfig(__dirname);
config.expo = { ...config.expo, css: true };

// L'entrée doit être "./global.css" si le fichier est à la racine
export default withNativeWind(config, { input: "./global.css" });
