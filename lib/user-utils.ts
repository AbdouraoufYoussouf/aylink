import { IconReseauxType } from "@/src/constants/social-reseaux-data";
import { SocialLinkType } from "@/src/types/reseaux-type";
import { SocialLinkDisplayType } from "@/src/types/user-type";

export const mapSocialLinks = (
    serverLinks: SocialLinkDisplayType[],
    iconReseaux: IconReseauxType[]
): SocialLinkType[] => {
    return serverLinks
        .map((link): SocialLinkType | null => {
            const match = iconReseaux.find((iconData) =>
                iconData.name.toLowerCase() === link.name.toLowerCase()
            );

            if (!match) {
                console.warn(`No matching icon found for ${link.name}`);
                return null;
            }

            return {
                id: link.id,
                name: link.name,
                icon: match.icon,
                color: match.color,
                url: link.url,
                isActive: link.isActive,
            };
        })
        .filter((link): link is SocialLinkType => link !== null);
};