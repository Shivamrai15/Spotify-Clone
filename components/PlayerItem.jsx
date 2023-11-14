"use client";

import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";

const PlayerItem = ({data}) => {

    const imageUrl = useLoadImage(data);

    return (
        <div
            className="
                flex
                items-center
                gap-x-3
                w-56
                sm:w-64
                py-2
                px-3
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
                className="flex flex-col overflow-hidden"
            >
                <p className="text-white font-semibold text-sm truncate">
                    {data.title}
                </p>
                <p className="text-neutral-400 text-xs truncate">
                    {data.author}
                </p>
            </div>
        </div>
    )
}

export default PlayerItem