"use client"
import React from 'react'
import { AppSidebar } from "@/components/app-sidebar"

import { Separator } from "@/components/ui/separator"
import {

    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { HeaderDashboard } from './header-dashboard'

export const SidebarDashboard = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className='w-full'>

            <header className="flex  border-b justify-between h-16  items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                </div>
                <HeaderDashboard />
            </header>
            <div className='w-full mx-4'>

                {children}
            </div>
            </div>
        </SidebarProvider>
    )
}
