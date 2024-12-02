import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";


type TooltipProps = {
    trigger: React.ReactNode,
    content: React.ReactNode | string,
    align?: "start" | "center" | "end",
    side?: "top" | "bottom" | "left" | "right",
    sideOffset?: number,
    delayDuration?: number,
}

export const MyTooltipProvider = ({
    trigger,
    content,
    align = "center",
    side = "top",
    sideOffset = 8,
    delayDuration = 200,
}: TooltipProps) => {
    return (
        <TooltipProvider delayDuration={delayDuration}>
            <Tooltip>
                <TooltipTrigger asChild>
                    {trigger}
                </TooltipTrigger>
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
