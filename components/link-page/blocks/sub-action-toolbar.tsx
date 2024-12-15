"use client"

import * as React from "react"
import { Link, Video, Package, FileText } from 'lucide-react'
import { cn } from "@/lib/utils"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SubBlocType } from "@prisma/client"
import { SubBlocTypeType } from "@/src/types/bloc-type"

interface ActionToolbarProps {
    setSubBlocType: (type: SubBlocTypeType) => void
    setIsAddSubBloc: (isAdd: boolean) => void
    className?: string
    handleAction:()=>void
}

export function SubActionToolbar({ setSubBlocType,handleAction, setIsAddSubBloc, className }: ActionToolbarProps) {
    const [isExpanded, setIsExpanded] = React.useState(false)

    const actions = [
        { icon: Link, label: "Ajouter un lien", type: SubBlocType.URL },
        { icon: Video, label: "Ajouter une vidéo", type: SubBlocType.VIDEO },
        { icon: Package, label: "Ajouter un produit", type: SubBlocType.IMAGE },
        // { icon: FileText, label: "Ajouter un document", type: SubBlocType.DOCUMENT },
    ]

    const onAction = (type: SubBlocTypeType) => {
        handleAction()
        setIsAddSubBloc(true)
        setSubBlocType(type)
    }

    return (
        <TooltipProvider>
            <div
                className={cn(
                    "relative group inline-flex items-center justify-center",
                    className
                )}
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
            >
                <div className="flex items-center transition-all duration-300 ease-in-out py-2 gap-0.5 border rounded-full px-3">
                    {actions.map((action, index) => (
                        <React.Fragment key={action.type}>
                            {index > 0 && (isExpanded || index > 2) && (
                                <Separator
                                    orientation="vertical"
                                    className="h-4 bg-muted-foreground"
                                />
                            )}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={cn(
                                            "h-8 w-8 rounded-full transition-all duration-5000 ease-in-out",
                                            "text-muted-foreground hover:text-purple-600",
                                            !isExpanded && index > 2 && "hidden"
                                        )}
                                        onClick={() => onAction(action.type)}
                                    >
                                        <action.icon className="h-4 w-4" />
                                        <span className="sr-only">{action.label}</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent
                                    side="top"
                                    className="bg-black text-white border-white/10"
                                >
                                    {action.label}
                                </TooltipContent>
                            </Tooltip>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </TooltipProvider>
    )
}