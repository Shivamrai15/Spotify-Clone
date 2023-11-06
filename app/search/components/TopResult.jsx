"use client";

import LikeButton from "@/components/LikeButton";
import PlayButton from "@/components/PlayButton";
import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";

const TopResult = ({data, onClick}) => {

    const imageUrl = useLoadImage(data);

    const handleClick = ()=>{
        if(onClick) { 
            return onClick(data.id)
        }
    }

    return (
        <div 
            onClick={handleClick}
            className="bg-neutral-400/5
                        hover:bg-neutral-400/10
                        w-full
                        h-full
                        rounded-lg
                        flex
                        flex-col
                        gap-y-6
                        cursor-pointer
                        p-4
                        relative
                        group
                        "
        >
            <div
                className="w-32 h-32 relative rounded-md overflow-hidden"
            >
                <Image
                    src={imageUrl}
                    fill
                    alt = "Image"
                    className="object-cover"
                />
            </div>
            <div
                className="flex flex-col gap-y-1 overflow-hidden"
            >
                <p className="text-white text-2xl font-bold truncate">
                    {data.title}
                </p>
                <p className="text-neutral-400 text truncate">
                    {data.author}
                </p>
            </div>
            <div
                className="absolute flex gap-x-3 items-center bottom-3 right-5"
            >   
                <LikeButton
                    songId={data.id}
                />
                <PlayButton/>
            </div>
        </div>
    )
}

export default TopResult;