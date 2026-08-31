"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ebo-green dark:focus-visible:ring-ebo-lime focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-ebo-green text-white hover:bg-ebo-green-dark hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ebo-green/25 dark:bg-ebo-lime dark:text-gray-900 dark:hover:bg-ebo-lime-soft dark:hover:shadow-ebo-lime/20",
        outline: "border-2 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-ebo-green dark:hover:border-ebo-lime hover:text-ebo-green dark:hover:text-ebo-lime hover:-translate-y-0.5",
        ghost: "text-gray-600 dark:text-gray-400 hover:text-ebo-green dark:hover:text-ebo-lime hover:bg-ebo-green/5 dark:hover:bg-ebo-lime/5",
        whatsapp: "bg-[#25D366] text-white hover:bg-[#128C7E] hover:-translate-y-0.5 hover:shadow-lg",
      },
      size: {
        default: "px-7 py-3.5",
        sm: "px-4 py-2 text-xs",
        lg: "px-8 py-4 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
