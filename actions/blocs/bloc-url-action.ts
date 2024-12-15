"use server"

import { db } from "@/lib/db"
import { uploadFileAws } from '@/actions/aws-action';  // Votre fonction d'upload vers S3 ou autre service de stockage
import { SubBlocType } from "@prisma/client";
import { SousBlocType } from "@/src/types/bloc-type";
import { formatSubBloc } from "@/lib/bloc-utils";

export const AddSubBlocUrlction = async (formData: FormData) => {
    try {
        // Récupérer les données de texte du formulaire
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const type = formData.get('type') as string;
        const isDisplay = formData.get('isDisplay') === 'true';
        const isPrivate = formData.get('isPrivate') === 'true';
        const blocId = formData.get('blocId') as string;
        const url = formData.get('url') as string;


        // Récupérer les fichiers (vidéo et miniature)
        const imageFile = formData.get('imageFile') as File | null;
        const imageName = formData.get('imageName');

        // Gérer le téléchargement des fichiers sur un service (par exemple, S3)
        let imageUrl = '';
        let thumbnailUrl = '';

        if (imageFile) {
            const path = `images/${blocId}/`;
            const imageBlob = await uploadFileAws(imageFile, path);
            if (imageBlob) {
                imageUrl = imageBlob;  // URL de la vidéo après l'upload
            }
        }

        // Vérifier si le bloc parent existe
        const bloc = await db.bloc.findUnique({
            where: { id: blocId }
        });

        if (!bloc) {
            return { success: false, message: "Le bloc parent n'existe pas" };
        }

        // Créer un sous-bloc vidéo dans la base de données
        const subBlocUrl = await db.subBloc.create({
            data: {
                title,
                description,
                type: type as SubBlocType,
                thumbnailUrl: thumbnailUrl ?? '',
                imageUrl: imageUrl ?? '',
                isDisplay,
                isPrivate,
                url,
                blocId: bloc.id,
                visitCount: 0,
                createdAt: new Date()
            }
        });
        const transformedSubBloc: SousBlocType = formatSubBloc(subBlocUrl) ;

        return { success: true, message: "Sous-bloc vidéo ajouté avec succès", data: transformedSubBloc };
    } catch (error) {
        console.error('Erreur lors de l\'ajout du sous-bloc vidéo', error);
        return { success: false, message: "Erreur lors de l'ajout du sous-bloc vidéo" };
    }
};
