"use server"

import { db } from "@/lib/db";
import { action } from "@/lib/zsa"
import { contactInfoSchema } from "@/src/shemas/get-contact-info-shema";
import { ContactType, FilterContactParams } from "@/src/types/contact-type";
import { Prisma } from "@prisma/client";

export const saveContactInfosAction = action
    .input(contactInfoSchema)
    .handler(async ({ input }) => {
        const { name, email, pseudo } = input;

        const emailLowercase = email.toLowerCase();

        try {
            const validateFields = contactInfoSchema.safeParse(input);

            if (!validateFields.success) {
                return { success: false, message: "Les infos saisis sont invalides" };
            }
            // Vérifier si un contact avec le même nom existe déjà
            const existingContact = await db.contact.findUnique({
                where: { email: email },
            });

            if (existingContact) {
                console.log("Cette email existe déjà")
                return { success: true, message: "Cette email existe déjà" };
            }
            // Vérifier si un user avec ce pseudo existe
            const existingUser = await db.user.findUnique({
                where: { pseudo: pseudo },
            });

            if (!existingUser) {
                console.log("Cette user existe pas")
                return { success: true, message: "Cette user existe pas" };
            }


            // Créer le nouveau contact
            const newContact = await db.contact.create({
                data: {
                    name: name,
                    email: emailLowercase,
                    createdAt: new Date(),
                    updatedAt: undefined,
                    userId: existingUser.id
                },
            });
            console.log("Contact crée avec succés")
            return { success: true, data: newContact, message: "Contact crée avec succés" };

        } catch (error) {
            // Gestion des erreurs
            console.error("Erreur lors de la création de l'Contact", error);
            return { success: false, message: "Erreur lors de la création de l'Contact" };
        }
    })


    export const getAllContactFilterAction = async (filters: FilterContactParams) => {
        try {
            const { search} = filters;
    
            const orderBy: Prisma.ContactOrderByWithRelationInput[] = [
                { updatedAt: 'desc' },
                { createdAt: 'desc' }
            ];
            // Vérifier si des filtres sont spécifiés
            const where: Prisma.ContactWhereInput = {
               
       
                ...(search && {
                    OR: [
                        { name:  { contains: search, mode: 'insensitive' } },
                        { email:  { contains: search, mode: 'insensitive' } },
                    ],
                }),
            };
    
            const [contacts, total] = await Promise.all([
                db.contact.findMany({
                    where,
                  
                    orderBy: orderBy,
                 
                }),
                db.contact.count({ where }),
            ]);
    
            // Transform the response
            const response: ContactType[] = contacts.map((contact) => ({
              id:contact.id,
              name: contact.name,
              email: contact.email,
                
            }));
    
            return {
                success: true,
                data: response,
                total,
                message: "contact récupérés avec succès !",
            };
        } catch (error) {
            console.error("Erreur lors de la récupération des contact!", error);
            return { success: false, message: "Erreur lors de la récupération des contact !" };
        }
    };
    