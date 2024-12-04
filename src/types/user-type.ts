import { SocialLinkType } from "./reseaux-type"

export interface updateProfileType {
    username: string,
    bio: string,
    image: string
}

export interface UserProfilType {
    id: string,
    pseudo: string,
    description: string,
    image?: string,
    banner?: string,
    socialLinks: SocialLinkType[],
}
export interface UserProfilTypeServer {
    id: string,
    pseudo: string,
    description: string,
    image?: string,
    banner?: string,
    socialLinks: SocialLinkDisplayType[],
}

export interface SocialLinkDisplayType {
    id: string,
    name: string,
    url: string,
    isActive: boolean
   
}