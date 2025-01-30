import { BlocType } from "../types/bloc-type"
import { FaGithub, FaTiktok, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { UserProfilType } from "../types/user-type"

export const profilData: UserProfilType = {
    id: "1",
    pseudo: "AYFLIX-TV",
    description: "Nous proposons un service IPTV premium offrant un accès illimité à des milliers de chaînes, films avec séries et vos événements sportifs préférés ⚽ en HD ✨",
    image: "/ayflixtv1.png",
    banner: "/baniptv.png",
    socialLinks: [
        {
            icon: FaTiktok,
            url: "https://www.tiktok.com/@ayflixtv",
            color: "",
            id: "",
            name: "",
            isActive: false
        },
        // {
        //     icon: FaYoutube,
        //     url: "https://www.youtube.com/@storyscool",
        //     color: "text-red-600",
        //     id: "",
        //     name: "",
        //     isActive: false
        // },

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

export const blocs: BlocType[] = [
    {
        id: "1",
        name: "Abonnement IPTV",
        products: [
            {
                id: "1",
                name: "Starter Pack",
                duration: "3 MOIS",
                price: 29.99,
                description: "Abonnement IPTV",
                imageUrl: "/12mois.png",
                title: "",
                isDisplay: false,
                type: "PRODUCT",
                isPrivate: false,
                isPaid: false,
                currency: "EUR",
                actionUrl: "https://www.ayflixtv.com/checkout/2"
            },
            {
                id: "2",
                name: "VIP Full Pack",
                duration: "12 MOIS",
                price: 49.99,
                popular: true,
                description: "Abonnement IPTV",
                imageUrl: "/12mois.png",
                title: "",
                isDisplay: false,
                type: "PRODUCT",
                isPrivate: false,
                isPaid: false,
                currency: "EUR",
                actionUrl: "https://www.ayflixtv.com/checkout/2"
            },
            {
                id: "3",
                name: "Pack Smart+",
                duration: "6 MOIS",
                price: 39.99,
                description: "Abonnement IPTV",
                imageUrl: "/12mois.png",
                isDisplay: true,
                isPrivate: false,
                isPaid: false,
                title: "",
                type: "PRODUCT",
                currency: "EUR",
                actionUrl: "https://www.ayflixtv.com/checkout/1"
            },
        ],
        subBlocs: [
            {
                id: "1", // ID unique requis
                type: "VIDEO",
                title: "Films, Series et footbal en illimité",
                description: "Discover how to access your favorite series, movies, and live TV channels from around the world and enjoy your favorite content.",
                videoUrl: "/tunel.mp4",
                thumbnailUrl: "/tunel.png",
                actionType: "URL",
                actionFormId: "1",
                actionUrl: "https://www.ayflixtv.com/",
                isPrivate: true,
                isDisplay: true,
                isPaid: false
            },
        ]
    },
    {
        id: "1",
        name: "Films et Séries",
        subBlocs: [
            {
                id: "2",
                type: "URL",
                title: "Kraven the Hunter",
                description: "Best film of the year.",

                url: "https://vvw.french-stream.bio/15119394-kraven-the-hunter.html",
                imageUrl: "/kraven.webp",
                isPrivate: true,
                isDisplay: true,
                isPaid: false
            },
            // {
            //     id: "2",
            //     type: "URL",
            //     title: "Red One",
            //     description: "Best film avec The Rock et Captaine americain",

            //     url: "https://vvw.french-stream.bio/15119029-red-one.html",
            //     imageUrl: "/redone.jpg",
            //     isPrivate: true,
            //     isDisplay: true,
            //     isPaid: false
            // },
            // {
            //     id: "2",
            //     type: "URL",
            //     title: "Lioness saison 2",
            //     description: "Ma série préféré en ce moment",
            //     url: "https://vvw.french-stream.bio/15118886-lioness-saison-2-2023.html",
            //     imageUrl: "/liones2.jpg",
            //     isPrivate: true,
            //     isDisplay: true,
            //     isPaid: false
            // },
            {
                id: "4",
                type: "URL",
                title: "Mon WhatsApp",
                description: "Ecrivez moi ici  n° : 33751536056",
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
                description: "Rejoignez mon canal Telegram pour des astuces séries/films",
                url: "https://t.me/ayflixtv",
                imageUrl: "/telegram.png",
                isPrivate: false,
                isDisplay: true,
                isPaid: false
            },
        ]
    },
    {
        id: "2",
        name: "Mes Services",
        subBlocs: [
            {
                id: "5",
                type: "URL",
                title: "Développement Web",
                description: "Si tu veux un site ou une page comme celui ci viens on en discute.",
                url: "https://aytechlabo.vercel.app",
                imageUrl: "/raouf.JPG",
                isPrivate: false,
                isDisplay: true,
                isPaid: false
            },
        ]
    }
];
