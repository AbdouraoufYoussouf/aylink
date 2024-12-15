/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { AutoResizeTextarea } from "@/components/auto-rezise-textarea"
import { urlSchema, UrlSubBlocType } from "@/src/types/bloc-type"
import { SubBlocType } from "@prisma/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Lock, Unlock, X } from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { AvatarFallback } from "@radix-ui/react-avatar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import ImageCropper from "@/components/image-cropper"
import { useState } from "react"
import { toast } from "@/lib/use-toast"
import { AddSubBlocUrlction } from "@/actions/blocs/bloc-url-action"
import { useBlocStore } from "@/store/bloc-store"



interface AddUrlBlockProps {
    blocId: string
    setIsAddSousBloc: (isAddSousBloc: boolean) => void
}

export function AddUrlBlock({ blocId, setIsAddSousBloc }: AddUrlBlockProps) {
    const [isCropping, setIsCropping] = useState(false)
    const [tempImageUrl, setTempImageUrl] = useState<string | null>(null)
    const [isPending, setIsPending] = useState(false)
    const { addSubBloc } = useBlocStore()

    const form = useForm<UrlSubBlocType>({
        resolver: zodResolver(urlSchema),
        defaultValues: {
            id: '2',
            type: "URL",
            title: "",
            url: "",
            blocId: blocId,
            description: "",
            isPrivate: false,
            isDisplay: true,
            isPaid: false,
        },
    })

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const urlImage = URL.createObjectURL(file)
            form.setValue("imageName", file.name);
            setTempImageUrl(urlImage)
            setIsCropping(true)
        }
    }

    const handleCropComplete = async (croppedImageBlob: Blob) => {
        const nameImage = form.getValues("imageName");
        const file = new File([croppedImageBlob], nameImage ? nameImage : "sous-bloc-image.jpg", { type: 'image/jpeg' })
        const urlImage = URL.createObjectURL(file)
        form.setValue('imageFile', file)
        form.setValue("imageUrl", urlImage);
        setIsCropping(false)
        setTempImageUrl(null)
    }
    const { formState: { errors }, watch } = form;
    console.log('fieds:', errors)
    async function onSubmit(values: UrlSubBlocType) {
        console.log('Initial values:', values);
        setIsPending(true)

        try {
            // Créez un FormData pour envoyer les fichiers et les autres données
            const formData = new FormData();

            // Ajoutez les autres champs du formulaire
            formData.append('id', values.id);
            formData.append('type', values.type);
            formData.append('isPrivate', String(values.isPrivate));
            formData.append('isDisplay', String(values.isDisplay));
            formData.append('isPaid', String(values.isPaid));
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('url', values.url);

            if (values.blocId) {
                formData.append('blocId', values.blocId);
            }

            // Ajoutez les fichiers vidéo et miniature s'ils existent
            if (values.imageFile) {
                formData.append('imageFile', values.imageFile);
            }
            if (values.imageUrl) {
                formData.append('imageUrl', values.imageUrl);
            }
            if (values.imageName) {
                formData.append('imageName', values.imageName);
            }
            // Envoie du FormData avec les fichiers et les données
            const res = await AddSubBlocUrlction(formData)
            console.log('res:', res)
            if (res.success && res.data) {
                toast({
                    title: "Success",
                    description: res.message
                })

                addSubBloc(res.data.blocId!, res.data)
            }

            setIsAddSousBloc(false)
            setIsPending(false)
        } catch (error) {
            console.error('Error uploading files:', error);
            toast({
                title: "Erreur",
                description: "Une erreur est survenue lors de l'upload des fichiers."
            });

            setIsPending(false)
        }
    }

    return (
        <Card className="max-w-xl">

            <CardContent className="px-4 py-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                        <div className="flex items-center justify-center">
                            <Controller
                                name="isPrivate"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-3">
                                        <FormLabel className="flex items-center">
                                            <Unlock className="mr-1 h-4 w-4" />
                                            Public</FormLabel>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel className="flex items-center">
                                            <Lock className="mr-1 h-4 w-4" />
                                            Privé</FormLabel>
                                    </FormItem>
                                )}
                            />

                        </div>
                        <div className="space-y-3">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Titre du sous block</FormLabel>
                                        <FormControl>
                                            <Input className="w-full" placeholder="un titre" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                        <div className="flex  w-full gap-2 lg:gap-4 items-end">
                            <FormField
                                control={form.control}
                                name="imageFile"
                                render={({ }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="image-upload" className="cursor-pointer">
                                            <Avatar className="w-16 h-16 flex items-center justify-center rounded-lg border border-muted-foreground shadow-lg">
                                                <AvatarImage src={form.getValues("imageUrl") || ""} />
                                                <AvatarFallback>
                                                    <Camera className="text-muted-foreground" />
                                                </AvatarFallback>
                                            </Avatar>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="image-upload"
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                // On ne propage pas `...field`
                                                onChange={(e) => {
                                                    handleImageUpload(e) // Gère le fichier
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="url"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>URL du sous bloc</FormLabel>
                                        <FormControl>
                                            <Input className="w-full" placeholder="https://example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="w-full">
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

                        <Button type="submit" className="w-full">Sauvegarder le sous-bloc</Button>
                    </form>
                </Form>
            </CardContent>

            <Dialog open={isCropping} onOpenChange={setIsCropping}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Recadrer l'image</DialogTitle>
                        <DialogDescription>
                            Ajustez le cadrage de votre image de sous-bloc
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
        </Card>
    )
}