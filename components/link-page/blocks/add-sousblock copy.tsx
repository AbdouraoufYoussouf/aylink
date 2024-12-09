/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { v4 as uuidv4 } from "uuid"
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
import { X, Camera, Lock, Unlock } from 'lucide-react'
import { CreateSousBlockType, createSousBlocSchema } from "@/src/types/block-type"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AutoResizeTextarea } from "@/components/auto-rezise-textarea"
import ImageCropper from "@/components/image-cropper"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddSousBlocProps {
  blocId: string
  isAddSousBloc: boolean
  setIsAddSousBloc: (isAddSousBloc: boolean) => void
  onAddSousBloc: (blocId: string, sousBloc: CreateSousBlockType) => void
}

export function AddSousBlock({ setIsAddSousBloc }: AddSousBlocProps) {
  const [isCropping, setIsCropping] = useState(false)
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null)

  const form = useForm<CreateSousBlockType>({
    resolver: zodResolver(createSousBlocSchema),
    defaultValues: {
      id: uuidv4(),
      imageFile: undefined,
      title: "",
      description: "",
      url: "",
      // isDisplay: false,
      isPrivate: false
    },
  })

  const onSubmit = (data: CreateSousBlockType) => {
    // onAddSousBloc(blocId, data)
    console.log("sous bloc", data)
    // form.reset()
  }


  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const urlImage = URL.createObjectURL(file)
      // form.setValue("imageName", file.name);
      // setTempImageUrl(urlImage)
      setIsCropping(true)
    }
  }

  const handleCropComplete = async (croppedImageBlob: Blob) => {
    // const nameImage = form.getValues("imageName");
    // const file = new File([croppedImageBlob], nameImage ? nameImage : "sous-bloc-image.jpg", { type: 'image/jpeg' })
    // const urlImage = URL.createObjectURL(file)
    // form.setValue('imageFile', file)
    // form.setValue("imageUrl", urlImage);
    // setIsCropping(false)
    // setTempImageUrl(null)
  }


  return (
    <Card className="max-w-xl">
      <CardHeader className="px-4 py-2">
        <CardTitle className="flex underline text-center relative items-center justify-center mt-2">
          Ajouter un sous-bloc
          <div className="absolute right-0">

            <Button variant="ghost" className="h-7 w-7 " size="icon" onClick={() => setIsAddSousBloc(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
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
                 <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type d'URL</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le type d'URL" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="default">Par défaut</SelectItem>
                <SelectItem value="video">Vidéo</SelectItem>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="image">Image</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
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
                      <Input placeholder="un titre" {...field} />
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
                    <FormLabel>URL du sous bloc</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full gap-2 lg:gap-4">
              <FormField
                control={form.control}
                name="imageFile"
                render={({ }) => (
                  <FormItem>
                    <FormLabel htmlFor="image-upload" className="cursor-pointer">
                      <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                        <AvatarImage src={form.getValues("imageUrl") || ""} />
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
            </div>
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

