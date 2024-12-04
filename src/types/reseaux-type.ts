
export type CreateSociauxType = {
    name: string;
    url: string;
    isDisplay: boolean;
  }
  
  export type UpdateSociauxType = {
    name: string;
    url: string;
    isDisplay: boolean;
  };

  
  export type ReseauSocialUserType = {
    id: string;
    name: string;
    url: string;
    isDisplay: boolean;
  };

  export interface SocialLinkType {
    id: string;
    name: string;
    icon: React.ElementType;
    color: string;
    url: string;
    isActive: boolean;
  }