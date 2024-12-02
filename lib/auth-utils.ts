import { auth } from "@/auth"

export const currentAgent = async () => {
    const session = await auth()
    
    return session?.user
  }
