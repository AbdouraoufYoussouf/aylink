"use client"

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

type Props = {
    title: string,
    description: string,
    isModalOpen: boolean,
    setIsModalOpen: (value: boolean) => void,
    children: React.ReactNode,
    interactOutside?: boolean,

}

export const FormModal = ({ title, description, isModalOpen, setIsModalOpen, children, interactOutside = false }: Props) => {
    const handleInteractOutside = (event: Event) => {
        if (interactOutside) {
            event.preventDefault();
        }
    };
    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent onInteractOutside={handleInteractOutside} className="sm:w-[425px] w-[350px] rounded-lg max-h-[80vh] px-2 py-3 sm:p-4 sm:max-h-[90vh] scrollbar-thin scrollbar-thumb-muted-foreground  overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription className="text-start text-sm leading-4">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}
