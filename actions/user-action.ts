/* eslint-disable @typescript-eslint/no-unused-vars */
"use server"

import { db } from "@/lib/db";
import { ExtendedUser } from "@/next-auth";
import { messages } from "@/src/constants/messages";
import { revalidatePath } from 'next/cache'
import {  UserProfilTypeServer } from "@/src/types/user-type";
import { deleteFileAws, uploadFileAws } from "./aws-action";

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
                blocs: {
                    include: {
                        subBlocs: true
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



export const updateProfileAction = async (formData: FormData) => {
    try {
        // Extract profile data
        const username = formData.get('username') as string
        const bio = formData.get('bio') as string
        // const profileImage = formData.get('imageUrl') as string
        // const bannerImage = formData.get('imageUrl') as string
        const imageFile = formData.get('image') as File | null
        const bannerFile = formData.get('banner') as File | null

        // Handle image upload (assuming you have a function for this)
        let imageUrl = null
        const path = `profils/${username}/`
        if (imageFile) {
            // if (profileImage) {
            //     await deleteFileAws(profileImage);
            // }
            const blob = await uploadFileAws(imageFile, path)
            if(blob){
                imageUrl = blob
            }
        }
        // Handle banner upload (assuming you have a function for this)
        let bannerUrl = null
        const pathBanner = `profils/${username}/${bannerFile?.name}`
        if (bannerFile) {
            // if (bannerImage) {
            //     await deleteFileAws(bannerImage);
            // }
            const blob = await uploadFileAws(bannerFile, pathBanner)
            if(blob){
                bannerUrl = blob
            }
        }

        // Extract social links data
        const socialLinks = []
        let i = 0
        while (formData.get(`socialLinks[${i}][name]`)) {
            socialLinks.push({
                name: formData.get(`socialLinks[${i}][name]`) as string,
                value: formData.get(`socialLinks[${i}][value]`) as string,
                isActive: formData.get(`socialLinks[${i}][isActive]`) === 'true',
            })
            i++
        }

        const existingUser = await db.user.findUnique({
            where: { pseudo: username }
        })
        if (!existingUser) {
            return { success: false, message: "User no found" }
        }

        // Update or create profile
        const updatedProfile = await db.user.update({
            where: { id: existingUser.id },
            data: {
                description: bio,
                image: imageUrl || undefined,
                banner: bannerUrl || undefined,
            },
        })

        const socialLinkUpdated = []

        // Update or create social links
        for (const link of socialLinks) {
            const socialUpdated = await db.socialLink.upsert({
                where: {
                    userId_name: {
                        userId: updatedProfile.id,
                        name: link.name,
                    },
                },
                update: {
                    url: link.value,
                    isActive: link.isActive,
                    updatedAt: new Date()
                },
                create: {
                    userId: updatedProfile.id,
                    name: link.name,
                    url: link.value,
                    isActive: link.isActive,
                    createdAt: new Date()
                },
            })
            socialLinkUpdated.push(socialUpdated)
        }
        const responseData: UserProfilTypeServer = {
            id: updatedProfile.id,
            pseudo: updatedProfile.pseudo ?? "",
            description: updatedProfile.description ?? "",
            image: updatedProfile.description ?? "",
            banner: updatedProfile.banner ?? "",
            socialLinks: socialLinkUpdated
        }

        // Revalidate the profile page
        revalidatePath('/dashboard/link/profile')

        return { success: true, message: "Profil mis à jour avec succès", data: responseData }
    } catch (error) {
        console.error('Erreur lors de la mise à jour du profil:', error)
        return { success: false, message: "Erreur lors de la mise à jour du profil" }
    }
}


export const getProfilUser = async (userId: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id: userId
            },
            include: {
                socialLinks: true
            }
        })
        if (!user) {
            return { success: false, message: "Utilisateur non trouvé" }
        }
        const responseData: UserProfilTypeServer = {
            id: user.id,
            pseudo: user.pseudo ?? "",
            description: user.description ?? "",
            image: user.image ?? "",
            banner: user.banner ?? "",
            socialLinks: user.socialLinks
        }
        return { success: true, message: "Utilisateur trouvé avec succès", data: responseData }
    } catch (error) {
        console.error('Error lors de la recuperation du profil user')
        return { success: false, message: "Error lors de la recuperation du profil user" }
    }
}
