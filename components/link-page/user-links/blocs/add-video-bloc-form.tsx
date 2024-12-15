/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { videoSchema } from '@/src/types/bloc-type'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from '@/lib/use-toast'
import { AddSubBlocVideoAction } from '@/actions/blocs/bloc-video-action'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Loader2 } from 'lucide-react'
import { useBlocStore } from '@/store/bloc-store'

interface AddVideoBlockProps {
    blocId: string
    setIsAddSousBloc: (isAddSousBloc: boolean) => void

}
export const AddVideoBlock = ({ setIsAddSousBloc, blocId }: AddVideoBlockProps) => {
    const [isVideoUpload, setIsVideoUpload] = useState(false)
    const [isthumnailUpload, setIsthumnailUpload] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const { addSubBloc } = useBlocStore()

    const form = useForm<z.infer<typeof videoSchema>>({
        resolver: zodResolver(videoSchema),
        defaultValues: {
            id: '1',
            type: "VIDEO",
            isPrivate: false,
            isDisplay: true,
            isPaid: false,
            actionType: "URL",
            title: '',
            description: "",
            actionFormId: "",
            actionUrl: "",
            blocId: blocId,
            duration: 0,
            videoFile: undefined,
            videoUrl: "",
            thumbnailFile: undefined,
            thumbnailUrl: ''
        },
    });


    const { formState: { errors }, watch } = form;
    const actionType = watch("actionType") || "URL";


    async function onSubmit(values: z.infer<typeof videoSchema>) {
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
            formData.append('actionType', values.actionType);
            formData.append('title', values.title);
            formData.append('description', values.description);
            if (values.actionFormId) {
                formData.append('actionFormId', values.actionFormId);
            }
            if (values.actionUrl) {
                formData.append('actionUrl', values.actionUrl);
            }
            if (values.blocId) {
                formData.append('blocId', values.blocId);
            }
            if (values.actionFormId) {
                formData.append('duration', String(values.duration));
            }

            // Ajoutez les fichiers vidéo et miniature s'ils existent
            if (values.videoFile) {
                formData.append('videoFile', values.videoFile);
            }

            if (values.thumbnailFile) {
                formData.append('thumbnailFile', values.thumbnailFile);
            }

            // Ensuite, vous pouvez envoyer formData à votre serveur via la mutation
            // Active l'état de chargement pour la vidéo
            setIsVideoUpload(true);
            setIsthumnailUpload(true)
            // Envoie du FormData avec les fichiers et les données
            const res = await AddSubBlocVideoAction(formData)
            console.log('res:', res)
            if (res.success && res.data) {
                toast({
                    title: "Success",
                    description: res.message
                })
                addSubBloc(res.data.blocId!, res.data)
                setIsVideoUpload(false);  // Désactive l'état de chargement une fois l'envoi terminé
                setIsthumnailUpload(false)
                setIsPending(false)
                setIsAddSousBloc(false)
            }

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
        <Card className="w-full  mx-auto">
            <CardHeader>
                <CardTitle>Ajouter un bloc vidéo</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Titre</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
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
                                                <Textarea {...field} className="h-[120px]" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="isPrivate"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                                                <FormLabel className="text-base">Privé</FormLabel>
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
                                            <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                                                <FormLabel className="text-base">Afficher</FormLabel>
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
                                            <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                                                <FormLabel className="text-base">Payant</FormLabel>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="videoFile"
                                    render={({ field: { value, onChange, ...field } }) => (
                                        <FormItem>
                                            <FormLabel>Fichier vidéo</FormLabel>
                                            <FormControl>
                                                <div className="space-y-2 relative">
                                                    {isVideoUpload && (
                                                        <span
                                                            className="absolute bottom-1/4 z-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-4 text-white focus:outline-none"
                                                        >
                                                            <Loader2 className='animate-spin' size={30} />
                                                        </span>
                                                    )}
                                                    <Input
                                                        type="file"
                                                        accept="video/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                onChange(file);
                                                                const videoPreview = document.getElementById('videoPreview') as HTMLVideoElement;
                                                                videoPreview.src = URL.createObjectURL(file);
                                                            }
                                                        }}
                                                        {...field}
                                                    />
                                                    <AspectRatio ratio={16 / 9} className="bg-muted">
                                                        <video id="videoPreview" controls className="h-full w-full object-cover">
                                                            <source src="" type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    </AspectRatio>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="thumbnailFile"
                                    render={({ field: { value, onChange, ...field } }) => (
                                        <FormItem>
                                            <FormLabel>Miniature</FormLabel>
                                            <FormControl>
                                                <div className="space-y-2 relative">
                                                    {isthumnailUpload && (
                                                        <span
                                                            className="absolute top-1/2 z-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-4 text-white focus:outline-none"
                                                        >
                                                            <Loader2 className='animate-spin' size={30} />
                                                        </span>
                                                    )}
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                onChange(file);
                                                                const thumbnailPreview = document.getElementById('thumbnailPreview') as HTMLImageElement;
                                                                thumbnailPreview.src = URL.createObjectURL(file);
                                                            }
                                                        }}
                                                        {...field}
                                                    />
                                                    <AspectRatio ratio={16 / 9} className="bg-muted">
                                                        <img id="thumbnailPreview" alt="Thumbnail preview" className="h-full w-full object-cover" />
                                                    </AspectRatio>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="actionType"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Type d'action</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-4"
                                            >
                                                <FormItem className="flex items-center space-x-2">
                                                    <FormControl>
                                                        <RadioGroupItem value="URL" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">URL</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2">
                                                    <FormControl>
                                                        <RadioGroupItem value="FORM" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Formulaire</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {actionType === "URL" && (
                                <FormField
                                    control={form.control}
                                    name="actionUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>URL d'action</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            {actionType === "FORM" && (
                                <FormField
                                    control={form.control}
                                    name="actionFormId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ID du formulaire</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>

                        <Button type="submit" disabled={isPending} className="w-full">
                            {isPending ? 'Uploading...' : 'Ajouter le bloc vidéo'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}