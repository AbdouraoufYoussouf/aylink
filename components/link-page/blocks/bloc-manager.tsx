/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Edit, Plus, Edit2, MoreHorizontal, Lock, Unlock, Eye, EyeOff, Loader2 } from 'lucide-react'
import { AddSousBlock } from "./add-sousblock"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AddBlocComponent } from "./add-block-form"
import { Switch } from "@/components/ui/switch"
import { useBlocStore } from "@/store/bloc-store"
import { useQuery } from "@tanstack/react-query"
import { deleteBlocAction, getAllBlocForUserAction } from "@/actions/blocs/bloc-action"
import { useServerActionMutation } from "@/lib/zsa.query"
import { toast } from "@/lib/use-toast"
import { AlertModal } from "@/components/modals/alert-modal"
import { SubActionToolbar } from "./sub-action-toolbar"
import { SubBlocTypeType } from "@/src/types/bloc-type"
import { motion } from 'framer-motion'
import { BlocVideo } from "../user-links/blocs/bloc-video"
import { BlocUrl } from "../user-links/blocs/bloc-url"

// Données statiques pour l'exemple


export function BlocksManager() {
  const [isAddBloc, setIsAddBloc] = useState(false)
  const [isAddSousBloc, setIsAddSousBloc] = useState(false)
  const [currentBlocId, setCurrentBlocId] = useState<string>("")
  const [isConfirmDelete, setIsConfirmDelete] = useState(false)
  const [subBlocType, setSubBlocType] = useState<SubBlocTypeType>('VIDEO')

  const { blocs, setBlocs, removeBloc } = useBlocStore()

  const { isLoading } = useQuery({
    queryKey: ['blocs'],
    queryFn: async () => {
      const res = await getAllBlocForUserAction()
      if (res.success && res.data) {
        setBlocs(res.data)
      }
      return []
    },
  })

  const { isPending, mutateAsync } = useServerActionMutation(deleteBlocAction, {
    onSuccess(res) {
      if (res?.success === true && res?.data) {
        toast({
          title: 'Succes',
          description: res.message,
          duration: 5000,
        })
        removeBloc(res.data.id)
        setIsAddBloc(false)
        setIsConfirmDelete(false)
      } else {
        toast({
          title: 'Erreur',
          description: res.message,
          duration: 5000,
        })
      }
    },
  })


  const handleUpdateBloc = async (blocId: string) => {
    setCurrentBlocId(blocId)
  }
  const handleDeleteBloc = async (blocId: string) => {
    setCurrentBlocId(blocId)
    setIsConfirmDelete(true)
  }
  const handleConfirmDeleteBloc = async (blocId: string) => {
    await mutateAsync({ id: blocId })
  }


  if (isLoading) {
    return <Loader2 className="animate-spin" />
  }

  return (
    <div className="space-y-4">
      {blocs.map(bloc => (
        <Card key={bloc.id} className="p-2">
          <CardHeader className="relative p-4">
            <CardTitle className="flex items-center justify-between">
              {bloc.name}
              <div className="flex absolute top-0 right-0 items-center gap-2  rounded-md p-1">
                <Button variant="outline" className="h-8 w-8 " size="icon" onClick={() => handleUpdateBloc(bloc.id)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="h-8 w-8 " size="icon" onClick={() => handleDeleteBloc(bloc.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 flex flex-col gap-3" >
            <div className="relative grid xl:grid-cols-2 2xl:grid-cols-3 gap-4">
              {bloc.subBlocs && bloc.subBlocs.map(subBloc => (
                <div key={subBloc.id} className="flex relative gap-2   mb-2">
                  <div className="w-full">
                    {
                      subBloc.type === "VIDEO" &&
                      <BlocVideo isAdmin subBloc={subBloc} />
                    }
                    <motion.div
                      key={subBloc.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {
                        subBloc.type === "URL" &&
                        <BlocUrl isAdmin subBloc={subBloc} />
                      }
                    </motion.div>
                  </div>
              
                </div>
              ))}

            </div>

            {isAddSousBloc && currentBlocId === bloc.id && (
              <AddSousBlock
                blocId={currentBlocId}
                isAddSousBloc={isAddSousBloc}
                setIsAddSousBloc={setIsAddSousBloc}
                subBlocType={subBlocType}
              />
            )}
            {
              !isAddSousBloc && (
                <SubActionToolbar
                  handleAction={() => setCurrentBlocId(bloc.id)}
                  setIsAddSubBloc={setIsAddSousBloc} setSubBlocType={setSubBlocType} />
              )
            }
          </CardContent>
        </Card>
      ))}
      {isAddBloc && (
        <AddBlocComponent
          isAddBloc={isAddBloc}
          setIsAddBloc={setIsAddBloc}
        />
      )}
      {
        !isAddBloc && !isAddSousBloc && (
          <Button className="" onClick={() => setIsAddBloc(true)}>
            <Plus className="mr-2 h-4 w-4" /> Ajouter un bloc
          </Button>
        )
      }

      <AlertModal
        isOpen={isConfirmDelete}
        onClose={() => setIsConfirmDelete(false)}
        onConfirm={() => handleConfirmDeleteBloc(currentBlocId)}
        loading={isPending}
        title="Supression d'un bloc"
        description="Voulez-vous supprimer ce bloc ?"
      />
    </div>
  )
}

