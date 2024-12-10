import { BlockType } from "../types/block-type"
import { FaGithub, FaTiktok, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { UserProfilType } from "../types/user-type"

export const profilData: UserProfilType = {
    id: "1",
    pseudo: "Rafien",
    description: "💻 Développeur et créateur de contenu, dans ce profil je vous aide à accéder aux meilleurs films 🎬, séries 📺 et événements sportifs ⚽ via une solution IPTV fiable. Consultez les liens ci-dessous.",
    image: "/rafien.png",
    banner: "/baniptv.png",
    socialLinks: [
        {
            icon: FaTiktok,
            url: "https://www.tiktok.com/@rafien.fr",
            color: "",
            id: "",
            name: "",
            isActive: false
        },
        {
            icon: FaYoutube,
            url: "https://www.youtube.com/@storyscool",
            color: "text-red-600",
            id: "",
            name: "",
            isActive: false
        },
        {
            icon: FaTiktok,
            url: "https://www.tiktok.com/@story.scool",
            color: "",
            id: "",
            name: "",
            isActive: false
        },
        {
            name: 'GitHub',
            icon: FaGithub,
            color: '',
            url: "https://github.com/AbdouraoufYoussouf",
            id: "",
            isActive: false
        },
        {
            icon: FaWhatsapp,
            url: "https://wa.me/33751536056",
            color: "",
            id: "",
            name: "",
            isActive: false
        }
    ]
}

export const blocs: BlockType[] = [
    {
        id: "1",
        title: "Films et Séries",
        subBlocks: [
            {
                id: "1", // ID unique requis
                type: "VIDEO",
                title: "Films, Series et footbal en illimité",
                description: "Découvrez comment accéder à vos series,films et aux chaînes TV du monde entier en direct et profiter de vos contenus préférés.",
                videoUrl: "https://pzijefezqfozyw1n.public.blob.vercel-storage.com/profils/rafien/videos/iptv-YkFhf7vODYcdB4LdOCc075FGxW3IQ5.mp4",
                thumbnailUrl: "/miniiptv.jpg",
                isPrivate: true,
                isDisplay: true,
                isPaid: false
            },
            {
                id: "2",
                type: "URL",
                title: "Lioness saison 2",
                description: "Ma série préféré en ce moment",
                url: "https://vvw.french-stream.bio/15118886-lioness-saison-2-2023.html",
                imageUrl: "/liones2.jpg",
                isPrivate: true,
                isDisplay: true,
                isPaid: false
            },
            {
                id: "4",
                type: "URL",
                title: "Mon WhatsApp",
                description: "Pour tout infos sur l'abonnement IPTV.",
                url: "https://wa.me/33751536056",
                imageUrl: "/whatsapp.webp",
                isPrivate: false,
                isDisplay: true,
                isPaid: false
            },
            {
                id: "5",
                type: "URL",
                title: "Mon telegram",
                description: "Rejoignez mon canal Telegram pour des astuces séries/films et des offres IPTV exclusives.",
                url: "https://t.me/rafien_fr",
                imageUrl: "/telegram.png",
                isPrivate: false,
                isDisplay: true,
                isPaid: false
            },
        ]
    },
    {
        id: "2",
        title: "Mes Services",
        subBlocks: [
            {
                id: "5",
                type: "URL",
                title: "Développement Web",
                description: "Je crée des sites web avec React & NodeJs",
                url: "https://aytechlabo.vercel.app",
                imageUrl: "/raouf.JPG",
                isPrivate: false,
                isDisplay: true,
                isPaid: false
            },
        ]
    }
];
