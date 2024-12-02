/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"

import Image from 'next/image'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import GetUserInfos from '@/components/forms/get-contact-infos'
import { useQuery } from '@tanstack/react-query'
import { getUserProfilByPseudo } from '@/actions/user-action'
import { TwitterIcon as TikTok, Youtube, PhoneIcon as Whatsapp, ExternalLink, Lock } from 'lucide-react'
import { FaGithub, FaTiktok, FaWhatsapp, FaYoutube } from 'react-icons/fa'

interface SubBlock {
  title: string;
  description: string;
  link: string;
  image: string;
  isPrivate: boolean;
}

interface Category {
  name: string;
  blocks: SubBlock[];
}

const profilData = {
  name: "Rafien",
  description: "Développeur web et monteur vidéo passionné 🚀, je transforme vos idées en réalité, que ce soit en ligne ou à l'écran. Discutons de votre projet via WhatsApp ou email 🌟 ! Et si on parle aussi de séries, j'ai un faible pour ça!",
  image: "/rafien.png",
  banner: "/banier1.png", // Add the path to your banner image here
  socialLinks: [
    {
      icon: <FaTiktok className="w-5 h-5 " />,
      url: "https://www.tiktok.com/@rafien.fr",
      color: ""
    },
    {
      icon: <FaYoutube className="w-5 h-5 " />,
      url: "https://www.youtube.com/@storyscool",
      color: "text-red-600"
    },
    {
      icon: <FaTiktok className="w-5 h-5 " />,
      url: "https://www.tiktok.com/@story.scool",
      color: ""
    },
    { name: 'GitHub', 
      icon: <FaGithub className="w-5 h-5 " />
      , color: '' ,
      url:"https://github.com/AbdouraoufYoussouf"
    
    },
    {
      icon: <FaWhatsapp className="w-5 h-5 " />,
      url: "https://wa.me/+212633851644",
      color: ""
    }
  ]
}

const categories: Category[] = [
  {
    name: "Films et Séries",
    blocks: [
      {
        title: "Lioness Operation spécial saison 2",
        description: "Ma série préféré en ce moment",
        link: "https://vvw.french-stream.bio/15118886-lioness-saison-2-2023.html",
        image: "/liones2.jpg",
        isPrivate: true
      },
      {
        title: "Tulsa King - Saison 2 ",
        description: "Rambo mais dans le busness, un vrai gangstere",
        link: "https://vvw.french-stream.bio/15118380-tulsa-king-saison-2-2022.html",
        image: "/tulsa.jpg",
        isPrivate: false
      },
      {
        title: "Cobara Kai saison 6 ",
        description: "Cette saison c'est du Karaté comme on a jamais vu",
        link: "https://vvw.french-stream.bio/15117757-cobra-kai-saison-6-2018.html",
        image: "/kai.jpg",
        isPrivate: false
      }
    ]
  },
  {
    name: "Mes Services",
    blocks: [
      {
        title: "Développement Web",
        description: "Je crée des site web avec React & NodeJs",
        link: "https://aytechlabo.vercel.app",
        image: "/raouf.JPG",
        isPrivate: false
      },
      {
        title: "Ma chaine Youtube Histoire",
        description: "Des histoires inspirantes et motivantes 35k",
        link: "https://www.youtube.com/@storyscool",
        image: "/scool.webp",
        isPrivate: false
      }
    ]
  }
]

type Props ={
  pseudo:string
}

export default function UserLink({pseudo}:Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentLink, setCurrentLink] = useState('')

  const { isLoading, data } = useQuery({
    queryKey: ['profil', pseudo],
    queryFn: async () => {
      const response = await getUserProfilByPseudo(pseudo as string);
      if (response.success) {
        return response.data;
      }
      return null;
    }
  });
  
  
  const handleLinkClick = (block: SubBlock) => {
    if (block.isPrivate) {
      setCurrentLink(block.link)
      setIsModalOpen(true)
    } else {
      window.open(block.link, '_blank')
    }
  }

  return (
    <div className="min-h-screen relative md:m-4 flex flex-col items-center">
      <header className="absolute top-0 right-0 z-10 m-2">
        <ThemeToggle />
      </header>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg border border-purple-950 sm:rounded-lg shadow-xl overflow-hidden"
      >
        <div className="relative h-40">
          <Image
            src={profilData.banner}
            alt="Banner"
            layout="contain"
            objectFit="cover"
            className=""
            width={1000} height={100}
          />
          <Image
            src={profilData.image}
            alt="Profile"
            width={112}
            height={112}
            className="w-28 h-28 rounded-full mx-auto mb-2 border-4 border-white absolute top-[6rem] left-1/2 shadow-lg  transform -translate-x-1/2"
          />
        </div>
        <div className="p-4 text-center mt-12">
          <div className="">
            <h1 className="text-xl font-bold ">{profilData.name}</h1>
            <p className="text-sm text-muted-foreground leading-4 text-left mb-4">{profilData.description}</p>

            <motion.div
              className="flex justify-center space-x-1 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {profilData.socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${link.color} p-2 rounded-full hover:opacity-80 transition-opacity duration-200`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>

            <div className="space-y-4">
              {categories.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                >
                  <h2 className="text-lg font-semibold underline mb-2">{category.name}</h2>
                  <div className="space-y-2">
                    {category.blocks.map((block, blockIndex) => (
                      <motion.div
                        key={blockIndex}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card className="overflow-hidden border bg-background text-primary-foreground ">
                          <CardContent className="p-0">
                            <button
                              onClick={() => handleLinkClick(block)}
                              className="w-full p-2 text-left  transition-colors duration-200 flex items-center"
                            >
                              <Image
                                width={48}
                                height={48}
                                src={block.image}
                                alt={block.title}
                                className="w-12 h-12 rounded mr-3 object-cover"
                              />
                              <div>
                                <div className="font-semibold  flex items-center">
                                  {block.title}
                                  {block.isPrivate && <Lock className="w-4 h-4 ml-2 " />}
                                </div>
                                <p className="text-sm text-accent-foreground">{block.description}</p>
                              </div>
                              <ExternalLink className="w-4 h-4 ml-auto text" />
                            </button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <GetUserInfos currentLink={currentLink} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  )
}

