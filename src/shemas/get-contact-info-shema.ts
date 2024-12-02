import { z } from "zod";


export const contactInfoSchema = z.object({
    name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
    email: z.string().email("Adresse email invalide"),
    pseudo: z.string().optional(),
    ipAdress: z.string().optional(),
    location: z.string().optional(),
    country: z.string().optional(),
  })
  