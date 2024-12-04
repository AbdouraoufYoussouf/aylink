'use client'

import { forwardRef, useEffect, useRef } from "react";
import { Textarea } from "./ui/textarea";

export const AutoResizeTextarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    (props, ref) => {
        const textareaRef = useRef<HTMLTextAreaElement | null>(null);

        useEffect(() => {
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            }
        }, [props.value]);

        return (
            <Textarea
                {...props}
                ref={(element) => {
                    textareaRef.current = element;
                    if (typeof ref === 'function') {
                        ref(element);
                    } else if (ref) {
                        ref.current = element;
                    }
                }}
                onChange={(e) => {
                    if (props.onChange) {
                        props.onChange(e);
                    }
                    if (textareaRef.current) {
                        textareaRef.current.style.height = 'auto';
                        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
                    }
                }}
            />
        );
    }
);

AutoResizeTextarea.displayName = 'AutoResizeTextarea';