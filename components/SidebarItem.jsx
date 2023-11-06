import Link from "next/link";
import { twMerge } from "tailwind-merge";

const SidebarItem = ({icon, label, active, href}) => {
    return (
        <Link
            href={href}
            className={twMerge(
                "flex flex-row h-auto items-center w-full gap-x-4 text-base cursor-default font-bold md:cursor-pointer hover:text-white transition text-neutral-400 py-1",
                active && "text-white"
            )}
        >
            {icon}
            <p className="truncate w-full">{label}</p>
        </Link>
    )
}

export default SidebarItem;