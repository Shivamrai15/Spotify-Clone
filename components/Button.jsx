import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Button = forwardRef(({
    className,
    children,
    disabled,
    type = "button",
    ...props
}, ref) => {
    return (
        <button
            type={type}
            className={twMerge(
                "w-full rounded-full px-3 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold opacity-75 hover:opacity-100 transition cursor-default md:cursor-pointer md:hover:scale-105 duration-200",
                className
            )}
            disabled = {disabled}
            ref={ref}
            {...props}
        >
            {children}
        </button>
    )
})

Button.displayName = "Button";

export default Button;