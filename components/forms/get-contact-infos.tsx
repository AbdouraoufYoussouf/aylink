'use client'

import { useState } from "react"
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
import { useServerActionMutation } from '@/lib/zsa.query'
import { Loader2 } from 'lucide-react'
import { contactInfoSchema } from "@/src/shemas/get-contact-info-shema"
import { saveContactInfosAction } from "@/actions/contact-action"
import { useParams, useRouter } from "next/navigation"
import { CreateContactType } from "@/src/types/contact-type"
import { FormModal } from "../modals/form-modal"
import { toast } from "@/lib/use-toast"

type GetContactInfosProps = {
  isModalOpen: boolean
  setIsModalOpen: (isOpen: boolean) => void
  currentLink: string
  onUserInfoUpdate: (userInfo: CreateContactType) => void
}

export const GetUserInfos: React.FC<GetContactInfosProps> = ({ isModalOpen, onUserInfoUpdate, setIsModalOpen, currentLink }) => {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof contactInfoSchema>>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      name: "",
      email: "",
      pseudo: params.pseudo as string ?? "",
      tag: "lioness",
    },
  })

  const { isPending, mutateAsync } = useServerActionMutation(saveContactInfosAction, {
    onSuccess(res) {
      if (res?.success === true) {
        const newUserInfo = {
          name: form.getValues('name'),
          email: form.getValues('email'),
          pseudo: params.pseudo as string,
          tag: "lioness",
        }
        
        onUserInfoUpdate(newUserInfo)
        form.reset()
        setIsModalOpen(false)
        
        // Use router.push for client-side navigation
        router.push(currentLink)
      } else {
        toast({
          title: 'Erreur',
          description: 'Une erreur est survenue lors du traitement de vos informations.',
          duration: 5000,
        })
      }
    },
  })

  async function handleSubmit(values: z.infer<typeof contactInfoSchema>) {
    setIsLoading(true)
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
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors du traitement de vos informations.',
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FormModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      title="Accès réservé à ma communauté"
      description="Veuillez entrer votre nom et votre email pour accéder au lien."
    >
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

          <Button type="submit" className="w-full" disabled={isLoading || isPending}>
            {isLoading || isPending ? <Loader2 className="animate-spin mr-2" /> : null}
            {isLoading || isPending ? "Chargement..." : "Accéder"}
          </Button>
        </form>
      </Form>
    </FormModal>
  )
}

export default GetUserInfos

