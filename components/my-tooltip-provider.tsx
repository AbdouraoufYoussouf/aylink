import React, { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

// Typage des props
interface MyTooltipProviderProps {
    content: string; // Le texte affiché dans le tooltip
    children: ReactNode; // Le composant enfant à encapsuler
}

// Composant réutilisable
export const MyTooltipProvider: React.FC<MyTooltipProviderProps> = ({ content, children }) => (

    <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
            <p>{content}</p>
        </TooltipContent>
    </Tooltip>
);
