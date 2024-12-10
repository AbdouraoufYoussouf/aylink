'use server'

import { currentUser } from '@/lib/auth-utils';
import { db } from '@/lib/db';
import { action } from '@/lib/zsa';
import { z } from 'zod';

// Schema for tag input
const tagSchema = z.object({
  name: z.string().min(1, "Le nom du tag est requis"),
});

// Create Tag Action
export const createTagAction = action
  .input(tagSchema)
  .handler(async ({ input }) => {
    try {
      const user = await currentUser();
      if (!user) {
        return { success: false, message: "Utilisateur non authentifié" };
      }

      const existingTag = await db.tag.findUnique({
        where: { name: input.name },
      });

      if (existingTag) {
        return { success: false, message: "Ce tag existe déjà" };
      }

      const newTag = await db.tag.create({
        data: {
          name: input.name,
          users: {
            connect: [{ id: user.id }],
          },
        },
      });

      return { success: true, data: newTag, message: "Tag créé avec succès" };
    } catch (error) {
      console.error("Erreur lors de la création du tag:", error);
      return { success: false, message: "Erreur lors de la création du tag" };
    }
  });

// Read Tag Action
export const getTagAction = action
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    try {
      const user = await currentUser();
      if (!user) {
        return { success: false, message: "Utilisateur non authentifié" };
      }

      const tag = await db.tag.findFirst({
        where: {
          id: input.id,
          users: {
            some: {
              id: user.id,
            },
          },
        },
      });

      if (!tag) {
        return { success: false, message: "Tag non trouvé" };
      }

      return { success: true, data: tag };
    } catch (error) {
      console.error("Erreur lors de la récupération du tag:", error);
      return { success: false, message: "Erreur lors de la récupération du tag" };
    }
  });

// Update Tag Action
export const updateTagAction = action
  .input(z.object({
    id: z.string(),
    name: z.string().min(1, "Le nom du tag est requis"),
  }))
  .handler(async ({ input }) => {
    try {
      const user = await currentUser();
      if (!user) {
        return { success: false, message: "Utilisateur non authentifié" };
      }

      const existingTag = await db.tag.findFirst({
        where: {
          id: input.id,
          users: {
            some: {
              id: user.id,
            },
          },
        },
      });

      if (!existingTag) {
        return { success: false, message: "Tag non trouvé ou non autorisé" };
      }

      const updatedTag = await db.tag.update({
        where: { id: input.id },
        data: { name: input.name },
      });

      return { success: true, data: updatedTag, message: "Tag mis à jour avec succès" };
    } catch (error) {
      console.error("Erreur lors de la mise à jour du tag:", error);
      return { success: false, message: "Erreur lors de la mise à jour du tag" };
    }
  });

// Delete Tag Action
export const deleteTagAction = action
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    try {
      const user = await currentUser();
      if (!user) {
        return { success: false, message: "Utilisateur non authentifié" };
      }

      const existingTag = await db.tag.findFirst({
        where: {
          id: input.id,
          users: {
            some: {
              id: user.id,
            },
          },
        },
      });

      if (!existingTag) {
        return { success: false, message: "Tag non trouvé ou non autorisé" };
      }

      await db.tag.delete({
        where: { id: input.id },
      });

      return { success: true, message: "Tag supprimé avec succès" };
    } catch (error) {
      console.error("Erreur lors de la suppression du tag:", error);
      return { success: false, message: "Erreur lors de la suppression du tag" };
    }
  });

// List Tags Action
export const listTagsAction = async () => {
    try {
      const user = await currentUser();
      if (!user) {
        return { success: false, message: "Utilisateur non authentifié" };
      }

      const tags = await db.tag.findMany({
        where: {
          users: {
            some: {
              id: user.id,
            },
          },
        },
        orderBy: {
          name: 'asc',
        },
      });

      return { success: true, data: tags };
    } catch (error) {
      console.error("Erreur lors de la récupération des tags:", error);
      return { success: false, message: "Erreur lors de la récupération des tags" };
    }
  };