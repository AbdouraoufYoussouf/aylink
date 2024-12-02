
'use client';

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-actions"
import { Checkbox } from "@/components/ui/checkbox";
import { ContactType } from "@/src/types/contact-type";


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
 

  // Actions
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
