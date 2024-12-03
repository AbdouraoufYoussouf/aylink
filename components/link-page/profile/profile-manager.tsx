"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Plus, Instagram, Mail, Phone, Camera, Edit2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SocialLink {
  id: number
  type: "instagram" | "email" | "phone"
  value: string
  isActive: boolean
}

export default function ProfileManager() {
  const [username, setUsername] = useState("rafien")
  const [bio, setBio] = useState("Je propose du développement web et du montage vidéo 🚀 Discutons de votre projet via WhatsApp ou mail ! ☀️ Et comme tout le monde, j'ai un faible pour les séries, alors profitez-en !")
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { id: 1, type: "instagram", value: "https://www.instagram.com/rafien.fr", isActive: true },
    { id: 2, type: "email", value: "youssouf.abdouraouf4@gmail.com", isActive: true },
    { id: 3, type: "phone", value: "+212633851644", isActive: true },
  ])
  const [isEditing, setIsEditing] = useState(false)

  const handleToggle = (id: number) => {
    setSocialLinks(links =>
      links.map(link =>
        link.id === id ? { ...link, isActive: !link.isActive } : link
      )
    )
  }

  const handleDelete = (id: number) => {
    setSocialLinks(links => links.filter(link => link.id !== id))
  }

  const addSocialLink = () => {
    const newId = Math.max(0, ...socialLinks.map(link => link.id)) + 1
    setSocialLinks([...socialLinks, { id: newId, type: "instagram", value: "", isActive: true }])
  }

  const getSocialIcon = (type: string) => {
    switch (type) {
      case "instagram":
        return <Instagram className="h-5 w-5" />
      case "email":
        return <Mail className="h-5 w-5" />
      case "phone":
        return <Phone className="h-5 w-5" />
      default:
        return null
    }
  }

  useEffect(() => {
    const handleResize = () => {
      document.body.style.height = window.innerHeight + "px"
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className=" w-full py-4  flex items-center justify-center overflow-hidden">
      <Card className="w-full max-w-4xl bg-muted backdrop-blur-lg shadow-2xl overflow-hidden">
        <CardContent className="p-6 sm:p-8 md:p-10">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative group"
            >
              <Avatar className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 border-4 border-white shadow-lg">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>RA</AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
                <Camera className="text-white w-8 h-8" />
              </div>
            </motion.div>
            <div className="flex-1 space-y-6 text-center md:text-left">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Label htmlFor="username" className="sr-only">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold bg-transparent border-none text-white text-center md:text-left"
                  readOnly={!isEditing}
                />
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Label htmlFor="bio" className="sr-only">Bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-white/20 border-none text-white resize-none"
                  readOnly={!isEditing}
                />
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">Réseaux sociaux</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-white hover:bg-white/20"
                    >
                      <Edit2 className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isEditing ? "Terminer l'édition" : "Modifier le profil"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {socialLinks.map((link, index) => (
              <motion.div
                key={link.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="flex items-center gap-4 rounded-lg bg-white/20 p-4"
              >
                <div className="text-white">
                  {getSocialIcon(link.type)}
                </div>
                <Input
                  value={link.value}
                  onChange={(e) =>
                    setSocialLinks(links =>
                      links.map(l =>
                        l.id === link.id ? { ...l, value: e.target.value } : l
                      )
                    )
                  }
                  className="flex-1 bg-transparent border-none text-white placeholder-white/50"
                  placeholder={`Entrez votre ${link.type}`}
                  readOnly={!isEditing}
                />
                {isEditing && (
                  <>
                    <Switch
                      checked={link.isActive}
                      onCheckedChange={() => handleToggle(link.id)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(link.id)}
                      className="text-white hover:text-red-300 hover:bg-red-400/10"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </>
                )}
              </motion.div>
            ))}
            {isEditing && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  onClick={addSocialLink}
                  className="w-full bg-white/20 hover:bg-white/30 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un réseau social
                </Button>
              </motion.div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}

