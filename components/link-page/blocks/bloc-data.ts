import { BlockType } from "@/src/types/block-type";

const initialBlocs: BlockType[] = [
  {
    id: "1",
    title: "Bloc URL",
    subBlocks: [
      {
        id: "1-1",
        title: "Exemple de lien 1",
        description: "Un lien utile pour apprendre React.",
        type: "URL",
        url: "https://reactjs.org/",
        isPrivate: false,
        isPaid:false,
        price:50,
        isDisplay: true,
      },
      {
        id: "1-2",
        title: "Exemple de lien 2",
        description: "Documentation officielle de TypeScript.",
        type: "URL",
        url: "https://www.typescriptlang.org/",
        isPrivate: true,
        isPaid:false,
        price:50,
        isDisplay: false,
      },
    ],
  },
  {
    id: "2",
    title: "Bloc IMAGE",
    subBlocks: [
      {
        id: "2-1",
        title: "Image de profil",
        description: "Un exemple d'image pour un profil.",
        type: "IMAGE",
        imageUrl: "https://github.com/shadcn.png",
        altText: "Image de profil GitHub",
        isPrivate: false,
        isPaid:false,
        price:50,
        isDisplay: true,
      },
      {
        id: "2-2",
        title: "Image de couverture",
        description: "Image d'arrière-plan.",
        type: "IMAGE",
        imageUrl: "https://placekitten.com/800/400",
        altText: "Image de couverture d'un chat",
        isPrivate: true,
        isPaid:false,
        price:50,
        isDisplay: true,
      },
    ],
  },
  {
    id: "3",
    title: "Bloc DOCUMENT",
    subBlocks: [
      {
        id: "3-1",
        title: "Rapport annuel",
        description: "Document PDF du rapport annuel 2023.",
        type: "DOCUMENT",
        documentUrl: "https://example.com/rapport2023.pdf",
        fileType: "pdf",
        fileSize: 1048576, // 1MB
        isPrivate: true,
        isPaid:false,
        price:50,
        isDisplay: true,
      },
      {
        id: "3-2",
        title: "Guide d'utilisateur",
        description: "Document DOCX pour le guide utilisateur.",
        type: "DOCUMENT",
        documentUrl: "https://example.com/guide.docx",
        fileType: "docx",
        fileSize: 204800, // 200KB
        isPrivate: false,
        isPaid:false,
        price:50,
        isDisplay: false,
      },
    ],
  },
  {
    id: "4",
    title: "Bloc VIDEO",
    subBlocks: [
      {
        id: "4-1",
        title: "Vidéo tutoriel React",
        description: "Un tutoriel pour apprendre React pas à pas.",
        type: "VIDEO",
        videoUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
        thumbnailUrl: "https://img.youtube.com/vi/w7ejDZ8SWv8/0.jpg",
        duration: 600, // 10 minutes
        isPrivate: false,
        isPaid:false,
        price:50,
        isDisplay: true,
      },
      {
        id: "4-2",
        title: "Introduction à TypeScript",
        description: "Vidéo de présentation des bases de TypeScript.",
        type: "VIDEO",
        videoUrl: "https://www.youtube.com/watch?v=BwuLxPH8IDs",
        thumbnailUrl: "https://img.youtube.com/vi/BwuLxPH8IDs/0.jpg",
        duration: 720, // 12 minutes
        isPrivate: true,
        isPaid:false,
        price:50,
        isDisplay: false,
      },
    ],
  },
];

export default initialBlocs;
