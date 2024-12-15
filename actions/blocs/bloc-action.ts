'use server'

import { currentUser } from "@/lib/auth-utils"
import { formatBlocs } from "@/lib/bloc-utils"
import { db } from "@/lib/db"
import { action } from "@/lib/zsa"
import { BlocType, createBlocShema, updateBlocShema } from "@/src/types/bloc-type"
import { z } from "zod"

export const createBlocAction = action
    .input(createBlocShema)
    .handler(async ({ input }) => {
        const validateBloc = createBlocShema.safeParse(input)
        if (!validateBloc.success) {
            return { success: false, message: "Champ invalide" }
        }
        const { name } = validateBloc.data
        try {
            const userConnected = await currentUser()
            if (!userConnected) {
                return { success: false, message: "Vous devez vous connecter pour créer un bloc" }
            }
            const bloc = await db.bloc.create({
                data: {
                    name: name,
                    userId: userConnected.id,
                    createdAt: new Date()
                }
            })
            return { success: true, data: bloc }
        } catch (error) {
            console.log('Error lors de la création du bloc', error)
            return { success: false, message: "Error lors de la création du bloc" }
        }
    })


export const getAllBlocForUserAction = async () => {
    try {
        const userConnected = await currentUser();
        if (!userConnected) {
            return { success: false, message: "Vous devez vous connecter pour créer un bloc" };
        }
        const blocsForUser = await db.bloc.findMany({
            where: {
                userId: userConnected.id
            },
            include: {
                subBlocs: true
            }
        });

        const transformedBlocs: BlocType[] = formatBlocs(blocsForUser);

        return { success: true, data: transformedBlocs };
    } catch (error) {
        console.log('Error lors de la récupération des blocs', error);
        return { success: false, message: "Error lors de la récupération des blocs" };
    }
};
export const deleteBlocAction = action
    .input(z.object({ id: z.string() }))
    .handler(async ({ input }) => {
        try {
            const userConnected = await currentUser()
            if (!userConnected) {
                return { success: false, message: "Vous devez vous connecter pour créer un bloc" }
            }
            const bloc = await db.bloc.delete({
                where: {
                    id: input.id
                }
            })
            return { success: true, message: "Bloc supprimé avec succès", data: bloc }
        } catch (error) {
            console.log('Error lors de la supression du bloc')
            return { success: false, message: "Error lors de la suppression du bloc" }
        }
    })

export const updateBlocAction = action
    .input(updateBlocShema)
    .handler(async ({ input }) => {
        const validateBloc = updateBlocShema.safeParse(input)
        if (!validateBloc.success) {
            return { success: false, message: "Champ invalide" }
        }
        const { blocId, name } = validateBloc.data
        try {

            const userConnected = await currentUser()
            if (!userConnected) {
                return { success: false, message: "Vous devez vous connecter pour créer un bloc" }
            }
            const exitingBloc = await db.bloc.findUnique({
                where: {
                    id: blocId
                }
            })

            if (!exitingBloc) {
                return { success: false, message: "Bloc non trouvé" }
            }

            const bloc = await db.bloc.update({
                where: {
                    id: exitingBloc.id
                },
                data: {
                    name: name,
                    userId: userConnected.id
                }
            })
            return { success: true, message: "Titre du bloc mis à jour avec succès", data: bloc }
        } catch (error) {
            console.log('Error lors de la mise ç jour du titre du bloc')
            return { success: false, message: "Error lors de la mise à jour du titre du bloc" }
        }

    })