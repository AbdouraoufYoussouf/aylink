import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { iconReseaux } from "@/src/constants/social-reseaux-data";
import { SocialLinkType } from "@/src/types/reseaux-type";
import { updateProfileType, UserProfilType } from "@/src/types/user-type";

interface ProfileState {
  user: UserProfilType | null;

  allSocialLinks: SocialLinkType[];
  setProfile: (profil: UserProfilType) => void,
  updateProfile: (newProfil: updateProfileType) => void,
  updateSocialLinks: (newSocialLinks: SocialLinkType[]) => void,
  addSelectedSocialLinks: (reseauxSelacteds: SocialLinkType[]) => void;
  removeSocialLink: (name: string) => void;
  toggleSocialLink: (name: string) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  user: null,
  allSocialLinks: iconReseaux.map((item) => ({
    id: uuidv4(),
    ...item,
    url: "",
    isActive: false,
  })),
  setProfile: (profile) => set({ user: profile }),
  updateProfile: (newProfile) => set((state) => ({
    user: state.user ? { ...state.user, ...newProfile } : null
  })),
  updateSocialLinks: (newSocialLinks) => set((state) => ({
    user: state.user ? { ...state.user, socialLinks: newSocialLinks } : null
  })),

  addSelectedSocialLinks: (selectedLinks) => set((state) => {
    if (!state.user) return state;
    const updatedSocialLinks = [...(state.user.socialLinks || []), ...selectedLinks];
    const updatedAllSocialLinks = state.allSocialLinks.filter(
      (link) => !selectedLinks.some((selected) => selected.name === link.name)
    );
    return {
      user: { ...state.user, socialLinks: updatedSocialLinks },
      allSocialLinks: updatedAllSocialLinks,
    };
  }),

  removeSocialLink: (name) => set((state) => {
    if (!state.user) return state;
    const updatedSocialLinks = state.user.socialLinks.filter((link) => link.name !== name);
    const removedLink = state.user.socialLinks.find(link => link.name === name);

    if (removedLink) {
      const fullLinkInfo = state.allSocialLinks.find(link => link.name === name);
      if (fullLinkInfo) {
        return {
          user: { ...state.user, socialLinks: updatedSocialLinks },
          allSocialLinks: [...state.allSocialLinks, { ...fullLinkInfo, url: removedLink.url, isActive: false }],
        };
      }
    }

    return {
      user: { ...state.user, socialLinks: updatedSocialLinks },
    };
  }),

  toggleSocialLink: (name) => set((state) => {
    if (!state.user) return state;
    const updatedSocialLinks = state.user.socialLinks.map((link) =>
      link.name === name ? { ...link, isActive: !link.isActive } : link
    );
    return { user: { ...state.user, socialLinks: updatedSocialLinks } };
  }),

}));
