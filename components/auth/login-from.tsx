"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useServerActionMutation } from "@/lib/zsa.query"
import { handleLoginAction } from "@/actions/auth-action"
import { loginSchema } from "@/src/shemas/user-shema"
import { useRouter, useSearchParams } from "next/navigation"
import { FormError } from "../forms/form.error"
import { Loader2 } from "lucide-react"
import { GoogleLogo } from "@/src/constants/icons"
import { signIn } from "next-auth/react"

export function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | undefined>("")
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const searchParams = useSearchParams()
  const urlError = searchParams.get('error') === "OAuthAccountNotLinked" ?
    "Email already in use with different provider!" : ""

  const router = useRouter()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { isPending, mutateAsync } = useServerActionMutation(handleLoginAction, {
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

  function onSubmit(values: z.infer<typeof loginSchema>) {
    mutateAsync(values);
  }
  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true)
      await signIn('google', { callbackUrl: '/dashboard' })
    } catch (error) {
      console.error('Google sign-in error:', error)
      setErrorMessage("Une erreur s'est produite lors de la connexion avec Google.")
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">

            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Jon@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                        <Link href="#" className="ml-auto inline-block text-sm underline">
                          Mot de passe oublié?
                        </Link>
                      </div>
                      <FormControl>
                        <Input type="password" placeholder="*****" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
              <FormError setMessage={setErrorMessage || urlError} message={errorMessage} />
              <Button type="submit" className="w-full">
                {isPending ? <Loader2 className="animate-spin" /> : "Connecter"}
              </Button>

            </div>

          </form>
        </Form>
        <div className="relative mt-6 mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background ">ou</span>
          </div>
        </div>

        <div>
        <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
          >
            {isGoogleLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <GoogleLogo />
            )}
            {isGoogleLoading ? "Connexion en cours..." : "Continuer avec Google"}
          </Button>
          <div className="mt-4 text-center text-sm">
            Vous n&apos;avez pas de compte?{" "}
            <Link href="#" className="underline">
              Créer un ici
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
