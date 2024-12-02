/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useServerActionMutation } from '@/lib/zsa.query'
import { Loader2 } from 'lucide-react'
import { contactInfoSchema } from "@/src/shemas/get-contact-info-shema"
import { saveContactInfosAction } from "@/actions/contact-action"
import { useParams } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"

type Contact = {
  name: string,
  email: string,
  pseudo: string
}

type GetContactInfosProps = {
  isModalOpen: boolean
  setIsModalOpen: (isOpen: boolean) => void
  currentLink: string
  onUserInfoUpdate: (userInfo: Contact) => void
}


export const GetUserInfos: React.FC<GetContactInfosProps> = ({ isModalOpen,onUserInfoUpdate, setIsModalOpen, currentLink }) => {
  const params = useParams()
  const [userInfo, setUserInfo] = useState<z.infer<typeof contactInfoSchema> | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const storedInfo = localStorage.getItem('userInfo')
    if (storedInfo) {
      setUserInfo(JSON.parse(storedInfo))
    }
  }, [])

  useEffect(() => {
    if (userInfo) {
      window.open(currentLink, '_blank')
      setIsModalOpen(false)
    }
  }, [userInfo, currentLink, setIsModalOpen])

  const form = useForm<z.infer<typeof contactInfoSchema>>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      name: userInfo?.name || "",
      email: userInfo?.email || "",
      pseudo: params.pseudo as string ?? ""
    },
  })

  const { isPending, mutateAsync } = useServerActionMutation(saveContactInfosAction, {
    onSuccess(res) {
      if (res?.success === true) {
        const newUserInfo = {
          name: form.getValues('name'),
          email: form.getValues('email'),
          pseudo: params.pseudo as string
        }
        onUserInfoUpdate(newUserInfo)
        setUserInfo(newUserInfo)
        window.open(currentLink, '_blank')
        form.reset()
        setIsModalOpen(false)
      } else {
        setError('Une erreur est survenue lors de l\'enregistrement de vos informations.')
      }
    },
  })

  async function handleSubmit(values: z.infer<typeof contactInfoSchema>) {
    setIsLoading(true)
    setError(null)
    try {
      let ipAddress, location, country;

      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json')
        if (!ipResponse.ok) throw new Error("Erreur lors de la récupération de l'IP")
        const ipData = await ipResponse.json()
        ipAddress = ipData.ip
      } catch (error) {
        console.error('Erreur IP:', error)
        ipAddress = 'Non disponible'
      }

      try {
        const geoResponse = await fetch(`https://ipapi.co/${ipAddress}/json/`)
        if (!geoResponse.ok) throw new Error('Erreur lors de la récupération des données de géolocalisation')
        const geoData = await geoResponse.json()
        location = `${geoData.city || 'Ville inconnue'}, ${geoData.region || 'Région inconnue'}`
        country = geoData.country_name || 'Pays inconnu'
      } catch (error) {
        console.error('Erreur Géolocalisation:', error)
        location = 'Non disponible'
        country = 'Non disponible'
      }

      const enrichedValues = {
        ...values,
        ipAddress,
        location,
        country
      }
      console.log('Informations utilisateur:', enrichedValues)
      await mutateAsync(enrichedValues)
    } catch (error) {
      console.error('Erreur générale:', error)
      setError('Une erreur est survenue lors du traitement de vos informations.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInteractOutside = (event: Event) => {
    event.preventDefault();
  };

  if (userInfo) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent onInteractOutside={handleInteractOutside} className="w-[425px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-left">Accès réservé à ma communauté</DialogTitle>
          <DialogDescription className="text-left leading-4">
            Veuillez entrer votre nom et votre email pour accéder au lien et rejoindre notre cercle privilégié.
          </DialogDescription>
        </DialogHeader>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre nom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Adresse email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Votre email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-sm text-gray-500">
              En soumettant ce formulaire, vous acceptez que nous collections votre adresse IP et des informations de localisation à des fins d'analyse.
            </p>
            <Button type="submit" className="w-full" disabled={isLoading || isPending}>
              {isLoading || isPending ? <Loader2 className="animate-spin mr-2" /> : null}
              {isLoading || isPending ? "Chargement..." : "Accéder"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default GetUserInfos

