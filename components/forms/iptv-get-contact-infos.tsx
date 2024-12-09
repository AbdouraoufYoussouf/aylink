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
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useServerActionMutation } from '@/lib/zsa.query'
import { Loader2 } from 'lucide-react'
import { contactInfoSchema } from "@/src/shemas/get-contact-info-shema"
import { saveContactIptvInfosAction } from "@/actions/contact-action"
import { useParams } from "next/navigation"
import { toast } from "@/lib/use-toast"
import { FormModal } from "../modals/form-modal"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {
  isModalOpen: boolean
  setIsModalOpen: (isOpen: boolean) => void
}

export const GetUserInfosIptv: React.FC<Props> = ({ isModalOpen, setIsModalOpen }) => {
  const params = useParams()
  const [userInfo, setUserInfo] = useState<z.infer<typeof contactInfoSchema> | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const storedInfo = localStorage.getItem('userInfo')
    if (storedInfo) {
      setUserInfo(JSON.parse(storedInfo))
    }
  }, [])

  const form = useForm<z.infer<typeof contactInfoSchema>>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      name: userInfo?.name || "",
      email: userInfo?.email || "",
      whatsapp: "",
      message: "",
      pseudo: params.pseudo as string,
      oneYearSubscription: true,
      tag: "iptv",
      deviceType: ''
    },
  })

  const { isPending, mutateAsync } = useServerActionMutation(saveContactIptvInfosAction, {
    onSuccess(res) {
      if (res?.success === true) {
        form.reset()
        setIsModalOpen(false)
        console.log(res)
        toast({
          title: 'Succès',
          description: 'Message reçu, nous vous contacterons bientôt.',
          duration: 5000,
        })
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
      title="Abonnement IPTV"
      description="Si vous voulez avoir les codes IPTV et profiter du streming illimité, envoyer moi ce message."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom complet</FormLabel>
                <FormControl>
                  <Input placeholder="Votre nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Votre email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="whatsapp"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro WhatsApp</FormLabel>
                <FormControl>
                  <Input className="text-sm" type="tel"
                    inputMode="numeric" placeholder="Incluez l'indicatif pays, exp. 33..." {...field} />
                </FormControl>
                <span className="leading-4 text-muted-foreground text-sm">
                  Vous recevrez un message via whatsapp.</span>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Sélecteur du type d'appareil */}
          <FormField
            name="deviceType"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type d'appareil</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionnez votre appareil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="" disabled>
                        Sélectionnez votre appareil
                      </SelectItem >
                      <SelectItem value="android">Android</SelectItem >
                      <SelectItem value="iphone">iPhone</SelectItem >
                      <SelectItem value="smarttv">Smart TV</SelectItem >
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="oneYearSubscription"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-2 border rounded  px-2 py-1">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="p-0 mb-2">
                  Abonnement d'un an
                </FormLabel>

              </FormItem>
            )}
          />
          <FormField
            name="message"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message (optionnel)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Informations supplémentaires..."
                    className="leading-4"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4 items-center">
            <Button onClick={()=>setIsModalOpen(false)} variant={'outline'} >Annuler</Button>
            <Button type="submit" className="w-full" disabled={isLoading || isPending}>
              {isLoading || isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isLoading || isPending ? "Envoi en cours..." : "Envoyer"}
            </Button>
          </div>
        </form>
      </Form>
    </FormModal>
  )
}

