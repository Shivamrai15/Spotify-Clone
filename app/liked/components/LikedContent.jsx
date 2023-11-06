"use client";

import Button from "@/components/Button";
import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { MdMusicNote } from "react-icons/md"

const LikedContent = ({songs}) => {

    const router = useRouter();
    const {isLoading, user} = useUser();

    const onPlay = useOnPlay(songs);

    useEffect(()=>{
        if(!isLoading && !user){
            router.replace("/");
        }
    }, [isLoading, user, router]);


    if(songs.length === 0){
        return (
            <div
                className="flex bg-gradient-to-b from-[#1f173d] flex-col items-center gap-y-2 px-6 pt-16 text-white"
            >
                <MdMusicNote size={50} />
                <h1 className="text-2xl font-bold text-center">Songs you like will appear here</h1>
                <p className="text-lg font-semibold text-neutral-200 text-center">Save songs by tapping the heart icon</p>
                <Button
                    className = "bg-white w-fit px-6 opacity-100 mt-4"
                    onClick = {()=>router.push("/search")}
                >
                    Find songs
                </Button>
            </div>
        );
    }

    return (
        <div className="w-full p-6 bg-gradient-to-b from-[#1f173d] from-10%">
            <div className="text-neutral-400 flex items-center my-4 font-semibold">
                <span >#</span>
                <h2 className="ml-6">Title</h2>
            </div>
            <hr />
            <div className="flex flex-col gap-y-2 w-full mt-4">
                {songs.map((song, index)=>(
                    <div
                        key = {song.id}
                        className="flex items-center gap-x-4 w-full"
                    >
                        <div className="text-neutral-400">{index+1}</div>
                        <div className="flex-1">
                            <MediaItem
                                onClick={(id)=>onPlay(id)}
                                data = {song}
                            />
                        </div>
                        <LikeButton
                            songId={song.id}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LikedContent;