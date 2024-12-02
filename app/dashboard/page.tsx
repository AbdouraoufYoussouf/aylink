"use client"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"




import React from 'react'

const page = () => {
    return (
        <div className="w-full h-full">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">
                            Building Your Application
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="aspect-video bg-muted-foreground rounded-xl " />
                    <div className="aspect-video bg-muted-foreground rounded-xl " />
                    <div className="aspect-video bg-muted-foreground rounded-xl " />
                </div>
                <div className="min-h-[100vh] flex-1 rounded-xl bg-red-600 md:min-h-min" />
            </div>
        </div>

    )
}

export default page