"use client"

import { useCallback, useEffect, useState } from "react"
import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Loader2, Search, X } from 'lucide-react'
import { useQuery } from "@tanstack/react-query"

import { cn } from "@/lib/utils"
import { MyTooltipProvider } from "@/components/tooltip-provider"
import { SkeletonRows } from "@/components/skeletons/skeleton-rows"
import { ContactType } from "@/src/types/contact-type"
import { getAllContactFilterAction } from "@/actions/contact-action"
import { useSessionStatus } from "@/hooks/useSessionStatut"
import { BtnDeleteContact } from "./btn-delete-contact"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    searchPlaceholder?: string
}

export function ContactDataTable({
    columns, searchPlaceholder, }: DataTableProps<ContactType, unknown>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [searchTerm, setSearchTerm] = useState("")
    const { session } = useSessionStatus()
    const [isApplyingSearch, setIsApplyingSearch] = useState(false)
    const [isResetSearch, setIsResetSearch] = useState(false)

    const [showPagination, setShowPagination] = useState(true)
    const [lastScrollPosition, setLastScrollPosition] = useState(0)


    const [total, setTotal] = useState(0)

    const { isLoading, data, refetch } = useQuery({
        queryKey: ['contacts'],
        queryFn: async () => {
            const res = await getAllContactFilterAction({
                search: searchTerm,
                pseudo: session?.user.pseudo
            })
            if (res.success === true && res.data) {
                setTotal(res.total)
                return res.data
            }
            return []
        },
        enabled: false,
        staleTime: Infinity,
        gcTime: Infinity,
    })

    const table = useReactTable({
        data: data || [],
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: { sorting },
        pageCount: Math.ceil((total) / 100),
        manualPagination: true,
        initialState: {
            pagination: {
                pageSize: 50,
            },
        }
    })

    const totalPages = Math.ceil((total) / 100)

    const handleApplySearch = useCallback(async () => {
        setIsApplyingSearch(true)
        await refetch()
        setIsApplyingSearch(false)
    }, [refetch])

    const handleClearSearch = useCallback(async () => {
        setIsResetSearch(true)
        setSearchTerm("")
        await refetch()
        setIsResetSearch(false)
    }, [refetch])

    useEffect(() => {
        if (searchTerm === "" || searchTerm.length >= 3) {
            refetch()
        }
    }, [searchTerm, refetch])

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY
            const isScrollingDown = currentScroll > lastScrollPosition
            const isNearBottom = window.innerHeight + currentScroll >= document.documentElement.scrollHeight - 100

            setShowPagination(isScrollingDown || isNearBottom)
            setLastScrollPosition(currentScroll)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollPosition])

    const contactsIds = table.getFilteredSelectedRowModel().rows.map((item) => item.original.id)

    return (
        <div className="w-full overflow-auto">
            <div className="flex items-center justify-between w-full mb-4">
                <div className="flex gap-2 ">
                    <h1 className="font-bold text-nowrap border text-center flex items-center px-2 rounded-md">Total : {total}</h1>
                    <div className="relative w-full">
                        <Input
                            placeholder={searchPlaceholder ?? "Recherche par nom ou email"}
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            className="pr-8 pl-8 min-w-[300px]"
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    handleApplySearch()
                                }
                            }}
                        />
                        <div>
                            <Button
                                variant="ghost"
                                size={'icon'}
                                onClick={() => handleApplySearch()}
                                className="absolute left-1 h-7 w-7 top-1 text-muted-foreground"
                            >
                                {isApplyingSearch ? <Loader2 className="animate-spin" /> :
                                    <MyTooltipProvider trigger={<Search size={15} />} content={'Lancer la récherche'} />
                                }
                            </Button>
                            {
                                searchTerm ?
                                    <Button
                                        variant="ghost"
                                        size={'icon'}
                                        onClick={handleClearSearch}
                                        className="absolute right-1 h-7 w-7 top-1 text-muted-foreground"
                                    >
                                        {isResetSearch ? <Loader2 className="animate-spin" /> :
                                            <X />
                                        }
                                    </Button> : null
                            }
                        </div>
                    </div>
                </div>

                <div>
                {
                        contactsIds.length > 0 ?
                            <BtnDeleteContact setRowSelection={() => table.setRowSelection({})} contactIdsSelected={contactsIds} /> : null
                    }
                </div>

            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow className="bg-muted" key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="uppercase">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {
                            isLoading ? (
                                <SkeletonRows numRows={25} numCols={columns.length} />
                            ) :
                                table.getRowModel().rows.length ? (
                                    table.getRowModel().rows.map((row) => {

                                        return (
                                            <TableRow
                                                key={row.id}
                                                data-state={row.getIsSelected() && "selected"}
                                                className={` text-sm hover:bg-muted`}
                                            >
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        )
                                    })
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24">
                                            <div className="flex items-center justify-center h-full">
                                                <span>Pas de résultats.</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                    </TableBody>
                </Table>
            </div>

            {totalPages > 1 && (
                <div
                    className={cn(
                        "fixed bottom-0 z-20 bg-background transition-all duration-300 ease-in-out w-full",
                        showPagination
                            ? "translate-y-0 opacity-100"
                            : "translate-y-full opacity-0"
                    )}
                >
                    <div className="flex w-full py-1 justify-between items-center gap-4">
                        <div className="text-sm text-muted-foreground ">
                            {table.getFilteredSelectedRowModel().rows.length} sur{" "}
                            {table.getFilteredRowModel().rows.length} ligne(s) selectionné.
                        </div>


                    </div>
                </div>
            )}

        </div>
    )
}