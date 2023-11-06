"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";

const Library = ({songs}) => {

    const subscribeModal = useSubscribeModal();

    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const { user, subscription} = useUser();

    const onPlay = useOnPlay(songs);

    const onClick = () => {
        if(!user){
            return authModal.onOpen();
        }

        if(!subscription){
            return subscribeModal.onOpen();
        }

        return uploadModal.onOpen();
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 p-4 bg-neutral-900">
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist className="text-neutral-400" size={26}/>
                    <p 
                        className="text-neutral-400 font-bold text-base"
                    >
                        Your Library
                    </p>
                </div>
                <AiOutlinePlus
                    onClick={onClick}
                    size={20}
                    className="text-neutral-400 md:cursor-pointer hover:text-white transition"
                />
            </div>
            <div 
                className="flex flex-col gap-y-2 mt-4 px-3"
            >
                {songs.map((item)=>(
                    <MediaItem
                        onClick={(id)=>onPlay(id)}
                        key = {item.id}
                        data = {item}
                    />
                ))}
            </div>
        </div>
    )
}

export default Library;