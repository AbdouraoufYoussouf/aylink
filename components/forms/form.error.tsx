"use client"
import { FaExclamationTriangle } from "react-icons/fa";
import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";

interface FormErrorProps {
  message?: string
  setMessage: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const FormError = ({ message, setMessage }: FormErrorProps) => {
  
  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        setMessage("");
      }, 10000);
      return () => clearTimeout(timeoutId);
    }
  }, [message, setMessage]);
  
  if (!message) return null;
  
  return (
    <div className="relative bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <FaExclamationTriangle className="w-4 h-4" />
      {message}
      <div className="absolute right-0 -top-1 p-1">
        <Button className="h-5 w-5" onClick={()=>setMessage('')} variant={"outline"} size={'icon'}>
        <X />
        </Button>
      </div>
    </div>
  );
}