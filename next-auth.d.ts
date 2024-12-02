import { JWT } from "next-auth/jwt"
import { DefaultSession, DefaultJWT } from "next-auth"
import { AdapterUser } from "next-auth/adapters"

export type ExtendedUser = AdapterUser & {
    id: string;
    name: string;
    pseudo: string;
    email: string;
    image?: string;
    emailVerified?: Date | null;
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        user?: ExtendedUser
    }
}