import { cva } from "class-variance-authority";
import { cn } from "../utils/cn";
import { forwardRef } from "react";

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none cursor-pointer disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-slate-900 text-white hover:bg-slate-900/90',
                danger: 'bg-red-600 text-white hover:bg-red-600/90',
                'danger-outline': 'border border-red-500 bg-transparent text-red-500 hover:bg-red-500/10',
                'black-outline': 'bg-transparent text-gray-900 border border-gray-900 hover:bg-gray-900/10',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8 text-base',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

const Button = forwardRef(({ className, variant, size, iconLeft, iconRight, children, ...props }, ref) => {
    return (
        <button
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        >
            {iconLeft && <span className="mr-2">{iconLeft}</span>}
            {children}
            {iconRight && <span className="ml-2">{iconRight}</span>}
        </button>
    );
});

Button.displayName = "Button"

export default Button;