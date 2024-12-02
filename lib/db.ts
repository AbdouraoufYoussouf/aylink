import { Prisma, PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

const prismaDb = globalForPrisma.prisma ?? new PrismaClient({
    transactionOptions: {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        // maxWait: 5000, // default: 2000
        // timeout: 10000, // default: 5000
    },
    errorFormat: 'pretty',
    log: ['error'],
    // log: ['query', 'info', 'warn', 'error'],
})

if (process.env.NODE_ENV != "production") globalForPrisma.prisma = prismaDb;

export const db = prismaDb;