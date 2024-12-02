/* eslint-disable react/no-unescaped-entities */
"use client"

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
import { Loader2 } from "lucide-react"
import { contactInfoSchema } from "@/src/shemas/get-contact-info-shema"
import { saveContactInfosAction } from "@/actions/contact-action"
import { useParams } from "next/navigation"


type GetContactInfosProps = {
  isModalOpen: boolean
  setIsModalOpen: (isOpen: boolean) => void
  currentLink: string
}

export const GetUserInfos: React.FC<GetContactInfosProps> = ({ isModalOpen, setIsModalOpen, currentLink }) => {
const params = useParams()
console.log(params.pseudo)
  const form = useForm<z.infer<typeof contactInfoSchema>>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      name: "",
      email: "",
      pseudo:params.pseudo as string ?? ""
    },
  })

  const { isPending, mutateAsync } = useServerActionMutation(saveContactInfosAction, {
    onSuccess(res) {
      if (res?.success === true) {
        window.open(currentLink, '_blank')
        form.reset()
        setIsModalOpen(false)
      } else {
        console.log('Error')
      }
    },
  })

  function handleSubmit(values: z.infer<typeof contactInfoSchema>) {
    mutateAsync(values)
  }

  const handleInteractOutside = (event: Event) => {
    event.preventDefault();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent onInteractOutside={handleInteractOutside} className="w-[425px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-left">Accès réservé à ma communauté</DialogTitle>
          <DialogDescription  className="text-left leading-4">
            Veuillez entrer votre nom et votre email pour accèder au lien et rejoindre notre cercle privilégié.
          </DialogDescription>
        </DialogHeader>
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
                  <FormLabel >Adresse email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Votre email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {isPending ? <Loader2 className="animate-spin" /> : "Accéder"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default GetUserInfos

