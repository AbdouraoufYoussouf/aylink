'use server'

import { del, put } from "@vercel/blob";

export const uploadFileVercel = async (file: File, path: string) => {
    console.log('uploading')

    const blob = await put(path, file, {
        access: "public",
    });


    return blob
}


export const deleteFileVercel = async (blobUrl: string) => {
    try {
        await del(blobUrl);


        console.log("Fichier supprimé avec succès :", blobUrl);
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        throw error;
    }
};
