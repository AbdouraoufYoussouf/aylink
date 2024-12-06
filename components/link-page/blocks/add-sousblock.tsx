/* eslint-disable react/no-unescaped-entities */
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
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
import { Checkbox } from "@/components/ui/checkbox"

interface AddSousBlocProps {
  blocId: string
  isAddSousBloc: boolean
  setIsAddSousBloc: (isAddSousBloc: boolean) => void
  onAddSousBloc: (blocId: string, sousBloc: CreateSousBlockType) => void
}

export function AddSousBlock({ blocId, setIsAddSousBloc, onAddSousBloc }: AddSousBlocProps) {
  const [isCropping, setIsCropping] = useState(false)
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null)

  const form = useForm<CreateSousBlockType>({
    resolver: zodResolver(createSousBlocSchema),
    defaultValues: {
      id: uuidv4(),
      type: "URL",
      title: "",
      description: "",
      isPrivate: false,
      isDisplay: true,
      isPaid: false,
    },
  })

  const onSubmit = (data: CreateSousBlockType) => {
    onAddSousBloc(blocId, data)
    console.log("sous bloc", data)
    // form.reset()
    // setIsAddSousBloc(false)
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
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de sous-bloc</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="URL">URL</SelectItem>
                      <SelectItem value="IMAGE">Image</SelectItem>
                      <SelectItem value="DOCUMENT">Document</SelectItem>
                      <SelectItem value="VIDEO">Vidéo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-center">
              <Controller
                name="isPrivate"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3">
                    <FormLabel className="flex items-center">
                      <Unlock className="mr-1 h-4 w-4" />
                      Public
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="flex items-center">
                      <Lock className="mr-1 h-4 w-4" />
                      Privé
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>

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

              {form.watch("type") === "URL" && (
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
              )}

              {form.watch("type") === "IMAGE" && (
                <>
                  <FormField
                    control={form.control}
                    name="imageFile"
                    render={({  }) => (
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
                            onChange={(e) => {
                              handleImageUpload(e)
                            }}
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
                </>
              )}

              {form.watch("type") === "DOCUMENT" && (
                <>
                  <FormField
                    control={form.control}
                    name="documentUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL du document</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/document.pdf" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fileType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de fichier</FormLabel>
                        <FormControl>
                          <Input placeholder="pdf, docx, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {form.watch("type") === "VIDEO" && (
                <>
                  <FormField
                    control={form.control}
                    name="videoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL de la vidéo</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/video.mp4" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="thumbnailUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL de la miniature</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/thumbnail.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Durée (en secondes)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>

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

