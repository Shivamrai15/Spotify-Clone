"use client";

import MediaItem from "@/components/MediaItem";
import TopResult from "./TopResult";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

const SearchContent = ({songs, search}) => {
    
    const onPlay = useOnPlay(songs);
    
    if(songs.length === 0 && search){
        return (
            <div className="flex flex-col mt-10 justify-center items-center w-full p-4 text-center">
                <h1 className="text-xl text-white font-semibold">No results found</h1>
                <p className="text mt-1 text-neutral-400">Please make sure your words are spelled correctly or use fewer or different keyword.</p>
            </div>
        )
    }


    const topResult = songs[0];
    const relatedResults = songs.slice(1, 5);
    console.log(relatedResults)

    return (
        <div 
            className="flex flex-col lg:flex-row gap-y-20 gap-x-10 w-full px-6"
        >
            {topResult && (
                <div className="w-full md:w-96 h-64">
                    <h1 className="text-2xl font-bold mb-4">Top Result</h1>
                    <TopResult
                        data = {topResult}
                        onClick = {(id)=>onPlay(id)}
                    />
                </div>
            )}
            {relatedResults.length !== 0 && (
                <div className="flex flex-col gap-y-2 w-full flex-1">
                    <h1 className="text-2xl font-bold mb-4">Songs</h1>
                    {relatedResults.map((song)=>(
                        <div
                            key = {song.id} 
                            className="flex items-center gap-x-4 w-full"
                        >  
                            <div className="flex-1">
                                <MediaItem
                                    onClick={(id)=>onPlay(id)}
                                    data={song}
                                />
                            </div>
                            <LikeButton songId = {song.id} />
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}

export default SearchContent