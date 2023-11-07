"use client";

import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { IoIosArrowDown } from "react-icons/io"
import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import { FaBackwardStep, FaForwardStep } from "react-icons/fa6";
import LikeButton from "./LikeButton";
import ProgressSlider from "./ProgressSlider";
import PlayerItem from "./PlayerItem";

const SmallDevicesPlayer = ({
    song,
    onPlayNext,
    Icon,
    handlePlay,
    onPlayPrevious,
    states,
    handleSeekChange,
    format
}) => {

    const [bgColor, setBgColor]= useState(song.color)

    useEffect(()=>{
        setBgColor(song.color);
    }, [song.color]);

    const imageUrl = useLoadImage(song);

    const [isOpen, setIsOpen] = useState(false);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='md:hidden'>
            <div className="h-full grid grid-cols-2 w-full"
                onClick={handleButtonClick}
            >
                <div className="flex w-full justify-start">
                    <div className = "flex items-center gap-x-2">
                        <PlayerItem
                            data={song}
                        />
                        <div className="z-10 md:z-0"
                            onClick={(e)=>{e.stopPropagation()}}
                        >
                            <LikeButton
                                songId={song.id}
                            />
                        </div>
                    </div>
                </div>
                <div className = "flex md:hidden col-auto justify-end items-center px-2">
                <div
                    onClick={(e)=>{e.stopPropagation(); handlePlay()}}
                    className = "h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 mr-3"
                >
                    <Icon size={30} className = "text-black"/>
                </div>
            </div>
            </div>
            <div 
                style={ {backgroundImage : `linear-gradient(to bottom, ${bgColor}, ${bgColor}5e, #171717)`}}
                className={twMerge(
                "fixed md:hidden bottom-0 z-10 opacity-0 left-0 w-full h-0 bg-neutral-900 transition-height duration-200 overflow-hidden",
                isOpen && "h-screen opacity-100",

            )}>
                <div className="flex flex-col relative h-full w-full overflow-hidden gap-y-4">
                    <div
                        className="m-6"
                        onClick={handleButtonClick}
                    >
                        <IoIosArrowDown size={35}/>
                    </div>
                    <div className="flex justify-center items-center w-full">
                        <div className="w-80 h-80 overflow-hidden relative">
                            <Image fill src={imageUrl} alt = "Thumbnail" className="object-cover"/>
                        </div>
                    </div>
                    <div
                        className="flex flex-col justify-center items-center w-full absolute bottom-16 "
                    >
                        <div  className="flex justify-between items-center w-80">
                            <div>
                                <p className="w-72 truncate font-semibold text-white text-lg">
                                    {song.title}
                                </p>
                                <p className="w-72 truncate text-neutral-400">
                                    {song.author}
                                </p>
                            </div>
                            <LikeButton
                                songId={song.id}
                            />
                        </div>

                        <div className="flex flex-col items-center justify-center w-full">
                            <div className="flex justify-center items-center w-80 mt-8">
                                <ProgressSlider
                                    value={states.played}
                                    onChange={(value)=>handleSeekChange(value)}
                                />
                            </div>
                            <div className="w-80 flex justify-between items-center mt-4">
                                <p className="text-xs text-neutral-300">{format(states.playedSeconds)}</p>
                                <p className="text-xs text-neutral-300">{format(states.duration)}</p>
                            </div>
                            <div className="flex justify-center items-center w-full gap-x-6 mt-10">
                                <FaBackwardStep
                                    onClick = {onPlayPrevious}
                                    size={35}
                                    className = "text-neutral-400 hover:text-white transition"
                                />
                                <div
                                    onClick = {handlePlay}
                                    className = "flex bg-white items-center justify-center h-16 w-16 p-1 rounded-full"
                                >
                                    <Icon size = {45} className = "text-black" />
                                </div>
                                <FaForwardStep
                                    onClick = {onPlayNext}
                                    size={35}
                                    className = "text-neutral-400 hover:text-white transition"
                                />
                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SmallDevicesPlayer