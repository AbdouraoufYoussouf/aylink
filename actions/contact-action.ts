"use server"

import { db } from "@/lib/db";
import { action } from "@/lib/zsa"
import { contactInfoSchema } from "@/src/shemas/get-contact-info-shema";
import { ContactType, FilterContactParams } from "@/src/types/contact-type";


export const saveContactInfosAction = action
  .input(contactInfoSchema)
  .handler(async ({ input }) => {
    const { name, email, pseudo, ipAdress, location, country } = input;
    const emailLowercase = email.toLowerCase();

    try {
      // Validation des champs
      const validateFields = contactInfoSchema.safeParse(input);
      if (!validateFields.success) {
        return { success: false, message: "Les informations saisies sont invalides." };
      }

      // Vérifier si un contact avec le même email existe déjà
      const existingContact = await db.contact.findUnique({
        where: { email: emailLowercase },
      });
      if (existingContact) {
        console.log("Cet email existe déjà");
        return { success: true, message: "Cet email existe déjà." };
      }

      // Vérifier si un utilisateur avec ce pseudo existe
      const existingUser = await db.user.findUnique({
        where: { pseudo },
      });
      if (!existingUser) {
        console.log("Cet utilisateur n'existe pas.");
        return { success: false, message: "Cet utilisateur n'existe pas." };
      }

      // Créer le contact et le lier à l'utilisateur
      const newContact = await db.contact.create({
        data: {
          name,
          email: emailLowercase,
          ipAdress,
          location,
          country,
          createdAt: new Date(),
          users: {
            connect: [{ id: existingUser.id }], // Lier le contact au user trouvé
          },
        },
      });

      console.log("Contact créé avec succès");
      return { success: true, data: newContact, message: "Contact créé avec succès." };
    } catch (error) {
      console.error("Erreur lors de la création du contact", error);
      return { success: false, message: "Erreur lors de la création du contact." };
    }
  });



  export const getAllContactFilterAction = async (filters: FilterContactParams) => {
    try {
      const { search, pseudo } = filters;
  
      // Trouver l'utilisateur par pseudo
      const user = await db.user.findUnique({
        where: { pseudo },
        include: { contacts: true }, // Charger les contacts liés
      });
  
      if (!user) {
        console.log("Cet utilisateur n'existe pas.");
        return { success: false, message: "Cet utilisateur n'existe pas." };
      }
  
      // Appliquer des filtres de recherche si nécessaire
      const filteredContacts = user.contacts.filter((contact) => {
        if (!search) return true; // Si pas de recherche, inclure tous les contacts
        return (
          contact.name.toLowerCase().includes(search.toLowerCase()) ||
          contact.email.toLowerCase().includes(search.toLowerCase())
        );
      });
  
      // Transformer les données pour le client
      const response:ContactType[] = filteredContacts.map((contact) => ({
        id: contact.id,
        name: contact.name,
        email: contact.email,
        location: contact.location ?? "",
        country: contact.country ?? "",
      }));
  
      return {
        success: true,
        data: response,
        total: filteredContacts.length,
        message: "Contacts récupérés avec succès !",
      };
    } catch (error) {
      console.error("Erreur lors de la récupération des contacts !", error);
      return { success: false, message: "Erreur lors de la récupération des contacts !" };
    }
  };
  