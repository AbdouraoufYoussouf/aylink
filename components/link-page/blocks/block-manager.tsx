"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Edit, Plus, Camera, Edit2 } from 'lucide-react'
import { AddSousBlock } from "./add-sousblock"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BlockType, CreateSousBlockType } from "@/src/types/block-type"
import { AddBlocComponent } from "./add-block-form"

// Données statiques pour l'exemple
const initialBlocs: BlockType[] = [
  {
    id: "1",
    title: "Bloc 1",
    subBlocks: [
      { id: "1-1", title: "Hmrenov26 le pvc et alu", image: "https://github.com/shadcn.png", description: "Cobara Kai saison 6 Mon canal télélegram Je vous partage mes passions, mes astuces et mes conseils en business.", url: "https://example.com/1" },
      { id: "1-2", title: "Hmrenov26 le pvc et alu", image: "https://github.com/shadcn.png", description: "Description 2", url: "https://example.com/2" },
    ],
  },
  {
    id: "2",
    title: "Bloc 2",
    subBlocks: [
      { id: "2-1", title: "Hmrenov26 le pvc et alu", image: "https://github.com/shadcn.png", description: "Description 3", url: "https://example.com/3" },
    ],
  },
]

export function BlocksManager() {
  const [blocs, setBlocs] = useState<BlockType[]>(initialBlocs)
  const [isAddBloc, setIsAddBloc] = useState(false)
  const [isAddSousBloc, setIsAddSousBloc] = useState(false)
  const [currentBlocId, setCurrentBlocId] = useState<string | null>(null)

  const handleAddBloc = async (formData: FormData) => {
    // Here you would typically send the formData to your server
    // For this example, we'll create a new Bloc object from the formData
    const newBloc: BlockType = {
      id: formData.get('id') as string,
      title: formData.get('title') as string,
      subBlocks: [],
    }

    const subBlocksCount = Array.from(formData.keys()).filter(key => key.startsWith('subBlocks[')).length / 4

    for (let i = 0; i < subBlocksCount; i++) {
      const subBlock: CreateSousBlockType = {
        id: formData.get(`subBlocks[${i}][id]`) as string,
        title: formData.get(`subBlocks[${i}][title]`) as string,
        description: formData.get(`subBlocks[${i}][description]`) as string,
        url: formData.get(`subBlocks[${i}][url]`) as string,
        image: URL.createObjectURL(formData.get(`subBlocks[${i}][image]`) as File),
      }
      newBloc.subBlocks.push(subBlock)
    }

    setBlocs([...blocs, newBloc])
    setIsAddBloc(false)
  }

  const handleAddSousBloc = (blocId: string, newSousBloc: CreateSousBlockType) => {
    setBlocs(blocs.map(bloc =>
      bloc.id === blocId
        ? { ...bloc, subBlocks: [...bloc.subBlocks, newSousBloc] }
        : bloc
    ))
    setIsAddSousBloc(false)
    setCurrentBlocId(null)
  }

  const handleDeleteBloc = (blocId: string) => {
    setBlocs(blocs.filter(bloc => bloc.id !== blocId))
  }

  const handleDeleteSousBloc = (blocId: string, sousBlocId: string) => {
    setBlocs(blocs.map(bloc =>
      bloc.id === blocId
        ? { ...bloc, subBlocks: bloc.subBlocks.filter(sb => sb.id !== sousBlocId) }
        : bloc
    ))
  }

  return (
    <div className="space-y-4">
      {blocs.map(bloc => (
        <Card key={bloc.id} >
          <CardHeader className="relative">
            <CardTitle className="flex items-center justify-between">
              {bloc.title}
              <div className="flex absolute top-0 right-0 items-center gap-2  rounded-md p-1">
                <Button variant="outline" className="h-8 w-8 " size="icon" onClick={() => handleDeleteBloc(bloc.id)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="h-8 w-8 " size="icon" onClick={() => handleDeleteBloc(bloc.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 flex flex-col gap-3" >
            <div className="relative grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {bloc.subBlocks.map(sousBloc => (
                <div key={sousBloc.id} className="flex relative gap-2 border rounded-lg p-2 items-center  mb-2">
                  <div className="">
                    <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                      <AvatarImage src={sousBloc.image} />
                      <AvatarFallback>SB</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex items-start flex-col justify-center">
                    <h1 className="font-semibold">{sousBloc.title}</h1>
                    <span className="text-sm text-muted-foreground leading-4">{sousBloc.description}</span>
                  </div>
                  <div className="absolute right-1 top-1">
                    <Button variant="outline" className="h-7 w-7 bg-accent" size="icon">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {isAddSousBloc && currentBlocId === bloc.id && (
              <AddSousBlock
                blocId={currentBlocId}
                isAddSousBloc={isAddSousBloc}
                setIsAddSousBloc={setIsAddSousBloc}
                onAddSousBloc={handleAddSousBloc}
              />
            )}
            <Button variant="outline" onClick={() => { setIsAddSousBloc(true); setCurrentBlocId(bloc.id); }}>
              <Plus className="mr-2 h-4 w-4" /> Ajouter un sous-bloc
            </Button>
          </CardContent>
        </Card>
      ))}
      <Button onClick={() => setIsAddBloc(true)}>
        <Plus className="mr-2 h-4 w-4" /> Ajouter un bloc
      </Button>
      {isAddBloc && (
        <AddBlocComponent
          isAddBloc={isAddBloc}
          setIsAddBloc={setIsAddBloc}
          onAddBloc={handleAddBloc}
        />
      )}
    </div>
  )
}

