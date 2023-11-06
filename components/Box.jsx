import { twMerge } from "tailwind-merge";


const Box = ({children, className}) => {
    return (
        <div
            className={twMerge(
                "bg-neutral-900 rounded-lg w-full",
                className
            )}
        >
            {children}
        </div>
    )
}

export default Box;