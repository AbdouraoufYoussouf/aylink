import { z } from "zod";

export const contactInfoSchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  email: z.string().email("Adresse email invalide"),
  pseudo: z.string().optional(),
  message: z.string().optional(),
  whatsapp: z.string().optional(),
  tag: z.string().optional(),
  ipAdress: z.string().optional(),
  location: z.string().optional(),
  country: z.string().optional(),
  oneYearSubscription: z.boolean().optional(),
  deviceType: z.string().optional(),
})
