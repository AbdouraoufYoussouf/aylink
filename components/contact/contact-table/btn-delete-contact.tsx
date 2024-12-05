"use client"

import { deleteManyContactAction } from '@/actions/contact-action'
import { AlertModal } from '@/components/modals/alert-modal'
import { Button } from '@/components/ui/button'
import { toast } from '@/lib/use-toast'
import { useServerActionMutation } from '@/lib/zsa.query'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2, Trash } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
    contactIdsSelected: string[]
    setRowSelection:()=>void
    disabled:boolean
}

export const BtnDeleteContact = ({ contactIdsSelected,disabled ,setRowSelection}: Props) => {
    const [openDeleteAll, setOpenDeleteAll] = useState(false);
    const queryClient = useQueryClient();

    const { isPending, mutateAsync } = useServerActionMutation(deleteManyContactAction, {
        onSuccess(res) {
            if (res?.success === true) {
                toast({
                    title: "Succes",
                    description: res.message,
                })
                setOpenDeleteAll(false);
                queryClient.invalidateQueries({ queryKey: ['callbacks'] });
            } else {
                toast({
                    title: "Error",
                    description: res.message,
                    variant: "destructive"
                })
            }
        },
    });

    const onConfirm = async () => {
        const res = await mutateAsync({ contactsIds: contactIdsSelected });
        if (res.success) {
            setRowSelection();
            queryClient.invalidateQueries({ queryKey: ['contacts'] });
            toast({
                title: "Succès",
                description: res.message,
            });
            setOpenDeleteAll(false);
        } else {
            toast({
                title: "Erreur",
                description: res.message,
                variant: "destructive",
            });
        }
    };

    return (
        <div>
            <Button disabled={disabled}
                onClick={() => setOpenDeleteAll(true)}
                size={'icon'} className="h-8 text-red-400" variant={'outline'}>
                {
                    isPending ? <Loader2 className="animate-spin" /> : <Trash />
                }
            </Button>
            <AlertModal
                isOpen={openDeleteAll}
                onClose={() => setOpenDeleteAll(false)}
                onConfirm={onConfirm}
                loading={isPending}
                title='Suppression des contacts'
                description={`Cette action supprimera définitivement ${contactIdsSelected.length} contacts sélectionnés, êtes-vous sûr de vouloir continuer ?`}
            />
        </div>
    )
}
