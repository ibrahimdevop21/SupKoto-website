import { Button } from "@/components/ui/button";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default" | "outline" | "ghost" | "destructive";
  className?: string;
}

export default function AppButton({
  children,
  variant = "default",
  className = "",
  ...props
}: AppButtonProps) {
  return (
    <Button
      variant={variant}
      className={`rounded-xl px-5 py-2 text-sm font-medium ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}
