import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(3, {
    message: 'Le nom doit contenir au moins 3 caractères'
  }),
  pseudo: z.string().min(2, {
    message: 'Le pseudo doit contenir au moins 3 caractères'
  }),
  email: z.string()
    .email("L'adresse e-mail n'est pas valide")
    .min(1, "L'e-mail est requis"),
  password: z.string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .max(50, "Le mot de passe ne doit pas dépasser 50 caractères"),
  confirmPassword: z.string().min(1, 'La confirmation du mot de passe est requise'),
})
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Les mots de passe ne correspondent pas'
  });


export const loginSchema = z.object({
  redirectUrl: z.string().optional(),
  email: z.string()
    .trim().min(1, { message: 'L\'identifiant est requise.' }),  // Message d'erreur pour l'email vide
  password: z.string()
    .trim().min(1, { message: 'Le mot de passe ne peut pas être vide.' })  // Message d'erreur pour le mot de passe vide
    .min(6, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })  // Message d'erreur pour le mot de passe trop court
});