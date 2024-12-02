"use server"

import { db } from "@/lib/db";
import { ClientType, FilterClientParams } from "@/src/types/client-type";
import { Prisma } from "@prisma/client";

export const getAllClientFilterAction = async (filters: FilterClientParams) => {
    try {
        const { search } = filters;

        const orderBy: Prisma.UserOrderByWithRelationInput[] = [
            { updatedAt: 'desc' },
            { createdAt: 'desc' }
        ];
        // Vérifier si des filtres sont spécifiés
        const where: Prisma.UserWhereInput = {
            ...(search && {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                ],
            }),
        };

        const [users, total] = await Promise.all([
            db.user.findMany({
                where,
                orderBy: orderBy,

            }),
            db.user.count({ where }),
        ]);


        // Transform the response
        const response: ClientType[] = users.map((client) => ({
            id: client.id,
            name: client.name,
            email: client.email,
            pseudo: client.pseudo ?? "",
            image: client.image ?? ''

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
}