

"use server"

import { db } from "@/lib/db"
import { uploadFileAws } from '@/actions/aws-action';  // Votre fonction d'upload vers S3 ou autre service de stockage
import { SubBlocType, VideoActionType } from "@prisma/client";

export const AddSubBlocVideoAction = async (formData: FormData) => {
    try {
        // Récupérer les données de texte du formulaire
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const type = formData.get('type') as string;
        const isDisplay = formData.get('isDisplay') === 'true';
        const isPrivate = formData.get('isPrivate') === 'true';
        const blocId = formData.get('blocId') as string;
        const embedCode = formData.get('embedCode') as string;
        const actionType = formData.get('actionType') as string;
        const actionFormId = formData.get('actionFormId') as string;
        const actionUrl = formData.get('actionUrl') as string;

        // Récupérer les fichiers (vidéo et miniature)
        const videoFile = formData.get('videoFile') as File | null;
        const thumbnailFile = formData.get('thumbnailFile') as File | null;

        // Gérer le téléchargement des fichiers sur un service (par exemple, S3)
        let videoUrl = '';
        let thumbnailUrl = '';

        if (videoFile) {
            const path = `videos/${blocId}/`;
            const videoBlob = await uploadFileAws(videoFile, path);
            if (videoBlob) {
                videoUrl = videoBlob;  // URL de la vidéo après l'upload
            }
        }

        if (thumbnailFile) {
            const path = `thumbnails/${blocId}/`;
            const thumbnailBlob = await uploadFileAws(thumbnailFile, path);
            if (thumbnailBlob) {
                thumbnailUrl = thumbnailBlob;  // URL de la miniature après l'upload
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
        const subBlocVideo = await db.subBlock.create({
            data: {
                title,
                description,
                type:type as SubBlocType,
                thumbnailUrl: thumbnailUrl ?? '',
                videoUrl: videoUrl ?? '',
                isDisplay,
                isPrivate,
                blocId: bloc.id,
                visitCount: 1,
                embedCode,
                actionType:actionType as VideoActionType,
                actionFormId,
                actionUrl,
                createdAt: new Date()
            }
        });

        return { success: true, message: "Sous-bloc vidéo ajouté avec succès", data: subBlocVideo };
    } catch (error) {
        console.error('Erreur lors de l\'ajout du sous-bloc vidéo', error);
        return { success: false, message: "Erreur lors de l'ajout du sous-bloc vidéo" };
    }
};
