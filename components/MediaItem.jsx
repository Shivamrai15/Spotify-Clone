"use client";

import useLoadImage from "@/hooks/useLoadImage";
import usePlayer from "@/hooks/usePlayer";
import Image from "next/image";

const MediaItem = ({data, onClick}) => {

    const player = usePlayer()
    const imageUrl = useLoadImage(data);

    const handleClick = ()=>{
        if(onClick) { 
            return onClick(data.id)
        }
        return player.setId(data.id)
    }

    return (
        <div
            onClick={handleClick}
            className="
                flex
                items-center
                gap-x-3
                cursor-pointer
                hover:bg-neutral-800/50
                w-56
                sm:w-80
                md:w-full
                p-2
                flex-1
            "
        >
            <div
                className="rounded-md relative min-h-[48px] min-w-[48px] overflow-hidden"
            >
                <Image 
                    fill
                    src={imageUrl}
                    alt="Library Item"
                    className="object-cover"
                />
            </div>
            <div
                className="flex flex-col gap-y-1 overflow-hidden"
            >
                <p className="text-white font-semibold truncate">
                    {data.title}
                </p>
                <p className="text-neutral-400 text-sm truncate">
                    {data.author}
                </p>
            </div>
        </div>
    )
}

export default MediaItem;