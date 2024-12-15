'use server'

import { currentUser } from "@/lib/auth-utils"
import { db } from "@/lib/db"
import { action } from "@/lib/zsa"

import { z } from "zod"


export const deleteSubBlocAction = action
    .input(z.object({ id: z.string() }))
    .handler(async ({ input }) => {
        try {
            const userConnected = await currentUser()
            if (!userConnected) {
                return { success: false, message: "Vous devez vous connecter pour créer un bloc" }
            }
            const bloc = await db.subBloc.delete({
                where: {
                    id: input.id
                }
            })
            return { success: true, message: "SubBloc supprimé avec succès", data: bloc }
        } catch (error) {
            console.log('Error lors de la supression du subbloc')
            return { success: false, message: "Error lors de la suppression du subbloc" }
        }
    })

// export const updateBlocAction = action
//     .input(updateBlocShema)
//     .handler(async ({ input }) => {
//         const validateBloc = updateBlocShema.safeParse(input)
//         if (!validateBloc.success) {
//             return { success: false, message: "Champ invalide" }
//         }
//         const { blocId, name } = validateBloc.data
//         try {

//             const userConnected = await currentUser()
//             if (!userConnected) {
//                 return { success: false, message: "Vous devez vous connecter pour créer un bloc" }
//             }
//             const exitingBloc = await db.bloc.findUnique({
//                 where: {
//                     id: blocId
//                 }
//             })

//             if (!exitingBloc) {
//                 return { success: false, message: "Bloc non trouvé" }
//             }

//             const bloc = await db.bloc.update({
//                 where: {
//                     id: exitingBloc.id
//                 },
//                 data: {
//                     name: name,
//                     userId: userConnected.id
//                 }
//             })
//             return { success: true, message: "Titre du bloc mis à jour avec succès", data: bloc }
//         } catch (error) {
//             console.log('Error lors de la mise ç jour du titre du bloc')
//             return { success: false, message: "Error lors de la mise à jour du titre du bloc" }
//         }

//     })