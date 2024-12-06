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
import { Pagination, PaginationContent, PaginationEllipsis, PaginationLink, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { getPageRange } from "@/lib/pagination"

interface DataTableProps {
    columns: ColumnDef<ContactType, unknown>[]
    searchPlaceholder?: string
}

export function ContactDataTable({
    columns,
    searchPlaceholder,
}: DataTableProps) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [searchTerm, setSearchTerm] = useState("")
    const { session } = useSessionStatus()
    const [isApplyingSearch, setIsApplyingSearch] = useState(false)
    const [isResetSearch, setIsResetSearch] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [isChangingPage, setIsChangingPage] = useState(false)

    const [showPagination, setShowPagination] = useState(true)
    const [lastScrollPosition, setLastScrollPosition] = useState(0)

    const [total, setTotal] = useState(0)

    const { isLoading, data, refetch } = useQuery({
        queryKey: ['contacts', currentPage, searchTerm],
        queryFn: async () => {
            const res = await getAllContactFilterAction({
                search: searchTerm,
                pseudo: session?.user.pseudo,
                pageSize: 50,
                page: currentPage + 1,
            });
            if (res.success === true) {
                setTotal(res.total);
                return {
                    data: res.data as ContactType[],
                    total: res.total,
                    currentPage: res.currentPage - 1,
                    totalPages: res.totalPages,
                };
            }
            return { data: [] as ContactType[], total: 0, currentPage: 0, totalPages: 0 };
        },
        enabled: !!session?.user.pseudo,
        staleTime: 5000,
    });

    const table = useReactTable({
        data: data?.data ?? [],
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: { sorting },
        pageCount: data?.totalPages ?? 0,
        manualPagination: true,
    })

    const totalPages = data?.totalPages ?? 0

    const handleApplySearch = useCallback(async () => {
        setIsApplyingSearch(true)
        setCurrentPage(0)
        await refetch()
        setIsApplyingSearch(false)
    }, [refetch])

    const handleClearSearch = useCallback(async () => {
        setIsResetSearch(true)
        setSearchTerm("")
        setCurrentPage(0)
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

    const handlePageChange = useCallback(async (newPage: number) => {
        setIsChangingPage(true)
        setCurrentPage(newPage)
        await refetch()
        setIsChangingPage(false)
    }, [refetch])

    const contactsIds = table.getFilteredSelectedRowModel().rows.map((row) => (row.original as ContactType).id)

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
                                    <MyTooltipProvider content={'Lancer la récherche'} >
                                        <Search size={15} />
                                    </MyTooltipProvider>
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
                    <BtnDeleteContact disabled={contactsIds.length <= 0} setRowSelection={() => table.setRowSelection({})} contactIdsSelected={contactsIds} /> 
                </div>
            </div>

            <div className="rounded-md mb-8 border">
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
                            isLoading || isChangingPage ? (
                                <SkeletonRows numRows={25} numCols={columns.length} />
                            ) :
                                table.getRowModel().rows.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                            className={`text-sm hover:bg-muted`}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-20">
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
                        <div className="text-sm sm:text-nowrap text-muted-foreground ">
                            {table.getFilteredSelectedRowModel().rows.length} sur{" "}
                            {table.getFilteredRowModel().rows.length} ligne(s) selectionné.
                        </div>

                        <Pagination className="">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
                                        className={currentPage === 0 ? "pointer-events-none opacity-50" : ""}
                                    />
                                </PaginationItem>
                                {getPageRange(currentPage, totalPages).map((page, index) => (
                                    <PaginationItem key={index}>
                                        {page === 'ellipsis' ? (
                                            <PaginationEllipsis />
                                        ) : (
                                            <PaginationLink
                                                onClick={() => handlePageChange(page)}
                                                isActive={currentPage === page}
                                            >
                                                {page + 1}
                                            </PaginationLink>
                                        )}
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() =>
                                            handlePageChange(Math.min(totalPages - 1, currentPage + 1))
                                        }
                                        className={cn(
                                            currentPage === totalPages - 1 || (data?.data?.length ?? 0) < 50
                                                ? "pointer-events-none opacity-50"
                                                : "cursor-pointer"
                                        )}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            )}
        </div>
    )
}

