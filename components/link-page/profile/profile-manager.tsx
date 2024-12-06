/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Trash2, Plus, Camera, Edit2, X, Loader2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AutoResizeTextarea } from "@/components/auto-rezise-textarea"
import { MyTooltipProvider } from "@/components/tooltip-provider"
import { AddReseauSocialModal } from "./add-reseaux-social-modal"
import { useProfileStore } from "@/store/user-profil-store"
import { FaCheck } from "react-icons/fa"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import ImageCropper from "@/components/image-cropper"
import { sanitizeInput } from "@/lib/sanitize-input"
import { getProfilUser, updateProfileAction } from "@/actions/user-action"
import { useQuery } from "@tanstack/react-query"
import { useSessionStatus } from "@/hooks/useSessionStatut"
import { SocialLinkType } from "@/src/types/reseaux-type"
import { mapSocialLinks } from "@/lib/user-utils"
import { iconReseaux } from "@/src/constants/social-reseaux-data"
import { UserProfilType } from "@/src/types/user-type"
import Image from "next/image"
import ProfileManagerSkeleton from "./profile-manager-skeleton"

const socialMediaPrefixes: { [key: string]: string } = {
  Twitter: "https://twitter.com/",
  Facebook: "https://facebook.com/",
  Instagram: "https://instagram.com/",
  LinkedIn: "https://linkedin.com/in/",
  // Add more social media prefixes as needed
};

export default function ProfileManager() {
  const { user, setProfile, removeSocialLink, updateProfile, toggleSocialLink, updateSocialLinks } = useProfileStore()
  const [isAddReseau, setIsAddReseau] = useState(false)
  const [newUsername, setNewUsername] = useState<string>('')
  const [newBio, setNewBio] = useState<string>("")
  const [newImage, setNewImage] = useState<string>("")
  const [newBanner, setNewBanner] = useState<string>("")
  const [isEditing, setIsEditing] = useState(false)
  const [isCropping, setIsCropping] = useState(false)
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [bannerFile, setBannerFile] = useState<File | null>(null)
  const [socialLinks, setSocialLinks] = useState<SocialLinkType[]>([])

  const { session } = useSessionStatus()

  const { isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      if (session?.user) {
        const response = await getProfilUser(session?.user.id)
        if (response.success && response.data) {
          const reseauxSocialLinks = mapSocialLinks(response.data.socialLinks, iconReseaux);
          const profileData: UserProfilType = {
            id: response.data.id,
            pseudo: response.data.pseudo,
            image: response.data.image,
            description: response.data.description,
            banner: response.data.banner,
            socialLinks: reseauxSocialLinks
          }
          setProfile(profileData)
          setSocialLinks(reseauxSocialLinks)
          return response.data
        }
      }
      return []
    }
  })

  const handleDelete = (name: string) => {
    removeSocialLink(name)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, isBanner: boolean = false) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      if (isBanner) {
        setBannerFile(file)
        setNewBanner(imageUrl)
      } else {
        setTempImageUrl(imageUrl)
        setIsCropping(true)
      }
    }
  }

  const handleCropComplete = async (croppedImageBlob: Blob) => {
    const file = new File([croppedImageBlob], 'profile-image.jpg', { type: 'image/jpeg' })
    setImageFile(file)
    setNewImage(URL.createObjectURL(file))
    setIsCropping(false)
    setTempImageUrl(null)
  }

  const handleSaveChanges = async () => {
    setIsPending(true)
    const sanitizedUsername = sanitizeInput(newUsername!)
    const sanitizedBio = sanitizeInput(newBio!)

    const formData = new FormData()
    formData.append('username', sanitizedUsername)
    formData.append('bio', sanitizedBio)
    formData.append('imageUrl', newImage!)
    formData.append('bannerUrl', newBanner!)
    if (imageFile) {
      formData.append('image', imageFile)
    }
    if (bannerFile) {
      formData.append('banner', bannerFile)
    }
    socialLinks.forEach((link, index) => {
      formData.append(`socialLinks[${index}][name]`, link.name)
      formData.append(`socialLinks[${index}][value]`, link.url)
      formData.append(`socialLinks[${index}][isActive]`, link.isActive.toString())
    })

    try {
      const response = await updateProfileAction(formData)

      if (response?.success && response.data) {
        const reseauxSocialLinks = mapSocialLinks(response.data.socialLinks, iconReseaux);
        const profileData: UserProfilType = {
          id: response.data.id,
          pseudo: response.data.pseudo,
          image: response.data.image,
          description: response.data.description,
          banner: response.data.banner,
          socialLinks: reseauxSocialLinks
        }
        updateProfile(profileData)
        setImageFile(null)
        setBannerFile(null)
        setIsEditing(false)
      } else {
        console.error('Failed to update profile')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsPending(false)
    }
  }

  const handleCancelEdit = () => {
    if (user?.pseudo) {
      setNewUsername(user?.pseudo)
    }
    if (user?.description) {

      setNewBio(user?.description)
    }
    if (user?.image) {
      setNewImage(user?.image)

    }
    if (user?.banner) {

      setNewBanner(user?.banner)
    }
    if (user?.socialLinks) {

      setSocialLinks(user?.socialLinks)
    }

    setIsEditing(false)
  }

  const handleSocialLinkChange = (name: string, value: string) => {
    const updatedLinks = socialLinks.map(link => {
      if (link.name === name) {
        // Add prefix if not present
        const prefix = socialMediaPrefixes[name] || ""
        const formattedValue = value.startsWith(prefix) ? value : prefix + value
        return { ...link, url: formattedValue }
      }
      return link
    })
    setSocialLinks(updatedLinks)
    updateSocialLinks(updatedLinks)
  }

  const handleAddSocialLinks = (newLinks: SocialLinkType[]) => {
    const updatedLinks = [...socialLinks, ...newLinks].map(link => ({
      ...link,
      url: socialMediaPrefixes[link.name] || ""
    }))
    setSocialLinks(updatedLinks)
    updateSocialLinks(updatedLinks)
  }

  useEffect(() => {
    const handleResize = () => {
      document.body.style.height = window.innerHeight + "px"
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (user?.pseudo) {
      setNewUsername(user?.pseudo)
    }
    if (user?.description) {

      setNewBio(user?.description)
    }
    if (user?.image) {
      setNewImage(user?.image)

    }
    if (user?.banner) {

      setNewBanner(user?.banner)
    }
    if (user?.socialLinks) {

      setSocialLinks(user?.socialLinks)
    }
  }, [user])

  if (isLoading) {
    return <ProfileManagerSkeleton />
  }


  if (!user) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl rounded-lg relative flex items-center justify-center overflow-hidden">
      <header className="absolute top-1 -right-1 z-10 m-2">
        {isEditing ? (
          <div className="flex space-x-2">
            <MyTooltipProvider content="Enregistrer les modifications">
              <Button
                variant="outline"
                size="icon"
                onClick={handleSaveChanges}
                className="hover:bg-white/20 h-8 w-8  text-green-600"
              >
                {isPending ? <Loader2 className="animate-spin" /> : <FaCheck className="h-5 w-5" />}
              </Button>
            </MyTooltipProvider>
            <MyTooltipProvider content="Annuler les modifications">
              <Button
                variant="outline"
                size="icon"
                onClick={handleCancelEdit}
                className="hover:bg-white/20 h-8 w-8  text-red-600"
              >
                <X className="h-5 w-5" />
              </Button>
            </MyTooltipProvider>
          </div>
        ) : (
          <MyTooltipProvider content="Modifier le profil">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              className="hover:bg-white/20"
            >
              <Edit2 className="h-5 w-5" />
            </Button>
          </MyTooltipProvider>
        )}
      </header>
      <Card className="w-full mt-2 relative backdrop-blur-lg shadow-2xl overflow-hidden">

        <CardContent className="p-2 sm:p-8 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full  shadow-xl rounded-md overflow-hidden"
          >
            <div className="relative h-40">
              {
                newBanner ?
                  <Image
                    width={1000} height={100}
                    src={newBanner}
                    alt="Banner"
                    layout="contain"
                    objectFit="cover"
                    className=" h-full rounded-lg"
                  /> :
                  <div className="w-full h-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">Add a banner image</span>
                  </div>
              }
              {isEditing && (
                <label htmlFor="banner-upload" className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                  <Camera className="w-8 h-8 text-white" />
                  <input
                    id="banner-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, true)}
                  />
                </label>
              )}
              <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2">
                <Avatar className="w-28 h-28 border-4 border-white shadow-lg">
                  <AvatarImage src={newImage} />
                  <AvatarFallback>RA</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <label htmlFor="image-upload" className="absolute inset-0  flex items-center justify-center  group-hover:opacity-100 transition-opacity duration-300 rounded-full cursor-pointer">
                    <Camera className="w-8 h-8 text-white" />
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
            </div>
            <div className="md:p-4 p-2 text-center mt-16">
              <div className="space-y-4">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Label htmlFor="username" className="sr-only">Username</Label>
                  {
                    isEditing ?
                      <Input
                        id="username"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        className="  font-bold bg-transparent  text-center"
                        readOnly={!isEditing}
                      /> :
                      <span>{newUsername}</span>
                  }
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Label htmlFor="bio" className="sr-only">Bio</Label>
                  {isEditing ? (
                    <AutoResizeTextarea
                      id="bio"
                      value={newBio}
                      onChange={(e) => setNewBio(e.target.value)}
                      className="w-full resize-none text-sm text-muted-foreground leading-4 text-justify"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground leading-4 text-justify mb-4">{newBio}</p>
                  )}
                </motion.div>

              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Réseaux sociaux</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {socialLinks?.map((link, index) => (
                <motion.div
                  key={link.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-center rounded-lg bg-accent px-2 py-1"
                >
                  <div>
                    {
                      link.icon && <link.icon color={link.color} size={25} />
                    }
                  </div>
                  <div className="flex-1 m-1">
                    <Input
                      value={link.url}
                      onChange={(e) => handleSocialLinkChange(link.name, e.target.value)}
                      className="bg-transparent border-none"
                      placeholder={`Entrez votre ${link.name}`}
                      readOnly={!isEditing}
                    />
                  </div>
                  {isEditing && (
                    <div className="space-x-1">
                      <Switch
                        checked={link.isActive}
                        onCheckedChange={() => toggleSocialLink(link.name)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(link.name)}
                        className="hover:text-red-300 hover:bg-red-400/10"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            {isEditing && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  onClick={() => setIsAddReseau(true)}
                  className="w-full bg-white/20 hover:bg-white/30"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un réseau social
                </Button>
              </motion.div>
            )}
          </motion.div>
          <AddReseauSocialModal handleAddSocial={handleAddSocialLinks} isOpen={isAddReseau} onClose={() => setIsAddReseau(false)} />
        </CardContent>
      </Card>

      <Dialog open={isCropping} onOpenChange={setIsCropping}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Recadrer l'image</DialogTitle>
            <DialogDescription>
              Ajustez le cadrage de votre image de profil
            </DialogDescription>
          </DialogHeader>
          {tempImageUrl && (
            <ImageCropper
              imageUrl={tempImageUrl}
              onCropCompleted={handleCropComplete}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

