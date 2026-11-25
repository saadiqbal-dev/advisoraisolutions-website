import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium tracking-wide transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#E8C97A]",
  {
    variants: {
      variant: {
        gold: "bg-[#C5A55A] text-[#060D1A] hover:bg-[#E8C97A] min-h-11 px-5",
        ghost: "border border-[rgba(197,165,90,0.35)] bg-transparent text-[#EDEBE6] hover:border-[#C5A55A] min-h-11 px-5",
        quiet: "text-[#C5A55A] hover:text-[#E8C97A] min-h-11 px-0",
      },
    },
    defaultVariants: { variant: "gold" },
  },
);

function Button({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant }), className)} {...props} />;
}

export { Button, buttonVariants };
