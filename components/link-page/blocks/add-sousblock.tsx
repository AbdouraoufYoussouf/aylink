"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
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
import { X, Camera } from 'lucide-react'
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

interface AddSousBlocProps {
  blocId: string
  isAddSousBloc: boolean
  setIsAddSousBloc: (isAddSousBloc: boolean) => void
  onAddSousBloc: (blocId: string, sousBloc: CreateSousBlockType) => void
}

export function AddSousBlock({ blocId, isAddSousBloc, setIsAddSousBloc, onAddSousBloc }: AddSousBlocProps) {
  const [isCropping, setIsCropping] = useState(false)
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null)

  const form = useForm<CreateSousBlockType>({
    resolver: zodResolver(createSousBlocSchema),
    defaultValues: {
      id: uuidv4(),
      image: null,
      description: "",
      url: "",
    },
  })

  const onSubmit = (data: CreateSousBlockType) => {
    onAddSousBloc(blocId, data)
    form.reset()
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setTempImageUrl(imageUrl)
      setIsCropping(true)
    }
  }

  const handleCropComplete = async (croppedImageBlob: Blob) => {
    const file = new File([croppedImageBlob], 'sous-bloc-image.jpg', { type: 'image/jpeg' })
    form.setValue('image', file)
    setIsCropping(false)
    setTempImageUrl(null)
  }

  return (
    <Card className="max-w-xl">
      <CardHeader className="px-4 py-2">
        <CardTitle className="flex text-center relative items-center justify-center mt-2">
          Ajouter un sous-bloc
          <Button variant="ghost" className="h-7 w-7 absolute right-0" size="icon" onClick={() => setIsAddSousBloc(false)}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
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
                name="image"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel htmlFor="image-upload" className="cursor-pointer">
                      <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                        <AvatarImage src={value ? URL.createObjectURL(value) : undefined} />
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
                        {...field}
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

