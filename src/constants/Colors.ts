import { UserRole } from "@/Context/AuthContext";

export const Colors = {
  // Couleurs de marque (Invariables)
  brand: {
    primary: "#1E3A8A", // Bleu Royal
    primaryHover: "#1E293B", // Bleu foncé
    secondary: "#16A34A", // Vert Émeraude
    secondaryHover: "#15803D", // Vert foncé
    accent: "#F97316", // Orange (au besoin)
  },

  // Mode Clair (Light)
  light: {
    background: "#F8FAFC",
    cardBackground: "#FFFFFF",
    textPrimary: "#1E3A8A",
    textSecondary: "#64748B",
    formColor: "#F8FAFC",
    border: "#1E3A8A",
    inputBackground: "#F1F5F9",
    placeholder: "#94A3B8",
    buttonDisabled: "#E2E8F0",
    colorBtn: "#1E3A8A",
    radioBtn: "#1E293B",
    btnLogout: "#ff431f",
  },

  // Mode Sombre (Dark)
  dark: {
    background: "#1E293B",
    cardBackground: "#1E293B",
    textPrimary: "#F8FAFC",
    textSecondary: "#94A3B8",
    formColor: "#1E3A8A",
    border: "#334155",
    inputBackground: "#0F172A",
    placeholder: "#64748B",
    buttonDisabled: "#334155",
    colorBtn: "#1E293B",
    radioBtn: "#F8FAFC",
    btnLogout: "#ff431f",
  },
};

export type DisciplesType = {
  id: string;
  name: string;
  username: string | null;
  prename: string;
  isFall: boolean;
  role: UserRole;
  dateBaptism: string;
  email: string;
  phone: string | null;
  dbId: number;
};
export type BibleSharingType = {
  id: number;
  day: string;
  hour: string;
  site: string;
  diriId: string;
  nameDb: string;
  disciples: DisciplesType[];
};

// [
//   {
//     "id": 2,
//     "day": "Jeudi",
//     "hour": "17:00:00",
//     "site": "Malueka",
//     "diriId": "76c3880a-8273-4628-9bce-b92b0030ba86",
//     "createdAt": "2026-04-18T01:36:18.039+00:00",
//     "updatedAt": "2026-04-27T20:38:12.275+00:00",
//     "nameDb": "Pompage",
//     "disciples": [
//       {
//         "id": "09f8eab6-332d-4104-adce-867cab75de78",
//         "name": "PEMBE",
//         "username": null,
//         "prename": "Eddy",
//         "isFall": false,
//         "role": "user",
//         "dbId": 2,
//         "dateBaptism": "2026-06-16T00:00:00.000+00:00",
//         "createdAt": "2026-06-18T22:56:05.261+00:00",
//         "updatedAt": "2026-06-18T22:56:05.262+00:00",
//         "email": "eddy@gmail.com",
//         "phone": null,
//         "otp": null,
//         "otpExpiredAt": null
//       },
//       {
//         "id": "2a2c16e7-e9dd-468b-a933-ddedee64cf9e",
//         "name": "Admin",
//         "username": "Adm",
//         "prename": "User Admin",
//         "isFall": false,
//         "role": "admin",
//         "dbId": 2,
//         "dateBaptism": "2026-04-01T00:00:00.000+00:00",
//         "createdAt": "2026-04-16T22:44:42.096+00:00",
//         "updatedAt": "2026-06-18T23:02:10.488+00:00",
//         "email": "admin1@gmail.com",
//         "phone": "0900085569",
//         "otp": null,
//         "otpExpiredAt": null
//       },
//       {
//         "id": "71d00fa4-649a-43fa-b6ea-db6d3e979719",
//         "name": "Gaspar",
//         "username": null,
//         "prename": "Gaspar",
//         "isFall": false,
//         "role": "user",
//         "dbId": 2,
//         "dateBaptism": "2026-06-20T00:00:00.000+00:00",
//         "createdAt": "2026-06-21T21:10:46.149+00:00",
//         "updatedAt": "2026-06-21T21:10:46.149+00:00",
//         "email": "gaspar@gmail.com",
//         "phone": null,
//         "otp": null,
//         "otpExpiredAt": null
//       },
//       {
//         "id": "70734700-7a0a-4967-a148-b4ecbc97cd51",
//         "name": "BOOLE",
//         "username": null,
//         "prename": "Doudou",
//         "isFall": false,
//         "role": "user",
//         "dbId": 2,
//         "dateBaptism": "2026-06-06T00:00:00.000+00:00",
//         "createdAt": "2026-06-21T22:56:25.010+00:00",
//         "updatedAt": "2026-06-21T23:03:18.275+00:00",
//         "email": "doudou@gmail.com",
//         "phone": null,
//         "otp": null,
//         "otpExpiredAt": null
//       }
//     ]
//   }
// ]
