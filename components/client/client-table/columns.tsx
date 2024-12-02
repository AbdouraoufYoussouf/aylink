
'use client';

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-actions"

import { Checkbox } from "@/components/ui/checkbox";
import { ClientType } from "@/src/types/client-type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export const columns: ColumnDef<ClientType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  
  {
    accessorKey: 'image',
    header: 'Profil',
    cell: ({ row }) => {
      return <div>
        <Avatar className="h-8 w-8 ">
                <AvatarImage src={row.original.image} alt={row.original.name} />
                <AvatarFallback className="rounded-lg">{row.original.name}</AvatarFallback>
              </Avatar>
      </div>;
    }
  },
  {
    accessorKey: 'name',
    header: 'Nom',
    cell: ({ row }) => {
      const name = row.original.name ?? 'N/A';
      return <span>{name}</span>;
    }
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <span className="text-nowrap">{row.original.email}</span>
    ),
  },
 
  {
    accessorKey: 'pseudo',
    header: 'Pseudo',
    cell: ({ row }) => (
      <span className="text-nowrap">{row.original.pseudo} </span>
    ),
  },
 

  // Actions
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
