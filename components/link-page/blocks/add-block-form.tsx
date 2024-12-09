/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
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
import { X, Plus, Camera } from 'lucide-react'
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
import { BlockType, createBlockShema } from "@/src/types/block-type"

interface AddBlocComponentProps {
  isAddBloc: boolean
  setIsAddBloc: (isAddBloc: boolean) => void
  onAddBloc: (formData: FormData) => void
}

export function AddBlocComponent({ setIsAddBloc }: AddBlocComponentProps) {
  const [isCropping, setIsCropping] = useState(false)
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null)
  const [currentEditingIndex, setCurrentEditingIndex] = useState<number | null>(null)

  const form = useForm<BlockType>({
    resolver: zodResolver(createBlockShema),
    defaultValues: {
      id: uuidv4(),
      title: "",
      subBlocks: [
        { id: uuidv4(), title: "", imageFile: undefined, imageUrl: "", description: "", url: "" },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subBlocks",
  })

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setTempImageUrl(imageUrl)
      setCurrentEditingIndex(index)
      setIsCropping(true)
    }
  }

  const handleCropComplete = async (croppedImageBlob: Blob) => {
    if (currentEditingIndex !== null) {
      const file = new File([croppedImageBlob], 'cropped-image.jpg', { type: 'image/jpeg' })
      const imageUrl = URL.createObjectURL(file)

      // Met à jour les champs dans le formulaire
      form.setValue(`subBlocks.${currentEditingIndex}.imageFile`, file)
      form.setValue(`subBlocks.${currentEditingIndex}.imageUrl`, imageUrl)
      // form.setValue(`subBlocks.${currentEditingIndex}.imageName`, file.name)

      setIsCropping(false)
      setTempImageUrl(null)
      setCurrentEditingIndex(null)
    }
  }

  const onSubmit = (data: BlockType) => {
    const formData = new FormData()
    formData.append("id", data.id)
    formData.append("title", data.title)

    // data.subBlocks.forEach((subBlock, index) => {
    //   formData.append(`subBlocks[${index}][id]`, subBlock.id)
    //   formData.append(`subBlocks[${index}][title]`, subBlock.title)
    //   formData.append(`subBlocks[${index}][description]`, subBlock.description)
    //   formData.append(`subBlocks[${index}][url]`, subBlock.url)
    //   if (subBlock.imageFile) {
    //     formData.append(`subBlocks[${index}][imageFile]`, subBlock.imageFile)
    //   }
    // })
    console.log('bloc:',formData)
    // onAddBloc(formData):
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
              name="title"
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
            <div className="grid lg:grid-cols-2 gap-3 w-full">
              {fields.map((field, index) => (
                <Card key={field.id} className="p-4 relative ">
                  <CardTitle className="text-lg mb-4">Sous-bloc {index + 1}</CardTitle>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name={`subBlocks.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titre du sous-bloc</FormLabel>
                          <FormControl>
                            <Input placeholder="Titre du sous-bloc" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`subBlocks.${index}.url`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL du sous-bloc</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex w-full gap-2 lg:gap-4">

                      <FormField
                        control={form.control}
                        name={`subBlocks.${index}.imageFile`}
                        render={() => (
                          <FormItem>
                            <FormLabel htmlFor={`image-upload-${index}`} className="cursor-pointer">
                              <Avatar className="w-20 h-20">
                                <AvatarImage src={form.getValues(`subBlocks.${index}.imageUrl`) || ""} />
                                <AvatarFallback>
                                  <Camera className="w-8 h-8 text-muted-foreground" />
                                </AvatarFallback>
                              </Avatar>
                            </FormLabel>
                            <FormControl>
                              <Input
                                id={`image-upload-${index}`}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageUpload(e, index)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`subBlocks.${index}.description`}
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
                    {index > 0 && (
                      <Button  
                      className="absolute  w-7 h-7 flex items-center justify-center -top-2 right-2"
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ id: uuidv4(), title: "", imageUrl: '', imageFile: undefined, imageName: "", description: "", url: "",isDisplay:true,isPrivate:false })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un sous-bloc
            </Button> */}

            <Button type="submit" className="w-full">Sauvegarder le bloc</Button>
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

