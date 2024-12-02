import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface FormSuccessProps {
    message?: string,
    setMessage: React.Dispatch<React.SetStateAction<string>>
}

export const FormSuccess = ({ message, setMessage }: FormSuccessProps) => {
    useEffect(() => {
        if (message) {
            const timeoutId = setTimeout(() => {
                setMessage("");
            }, 10000);
            return () => clearTimeout(timeoutId);
        }
    }, [message, setMessage]);

    if (!message) return null;
    if (!message) return null;
    return (
        <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
            <FaCheckCircle className="w-4 h-4" />
            {message}
            <div className="absolute h-5 w-5 right-0 -top-1 p-1">
                <Button onClick={() => setMessage('')} variant={"outline"} size={'icon'}>
                    <X />
                </Button>
            </div>
        </div>
    )
}