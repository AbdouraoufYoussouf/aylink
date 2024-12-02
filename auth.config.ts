import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getUserForLogin } from "./actions/auth-action";

const googleId = process.env.GOOGLE_CLIENT_ID
const googleSecret = process.env.GOOGLE_CLIENT_SECRET

export const authConfig: NextAuthConfig = {
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
    providers: [
        Credentials({
            async authorize(credentials) {
                const { username } = credentials;
                const response = await getUserForLogin(username as string)
                if (response.success && response.data) {
                    return response.data
                } else {
                    return null;
                }
            }
        }),
        GoogleProvider({
            clientId: googleId!,
            clientSecret: googleSecret!,
        })
    ],
};