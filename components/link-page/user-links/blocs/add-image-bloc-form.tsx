/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { AutoResizeTextarea } from "@/components/auto-rezise-textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera } from 'lucide-react'
import ImageCropper from "@/components/image-cropper"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

const imageSchema = z.object({
    title: z.string().min(1, "Le titre est requis"),
    imageFile: z.any(),
    imageUrl: z.string().optional(),
    altText: z.string().optional(),
    description: z.string().optional(),
    isPrivate: z.boolean(),
    isDisplay: z.boolean(),
    isPaid: z.boolean(),
})

type ImageBlockFormData = z.infer<typeof imageSchema>

interface AddImageBlockProps {
    blocId: string
    setIsAddSousBloc: (isAddSousBloc: boolean) => void

}

export function AddImageBlock({ setIsAddSousBloc,blocId }: AddImageBlockProps) {
    const [isCropping, setIsCropping] = useState(false)
    const [tempImageUrl, setTempImageUrl] = useState<string | null>(null)

    const form = useForm<ImageBlockFormData>({
        resolver: zodResolver(imageSchema),
        defaultValues: {
            title: "",
            imageUrl: "",
            altText: "",
            description: "",
            isPrivate: false,
            isDisplay: true,
            isPaid: false,
        },
    })

    const onSubmit = (data: ImageBlockFormData) => {
        console.log('data:',data)
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const urlImage = URL.createObjectURL(file)
            form.setValue("imageUrl", urlImage)
            setTempImageUrl(urlImage)
            setIsCropping(true)
        }
    }

    const handleCropComplete = async (croppedImageBlob: Blob) => {
        const file = new File([croppedImageBlob], "sous-bloc-image.jpg", { type: 'image/jpeg' })
        const urlImage = URL.createObjectURL(file)
        form.setValue('imageFile', file)
        form.setValue("imageUrl", urlImage)
        setIsCropping(false)
        setTempImageUrl(null)
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
                    name="imageFile"
                    render={({ field: { onChange, value, ...rest } }) => (
                        <FormItem>
                            <FormLabel htmlFor="image-upload" className="cursor-pointer">
                                <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                                    <AvatarImage src={form.watch("imageUrl") || ""} />
                                    <AvatarFallback>
                                        <Camera className="w-8 h-8 text-muted-foreground" />
                                    </AvatarFallback>
                                </Avatar>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    id="image-upload"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    {...rest}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="altText"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Texte alternatif</FormLabel>
                            <FormControl>
                                <Input placeholder="Description de l'image" {...field} />
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

                <Button type="submit">Ajouter le sous-bloc Image</Button>
            </form>

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
        </Form>
    )
}