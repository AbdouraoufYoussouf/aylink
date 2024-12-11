/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddUrlBlock } from "../user-links/blocs/add-url-bloc-form"
import { AddImageBlock } from "../user-links/blocs/add-image-bloc-form"
import { AddVideoBlock } from "../user-links/blocs/add-video-bloc-form"


interface AddSousBlocProps {
  blocId: string
  isAddSousBloc: boolean
  setIsAddSousBloc: (isAddSousBloc: boolean) => void
  onAddSousBloc: (blocId: string, sousBloc: any) => void
}

export function AddSousBlock({ blocId, setIsAddSousBloc, onAddSousBloc }: AddSousBlocProps) {
  const [selectedType, setSelectedType] = useState<string>("VIDEO")

  const renderSubBlockComponent = () => {
    switch (selectedType) {
      case "URL":
        return <AddUrlBlock type={selectedType} blocId={blocId} onAddSousBloc={onAddSousBloc} />
      case "IMAGE":
        return <AddImageBlock type={selectedType} blocId={blocId} onAddSousBloc={onAddSousBloc} />
    case "VIDEO":
        return <AddVideoBlock type={selectedType} blocId={blocId} onAddSousBloc={onAddSousBloc} />
      default:
        return null
    }
  }

  return (
    <Card className="max-w-6xl">
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
        <div className="space-y-4">
          <div>
            <label htmlFor="type-select" className="block text-sm font-medium text-gray-700 mb-1">
              Type de sous-bloc
            </label>
            <Select onValueChange={setSelectedType} defaultValue={selectedType}>
              <SelectTrigger id="type-select">
                <SelectValue placeholder="Sélectionnez le type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="URL">URL</SelectItem>
                <SelectItem value="IMAGE">Image</SelectItem>
                <SelectItem value="DOCUMENT">Document</SelectItem>
                <SelectItem value="VIDEO">Vidéo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {renderSubBlockComponent()}
        </div>
      </CardContent>
    </Card>
  )
}