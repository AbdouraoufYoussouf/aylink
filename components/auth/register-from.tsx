"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { registerUserSchema } from "@/src/shemas/user-shema"
import { useServerActionMutation } from "@/lib/zsa.query"
import { Loader2 } from "lucide-react"
import { FormError } from "../forms/form.error"
import { createUserAction } from "@/actions/auth-action"
import { useRouter } from "next/navigation"


export function RegisterForm() {
  // const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | undefined>("")
  
  const router = useRouter()
  const form = useForm<z.infer<typeof registerUserSchema>>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      name: "",
      pseudo: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const { isPending, mutateAsync } = useServerActionMutation(createUserAction, {
    onSuccess(res) {
      if (res?.success === true) {
        router.push('/auth/login')
        form.reset();
        // queryClient.invalidateQueries({ queryKey: ['depots'] });
      } else {
        setErrorMessage(res.message!)

      }
    },
  });

  function onSubmit(values: z.infer<typeof registerUserSchema>) {
    mutateAsync(values);
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enterer vos informations pour créer votre compte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom et prénom</FormLabel>
                  <FormControl>
                    <Input placeholder="Jon Dao" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pseudo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pseudo</FormLabel>
                  <FormControl>
                    <Input placeholder="rafien" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="rafien@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*****" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*****" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormError setMessage={setErrorMessage} message={errorMessage} />
            <Button type="submit" className="w-full">
              {isPending ? <Loader2 className="animate-spin" /> : "Enregistrer"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
