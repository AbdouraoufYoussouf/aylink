"use server"

import { db } from "@/lib/db";
import { ExtendedUser } from "@/next-auth";
import { messages } from "@/src/constants/messages";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findFirst({
            where: { email }
        })
        return user
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return null;
    }
}


export const getUserProfilByPseudo = async (pseudo: string) => {
    try {
        // Recherche du credential pour l'userId donné
        const userExist = await db.user.findUnique({
            where: {
                pseudo
            },
            include: {
                socialLinks: true,
                categories: {
                    include: {
                        blocks: true
                    }
                }
            }
        });

        // Vérifier si un credential a été trouvé
        if (!userExist) {
            return { success: false, data: null, message: messages.credential.GET.NOT_FOUND };
        }

        // Extraire les informations nécessaires pour NextAuth
        const user: ExtendedUser = {
            id: userExist.id,
            email: userExist.email,
            name: userExist.name,
            pseudo: userExist.pseudo ?? "",
            emailVerified: userExist.emailVerified ?? null,
            image: userExist.image ?? ""
        };

        // Retourner l'utilisateur simplifié
        return { success: true, data: user };
    } catch (error) {
        console.error("Error lors de la recuperation du profil user", error);
        return { success: false, data: null, message: "Error lors de la recuperation du profil user" };
    }
};

export const getUserById = async (id: string) => {
    try {
        // Recherche du credential pour l'userId donné
        const userExist = await db.user.findUnique({
            where: {
                id
            },

        });

        // Vérifier si un credential a été trouvé
        if (!userExist) {
            return { success: false, data: null, message: messages.credential.GET.NOT_FOUND };
        }

        // Extraire les informations nécessaires pour NextAuth
        const user: ExtendedUser = {
            id: userExist.id,
            email: userExist.email,
            name: userExist.name,
            pseudo: userExist.pseudo ?? "",
            emailVerified: userExist.emailVerified ?? null,
            image: userExist.image ?? ""
        };
        // console.log('user exist:', user)

        // Retourner l'utilisateur simplifié
        return { success: true, data: user };
    } catch (error) {
        console.error(messages.credential.GET.RETRIEVE_ERROR, error);
        return { success: false, data: null, message: messages.credential.GET.RETRIEVE_ERROR };
    }
};




export const getAccountByUserId = async (userId: string) => {
    try {
        const account = await db.account.findFirst({
            where: { userId }
        })
        return account
    } catch (error) {
        console.error(messages.credential.GET.RETRIEVE_ERROR, error);
        return null;
    }
}
