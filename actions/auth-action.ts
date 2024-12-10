"use server"

import { signIn } from "@/auth";
import { currentUser } from "@/lib/auth-utils";
import { db } from "@/lib/db";
import { action } from "@/lib/zsa";
import { messages } from "@/src/constants/messages";
import { loginSchema, registerUserSchema } from "@/src/shemas/user-shema";
import bcrypt from "bcryptjs"


export const getUserForLogin = async (email: string) => {
    try {
        // Recherche du credential pour l'user donné
        const credential = await db.user.findUnique({
            where: {
                email: email,
            },
        });

        // Vérifier si un credential a été trouvé
        if (!credential) {
            return { success: false, data: null, message: messages.credential.GET.NOT_FOUND };
        }

        // Extraire les informations nécessaires pour NextAuth
        const user = {
            id: credential?.id,
            email: credential?.email,
            name: credential?.name,
            pseudo: credential.pseudo,
            password: credential.password,
        };

        // Retourner l'utilisateur simplifié
        return { success: true, data: user };
    } catch (error) {
        console.error(messages.credential.GET.RETRIEVE_ERROR, error);
        return { success: false, data: null, message: messages.credential.GET.RETRIEVE_ERROR };
    }
};

// Créer l'action pour créer un utilisateur
export const createUserAction = action
  .input(registerUserSchema)
  .handler(async ({ input }) => {
    const { name, pseudo, email,password } = input;

    try {
      const validateFields = registerUserSchema.safeParse(input);
      const hashedPassword = await bcrypt.hash(password, 10);
      if (!validateFields.success) {
        return { success: false, message: messages.user.CREATE.INVALID_FIELDS};
      }
      // Vérifier si un user avec le même email existe déjà
      const existingUser = await db.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        console.log(messages.depot.CREATE.ALREADY_EXISTS)
        return { success: false, message: messages.user.CREATE.ALREADY_EXISTS };
      }

      // Créer le nouveau user
      const newUser = await db.user.create({
        data: {
          name,
          email,
          pseudo,
          password:hashedPassword
        },
      });
      console.log(messages.user.CREATE.SUCCESS)

       // TODO: send verification token email
    // const verificationToken = await generateVerificationToken(email);
    // await sendVerificationEmail(verificationToken.email, user?.name as string, verificationToken.token);
   
      return { success: true, data: newUser, message: messages.user.CREATE.SUCCESS };

    } catch (error) {
      // Gestion des erreurs
      console.error(messages.depot.CREATE.ERROR, error);
      return { success: false, message: messages.depot.CREATE.ERROR };
    }
  });


  export const handleLoginAction = action
  .input(loginSchema)
  .handler(async ({ input }) => {
    // Validation des champs avec zod
    const validation = loginSchema.safeParse(input);

    // Vérifiez si la validation a échoué
    if (!validation.success) {
      return { success: false, data: null, message: "Invalid credentials" };
    }

    const { email, password } = validation.data; // Les données validées

    try {
      // Récupération de l'utilisateur
      const { data: existingAgent } = await getUserForLogin(email);

      if (!existingAgent) {
        return { success: false, data: null, message: "Cet identifiant n'existe pas dans le système!" };
      }

      // Vérification du mot de passe
      const passwordMatch = await bcrypt.compare(password, existingAgent.password!);
      if (!passwordMatch) {
        return { success: false, data: null, message: "Le mot de passe est incorrect!" };
      }

    

      // Connexion réussie
      const signInResult = await signIn('credentials', {
        redirect: false, // Empêche la redirection automatique
        username: email,
        password: password
      });

      // Gérer la redirection manuelle en fonction du résultat
      if (signInResult?.error) {
        return { success: false, data: null, message: "Erreur de connexion. Veuillez réessayer." };
      }

      // Récupérer la session après connexion
      const agent = await currentUser();
      // Assurez-vous que l'agent contient les propriétés requises

      // Connexion réussie
      return {
        success: true,
        data: { agent: agent, },
        message: "Connexion réussie. Redirection en cours...",
        redirectTo: '/dashboard'
      };

    } catch (error) {
      console.error("Error:", error);
      return { success: false, data: null, message: "Quelque chose s'est mal passé!" };
    }
  });