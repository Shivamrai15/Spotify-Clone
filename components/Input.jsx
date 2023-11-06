import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";


const Input = forwardRef(({
    className,
    type,
    disabled,
    ...props
}, ref)=>{
    return (
        <input 
            type={type}
            className={twMerge(
                "flex w-full rounded-md bg-neutral-700 border-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none",
                className
            )}
            disabled = {disabled}
            ref={ref}
            {...props}
        />
    )
});

Input.displayName = "Input";

export default Input;