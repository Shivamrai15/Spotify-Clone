"use client";

import PlayButton from "@/components/PlayButton";
import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";

const SongItem = ({data, onClick}) => {

    const imagePath = useLoadImage(data);

    return (
        <div
            onClick={()=>onClick(data.id)}
            className="
                relative
                group
                flex
                flex-col
                justify-center
                items-center
                rounded-md
                overflow-hidden
                gap-x-4
                bg-neutral-400/5
                md:cursor-pointer
                hover:bg-neutral-400/10
                transition
                p-3
            "
        >   
            <div
                className="
                    relative
                    aspect-square
                    w-full
                    h-full
                    rounded-md
                    overflow-hidden
                "
            >
                <Image 
                    className="object-cover"
                    src={imagePath}
                    fill
                    alt="Image"
                />

                <div
                    className="absolute bottom-2 right-2"
                >
                    <PlayButton/>
                </div>

            </div>
            <div
                className="flex flex-col items-start w-full pt-4 gap-y-1"
            >
                <p className="font-semibold truncate w-full">
                    {data.title}
                </p>
                <p className="truncate w-full text-sm text-neutral-400 pb-4">
                    By {data.author}
                </p>
            </div>
        </div>
    )
}

export default SongItem;