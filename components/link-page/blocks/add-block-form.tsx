/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, X } from 'lucide-react'

import { BlocType, createBlocShema } from "@/src/types/bloc-type"
import { useServerActionMutation } from "@/lib/zsa.query"
import { toast } from "@/lib/use-toast"
import { z } from "zod"
import { createBlocAction } from "@/actions/blocs/bloc-action"
import { useBlocStore } from "@/store/bloc-store"

interface AddBlocComponentProps {
  isAddBloc: boolean
  setIsAddBloc: (isAddBloc: boolean) => void
}

export function AddBlocComponent({ setIsAddBloc }: AddBlocComponentProps) {
  const { addBloc } = useBlocStore()
  const form = useForm<BlocType>({
    resolver: zodResolver(createBlocShema),
    defaultValues: {
      name: "",
    },
  })

  const { isPending, mutateAsync } = useServerActionMutation(createBlocAction, {
    onSuccess(res) {
      if (res?.success === true && res?.data) {

        form.reset()
        toast({
          title: 'Succes',
          description: res.message,
          duration: 5000,
        })
        addBloc(res.data)
        setIsAddBloc(false)
      } else {
        toast({
          title: 'Erreur',
          description: res.message,
          duration: 5000,
        })
      }
    },
  })


  const onSubmit = async (values: z.infer<typeof createBlocShema>) => {
    await mutateAsync(values)
  }


  return (
    <Card className="w-full mx-auto">
      <CardHeader className="px-4 py-2">
        <CardTitle className="flex text-center relative items-center justify-center mt-2">
          Ajouter un bloc
          <Button variant="ghost" className="h-7 w-7 absolute right-0" size="icon" onClick={() => setIsAddBloc(false)}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre du bloc</FormLabel>
                  <FormControl>
                    <Input placeholder="Titre du bloc" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} type="submit" className="w-full">
              {!isPending ? "Sauvegarder le bloc" : <Loader2 className="animate-spin" />}
            </Button>
          </form>
        </Form>
      </CardContent>

    </Card>
  )
}

