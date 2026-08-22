// export default function (api) {
//     api.cache(true);
//     return {
//       presets: [
//         ["babel-preset-expo", { jsxImportSource: "nativewind" }],
//         "nativewind/babel",
//       ],
//     };
//   };
export default function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }], // Indispensable pour l'SDK 57
      "nativewind/babel",
    ],
  };
};
