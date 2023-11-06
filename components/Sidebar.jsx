"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { GoHome, GoHomeFill } from "react-icons/go";
import { RiSearchFill, RiSearchLine } from "react-icons/ri";

import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";

const Sidebar = ({children, songs}) => {

    const pathname = usePathname();
    const player = usePlayer();

    const routes = useMemo(()=>[
        {
            label : "Home",
            active : pathname !== "/search",
            href : "/",
            icon : pathname !== "/search" ? <GoHomeFill size={26}/> : <GoHome size={26}/>
        },

        {
            label : "Search",
            active : pathname === "/search",
            href : "/search",
            icon : pathname === "/search" ? <RiSearchFill size={26}/> : <RiSearchLine size={26}/>
        }
    ], [pathname])

    return (
        <div className={twMerge(`
            flex h-full
        `, 
            player.activeId && "h-[calc(100%-80px)]"
        )}>
            <div 
                className="hidden md:flex flex-col gap-y-2 bg-black h-full w-80 p-2"
            >
                <Box
                    className="flex flex-col gap-y-4 px-5 py-4"
                >
                    {routes.map((item)=>(
                        <SidebarItem
                            key = {item.label}
                            {...item}
                        />
                    ))}
                </Box>
                <Box
                    className="overflow-y-auto h-full"
                >
                    <Library
                        songs = {songs}
                    />
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}    
            </main>
        </div>
    )
}

export default Sidebar;