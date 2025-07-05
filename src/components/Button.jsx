import { cn } from "../utils/cn";

export default function Button({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    size = 'md',
    iconLeft,
    iconRight,
    className = '',
    ...props
}) {
    const basesStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all - focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer px-4 py-2';

    const variants = {
        primary: "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
        danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={cn(basesStyles, variants[variant], size[size], className)}
            {...props}
        >
            {iconLeft && <span className="mr-2">{iconLeft}</span>}
            {children}
            {iconRight && <span className="ml-2">{iconRight}</span>}
        </button>
    )
}