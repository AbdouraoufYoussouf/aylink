"use server"

import { db } from "@/lib/db";
import { action } from "@/lib/zsa"
import { contactInfoSchema } from "@/src/shemas/get-contact-info-shema";
import { ContactResponse, FilterContactParams } from "@/src/types/contact-type";
import { Prisma, Tag } from "@prisma/client";
import { z } from "zod";


export const saveContactIptvInfosAction = action
  .input(contactInfoSchema)
  .handler(async ({ input }) => {
    const {
      name,
      email,
      pseudo,
      ipAdress,
      location,
      country,
      tag,
      message,
      oneYearSubscription,
      whatsapp,
      deviceType
    } = input;

    const emailLowercase = email.toLowerCase();

    try {
      let tagForUser: Tag | undefined;
      if (tag) {

        // verifier si un tag avec son nom exist si non créer le tag
        const existingTag = await db.tag.findUnique({
          where: { name: tag },
        });

        if (!existingTag) {
          console.log("Ce tag n'existe pas, création du tag.");
          tagForUser = await db.tag.create({
            data: {
              name: tag,
            },
          });
        }
      }

      // Validation des champs
      const validateFields = contactInfoSchema.safeParse(input);
      if (!validateFields.success) {
        return { success: false, message: "Les informations saisies sont invalides." };
      }

      // Vérifier si un contact avec le même email et numéro WhatsApp existe déjà
      const existingContact = await db.contact.findUnique({
        where: { email: emailLowercase },
      });

      if (existingContact && existingContact.whatsapp === whatsapp) {
        console.log("Ce email et ce numéro nous ont déjà contacté, mise à jour des informations.");

        // Mise à jour des informations du contact existant
        const updatedContact = await db.contact.update({
          where: { id: existingContact.id },
          data: {
            name,
            ipAddress: ipAdress ?? "",
            location,
            country,
            message,
            deviceType,
            tags: {
              connect: tagForUser ? [{ id: tagForUser.id }] : [],
            },
            oneYearSubscription,
            updatedAt: new Date(),
          },
        });

        return { success: true, data: updatedContact, message: "Contact mis à jour avec succès." };
      }

      // Vérifier si un utilisateur avec ce pseudo existe
      const existingUser = await db.user.findUnique({
        where: { pseudo },
      });

      if (!existingUser) {
        console.log("Cet utilisateur n'existe pas.");
        return { success: false, message: "Cet utilisateur n'existe pas." };
      }


      // Créer un nouveau contact si aucun contact existant n'a été trouvé
      const newContact = await db.contact.create({
        data: {
          name,
          email: emailLowercase,
          ipAddress: ipAdress,
          location,
          country,
          whatsapp,
          deviceType,
          tags: {
            connect: tagForUser ? [{ id: tagForUser.id }] : [],
          },
          message,
          oneYearSubscription,
          createdAt: new Date(),
          users: {
            connect: [{ id: existingUser.id }], // Lier le contact à l'utilisateur trouvé
          },
        },
      });

      console.log("Contact créé avec succès");
      return { success: true, data: newContact, message: "Contact créé avec succès." };
    } catch (error) {
      console.error("Erreur lors de la création/mise à jour du contact", error);
      return { success: false, message: "Erreur lors de la création/mise à jour du contact." };
    }
  });

export const saveContactInfosAction = action
  .input(contactInfoSchema)
  .handler(async ({ input }) => {
    const { name, email, pseudo, ipAdress, location, country,
      tag
    } = input;
    const emailLowercase = email.toLowerCase();

    try {
      // Validation des champs
      const validateFields = contactInfoSchema.safeParse(input);
      if (!validateFields.success) {
        return { success: false, message: "Les informations saisies sont invalides." };
      }

      let tagForUser: Tag | undefined;
      if (tag) {

        // verifier si un tag avec son nom exist si non créer le tag
        const existingTag = await db.tag.findUnique({
          where: { name: tag },
        });

        if (!existingTag) {
          console.log("Ce tag n'existe pas, création du tag.");
          tagForUser = await db.tag.create({
            data: {
              name: tag,
            },
          });
        }
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
          ipAddress: ipAdress,
          location,
          tags: {
            connect: tagForUser ? [{ id: tagForUser.id }] : [],
          },
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




export const getAllContactFilterAction = async (filters: FilterContactParams): Promise<ContactResponse> => {
  try {
    // Validate and sanitize pagination parameters
    const sanitizedPage = Math.max(1, filters.page || 1); // Ensure page is at least 1
    const sanitizedPageSize = Math.min(100, Math.max(1, filters.pageSize || 10)); // Ensure pageSize is between 1 and 100
    const { search, pseudo } = filters;

    // Find user by pseudo
    const user = await db.user.findUnique({
      where: { pseudo },
      select: { id: true },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
        data: [],
        total: 0,
        currentPage: sanitizedPage,
        totalPages: 0,
      };
    }

    // Build where clause for filtering
    const where: Prisma.ContactWhereInput = {
      users: {
        some: {
          id: user.id,
        },
      },
    };

    // Add search filter if provided
    if (search?.trim()) {
      where.OR = [
        { name: { contains: search.trim(), mode: "insensitive" } },
        { email: { contains: search.trim(), mode: "insensitive" } },
        { country: { contains: search.trim(), mode: "insensitive" } },
      ];
    }

    // Calculate skip and take for pagination
    const skip = (sanitizedPage - 1) * sanitizedPageSize; // Adjust skip for page index
    const take = sanitizedPageSize;

    // Fetch contacts and count in parallel
    const [contacts, total] = await Promise.all([
      db.contact.findMany({
        where,
        skip,
        take,
      }),
      db.contact.count({ where }),
    ]);

    return {
      success: true,
      data: contacts.map((contact) => ({
        id: contact.id,
        name: contact.name,
        email: contact.email,
        location: contact.location ?? "",
        country: contact.country ?? "",
        createdAt: contact.createdAt,
      })),
      total,
      currentPage: sanitizedPage,
      totalPages: Math.ceil(total / sanitizedPageSize), // Calculate total pages
      message: "Contacts retrieved successfully",
    };
  } catch (error) {
    console.error("Error retrieving contacts:", error);
    return {
      success: false,
      message: "Error retrieving contacts",
      data: [],
      total: 0,
      currentPage: 1,
      totalPages: 0,
    };
  }
};


export const deleteManyContactAction = action
  .input(
    z.object({
      contactsIds: z.array(z.string()),
    })
  )
  .handler(async ({ input }) => {
    const { contactsIds } = input;

    try {
      // Vérifie si les contacts existent
      const existingContacts = await db.contact.findMany({
        where: { id: { in: contactsIds } },
      });

      if (existingContacts.length === 0) {
        return { success: false, message: "Aucun contact trouvé" };
      }

      await db.contact.deleteMany({
        where: { id: { in: contactsIds } },
      })

      return { success: true, message: "contacts supprimés avec succès" };
    } catch (error) {
      console.error("Erreur lors de la suppression des contacts :", error);
      return { success: false, message: "Erreur lors de la suppression des contacts." };
    }
  });