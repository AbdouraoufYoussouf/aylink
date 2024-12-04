import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { iconReseaux } from "@/src/constants/social-reseaux-data";

interface SocialLink {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  value: string;
  isActive: boolean;
}

interface ProfileState {
  username: string;
  bio: string;
  socialLinks: SocialLink[];
  availableLinks: SocialLink[];
  selectSocialLink: (name: string) => void;
  addSelectedSocialLinks: () => void;
  removeAvailableLink: (name: string) => void;
}


export const useProfileStore = create<ProfileState>((set) => ({
  username: "rafien",
  bio: "Développeur et créateur de contenu.",
  socialLinks: [],
  availableLinks: iconReseaux.map((item) => ({
    id: uuidv4(),
    ...item,
    value: "",
    isActive: false,
  })),
  selectSocialLink: (name) =>
    set((state) => ({
      availableLinks: state.availableLinks.map((link) =>
        link.name === name ? { ...link, isActive: !link.isActive } : link
      ),
    })),
  addSelectedSocialLinks: () =>
    set((state) => {
      const selectedLinks = state.availableLinks.filter((link) => link.isActive);
      return {
        socialLinks: [...state.socialLinks, ...selectedLinks],
        availableLinks: state.availableLinks.filter((link) => !link.isActive),
      };
    }),
  removeAvailableLink: (name) =>
    set((state) => ({
      availableLinks: state.availableLinks.filter((link) => link.name !== name),
    })),
}));
