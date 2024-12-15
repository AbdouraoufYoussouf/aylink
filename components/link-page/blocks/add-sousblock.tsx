/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'
import { AddUrlBlock } from "../user-links/blocs/add-url-bloc-form"
import { AddImageBlock } from "../user-links/blocs/add-image-bloc-form"
import { AddVideoBlock } from "../user-links/blocs/add-video-bloc-form"
import { SubBlocTypeType } from "@/src/types/bloc-type"


interface AddSousBlocProps {
  subBlocType:SubBlocTypeType
  blocId?: string
  titleBloc?: string
  isAddSousBloc?: boolean
  setIsAddSousBloc: (isAddSousBloc: boolean) => void
}

export function AddSousBlock({subBlocType,  blocId, setIsAddSousBloc }: AddSousBlocProps) {
  const [selectedType, setSelectedType] = useState<string>(subBlocType)

  const renderSubBlockComponent = () => {
    switch (selectedType) {
      case "URL":
        return <AddUrlBlock setIsAddSousBloc={setIsAddSousBloc} blocId={blocId!} />
      case "IMAGE":
        return <AddImageBlock setIsAddSousBloc={setIsAddSousBloc} blocId={blocId!} />
      case "VIDEO":
        return <AddVideoBlock setIsAddSousBloc={setIsAddSousBloc} blocId={blocId!} />
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
          {renderSubBlockComponent()}
        </div>
      </CardContent>
    </Card>
  )
}