"use client"

import React, { useState } from 'react'
import { Edit2, Eye, EyeOff, Lock, MoreHorizontal, Trash2, Unlock } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { SousBlocType } from '@/src/types/bloc-type'
import { useBlocStore } from '@/store/bloc-store'
import { AlertModal } from '@/components/modals/alert-modal'
import { useServerActionMutation } from '@/lib/zsa.query'
import { deleteSubBlocAction } from '@/actions/blocs/subbloc-action'
import { toast } from '@/lib/use-toast'
type Props = {
    subBloc: SousBlocType,
}

export const BlocUrlOption = ({ subBloc }: Props) => {
    const { toggleDisplaySubBloc, togglePaidSubBloc, togglePrivateSubBloc, removeSubBloc } = useBlocStore()
    const [isConfirmDelete, setIsConfirmDelete] = useState(false)


    const { isPending, mutateAsync } = useServerActionMutation(deleteSubBlocAction, {
        onSuccess(res) {
            if (res?.success === true && res?.data) {
                toast({
                    title: 'Succes',
                    description: res.message,
                    duration: 5000,
                })
                removeSubBloc(res.data.blocId, res.data.id)
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

    const handleDeleteSubBloc = async () => {
        setIsConfirmDelete(true)
    }
    const handleConfirmDeleteSubBloc = async () => {
        await mutateAsync({ id: subBloc.id })
    }

    const handleToggleVisibility = (blocId: string, sousBlocId: string) => {
        toggleDisplaySubBloc(blocId, sousBlocId)
    }

    const handleTogglePrivacy = (blocId: string, sousBlocId: string) => {
        togglePrivateSubBloc(blocId, sousBlocId)

    }
    return (
        <div className="absolute right-1 top-1">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-4 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => {/* Handle edit action */ }}>
                        <Edit2 className="mr-2 h-4 w-4" />
                        <span>Modifier</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                        <div className="flex items-center">
                            {subBloc.isPrivate ? <Lock className="mr-2 h-4 w-4" /> : <Unlock className="mr-2 h-4 w-4" />}
                            <span>Accès privé</span>
                            <Switch
                                className="ml-2"
                                checked={subBloc.isPrivate}
                                onCheckedChange={() => handleTogglePrivacy(subBloc.blocId!, subBloc.id)}
                            />
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                        <div className="flex items-center justify-between w-full" onClick={(e) => e.stopPropagation()}>
                            <div className="flex  justify-end items-end">
                                {subBloc.isDisplay ? <Eye className="mr-2 h-4 w-4" /> : <EyeOff className="mr-2 h-4 w-4" />}

                                <span>Visibilité</span>
                            </div>
                            <Switch
                                className="ml-2"
                                checked={subBloc.isDisplay}
                                onCheckedChange={() => handleToggleVisibility(subBloc.blocId!, subBloc.id)}
                            />
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDeleteSubBloc()} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Supprimer</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertModal
                isOpen={isConfirmDelete}
                onClose={() => setIsConfirmDelete(false)}
                onConfirm={() => handleConfirmDeleteSubBloc()}
                loading={isPending}
                title="Supression d'un bloc"
                description="Voulez-vous supprimer ce bloc ?"
            />
        </div>
    )
}
