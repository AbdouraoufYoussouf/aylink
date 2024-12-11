/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { AutoResizeTextarea } from "@/components/auto-rezise-textarea"
import { UrlSubBlocType } from "@/src/types/block-type"
import { SubBlocType } from "@prisma/client"

const urlSchema = z.object({
    title: z.string().min(1, "Le titre est requis"),
    url: z.string().url("L'URL doit être valide"),
    description: z.string().optional(),
    isPrivate: z.boolean(),
    isDisplay: z.boolean(),
    isPaid: z.boolean(),
})

type UrlBlockFormData = z.infer<typeof urlSchema>

interface AddUrlBlockProps {
    type: string
    blocId: string
    onAddSousBloc: (blocId: string, sousBloc: UrlSubBlocType) => void
}

export function AddUrlBlock({ type, blocId, onAddSousBloc }: AddUrlBlockProps) {
    const form = useForm<UrlBlockFormData>({
        resolver: zodResolver(urlSchema),
        defaultValues: {
            title: "",
            url: "",
            description: "",
            isPrivate: false,
            isDisplay: true,
            isPaid: false,
        },
    })

    const onSubmit = (data: UrlBlockFormData) => {
        // onAddSousBloc(blocId, { ...data, type })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Titre</FormLabel>
                            <FormControl>
                                <Input placeholder="Titre du sous-bloc" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>URL</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <AutoResizeTextarea
                                    {...field}
                                    className="w-full resize-none text-sm text-muted-foreground leading-4 text-justify"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="isPrivate"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                                <FormLabel>Privé</FormLabel>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="isDisplay"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                                <FormLabel>Afficher</FormLabel>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="isPaid"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Contenu payant
                                </FormLabel>
                            </div>
                        </FormItem>
                    )}
                />

                <Button type="submit">Ajouter le sous-bloc URL</Button>
            </form>
        </Form>
    )
}