import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";


type TooltipProps = {
    content: React.ReactNode | string,
    align?: "start" | "center" | "end",
    side?: "top" | "bottom" | "left" | "right",
    sideOffset?: number,
    delayDuration?: number,
    children: ReactNode; // Le composant enfant à encapsuler

}

export const MyTooltipProvider = ({
    children,
    content,
    align = "center",
    side = "top",
    sideOffset = 8,
    delayDuration = 200,
}: TooltipProps) => {
    return (
        <TooltipProvider delayDuration={delayDuration}>
            <Tooltip>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent
                    align={align}
                    side={side}
                    sideOffset={sideOffset}
                >
                    {content}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
