"use client"
import React from 'react'
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
    SidebarProvider,
    SidebarTrigger,
    useSidebar
} from "@/components/ui/sidebar"
import { HeaderDashboard } from './header-dashboard'
import { cn } from "@/lib/utils"

const DashboardContent = ({ children }: { children: React.ReactNode }) => {
    const { open } = useSidebar()

    return (
        <div className='w-full'>
            <header className={cn(
                "flex  bg-background fixed z-50 md:left-[3rem]  border-b justify-between h-16 items-center gap-2 transition-all duration-300 ease-in-out",
                open ? "md:left-[16rem] left-0 right-0" : "left-0 right-0"
            )}>
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                </div>
                <HeaderDashboard />
            </header>
            <main className={cn(
                "mt-12 pt-4 md:p-4 transition-all duration-300 ease-in-out",
            )}>
                {children}
            </main>
        </div>
    )
}

export const SidebarDashboard = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <div className="flex w-full">
                <AppSidebar />
                <DashboardContent>{children}</DashboardContent>
            </div>
        </SidebarProvider>
    )
}

