"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSong from "@/hooks/useLoadSong";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

const Player = () => {

    const player = usePlayer();
    const {song} = useGetSongById(player.activeId);
    const songUrl = useLoadSong(song);

    if(!song || !songUrl ||!player.activeId){
        return null;
    }

    return (
        <div 
            className = "bg-black fixed bottom-0 w-full py-2 h-[80px]"
        >
            <PlayerContent 
                key = {songUrl}
                song = {song}
                songUrl = {songUrl}
            />
        </div>
    )
}

export default Player;