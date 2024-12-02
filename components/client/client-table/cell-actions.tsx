/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ClientType } from '@/src/types/client-type';
import { ClipboardEdit, MoreHorizontal, Trash } from 'lucide-react';

import { FaUserPen } from 'react-icons/fa6';

interface CellActionProps {
    data: ClientType;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
   
  

    return (
        <>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem >
                        <ClipboardEdit className="mr-2 h-4 w-4" /> Modifier le Devis
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <FaUserPen className="mr-2 h-4 w-4" /> Modifier le contact
                    </DropdownMenuItem>
                    <DropdownMenuItem >
                      Voir le callback
                  
                    </DropdownMenuItem>
                    <DropdownMenuItem className='text-destructive' >
                        <Trash className="mr-2 h-4 w-4" /> Supprimer le Devis
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};