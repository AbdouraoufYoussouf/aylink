
'use client';

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-actions"
import { Checkbox } from "@/components/ui/checkbox";
import { ContactType } from "@/src/types/contact-type";
import { MyTooltipProvider } from "@/components/tooltip-provider";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";


export const columns: ColumnDef<ContactType>[] = [
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
  
  // Code postal
  {
    accessorKey: 'name',
    header: 'Nom',
    cell: ({ row }) => {
      const name = row.original.name ?? 'N/A';
      return <span>{name}</span>;
    }
  },
  // Prix
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <span className="text-nowrap">{row.original.email}</span>
    ),
  },
  {
    accessorKey: 'country',
    header: 'Pays',
    cell: ({ row }) => (
      <span className="text-nowrap">{row.original.country}</span>
    ),
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => (
      <span className="text-nowrap">{row.original.location}</span>
    ),
  },
 
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <MyTooltipProvider
        content="trier"
      >
        <Button className="uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          DATE crée
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </MyTooltipProvider>
    ),
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return createdAt ? (
        <span>
        {new Date(createdAt).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })}  
          {" à "}
          {new Date(createdAt).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      ) : (
        <span>Pas de Date</span>
      )
    },
  },
  // Actions
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
