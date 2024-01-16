"use client";

import LikeButton from "./LikeButton";
import PlayerItem from "./PlayerItem";

import { BsPauseFill, BsPlayFill } from "react-icons/bs"
import { FaBackwardStep, FaForwardStep } from "react-icons/fa6";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2"
import { PiRepeatBold, PiRepeatOnceBold } from 'react-icons/pi';
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import useColor from "@/hooks/useColor";
import ProgressSlider from "./ProgressSlider";
import { twMerge } from "tailwind-merge";
import SmallDevicesPlayer from "./SmallDevicesPlayer";
import { useVolume } from "@/hooks/useVolume";
import { useRepeat } from "@/hooks/useRepeat";


const format = (seconds) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = pad(date.getUTCSeconds());
    if (hh) {
      return `${hh}:${pad(mm)}:${ss}`;
    }
    return `${mm}:${ss}`;
  };
  
const pad = (string) => (`0${string}`).slice(-2);


const PlayerContent = ({song, songUrl}) => {

    const player = usePlayer();
    const color = useColor();

    const {volume, setVolume} = useVolume();
    const [isPlaying, setIsPlaying] = useState(false);
    const [mute, setMute] = useState(false);
    const {repeat, setRepeat} = useRepeat();
    const playerRef = useRef(null);

    const [ states, setState] = useState({
        duration : 0,
        playedSeconds: 0,
        played : 0
    });

    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = mute ? HiSpeakerXMark : HiSpeakerWave;
    const RepeatIcon = repeat ? PiRepeatOnceBold : PiRepeatBold

    const onPlayPrevious = () => {
        if(player.ids.length === 0){
            return;
        }

        const currentIndex = player.ids.findIndex((id)=> id === player.activeId);
        const previousSong = player.ids[currentIndex-1];

        if(!previousSong){
            return player.setId(player.ids[player.ids.length-1]);
        }

        player.setId(previousSong);
    }

    const onPlayNext = () => {
        if(player.ids.length === 0){
            return;
        }

        const currentIndex = player.ids.findIndex((id)=> id === player.activeId);
        const nextSong = player.ids[currentIndex+1];

        if(!nextSong){
            return player.setId(player.ids[0]);
        }

        player.setId(nextSong);
    }

    
    useEffect(()=>{
        setIsPlaying(true);
        color.setColor(song.color);
    }, [songUrl]);

    const handlePlay = ()=>{
        setIsPlaying(!isPlaying);
    }

    const handleProgress = (stateIn) => {
        if (!states.seeking) {
          setState({ ...states, ...stateIn });
        }
    };

    const handleDuration = (duration) => {
        setState({ ...states, duration });
    };

    const handleSeekChange = (e) => {
        const newPlayed = parseFloat(e);
        setState({ ...states, played: newPlayed });
        playerRef.current.seekTo(newPlayed); 
    };

    const toogelMute = () => {
       setMute(!mute);
    }

    return (
        <>
        <SmallDevicesPlayer
            song = {song}
            onPlayNext = {onPlayNext}
            Icon = {Icon}
            handlePlay = {handlePlay}
            onPlayPrevious = {onPlayPrevious}
            states = {states}
            handleSeekChange = {handleSeekChange}
            format = {format}
        />
        <div
            className = "hidden md:grid md:grid-cols-3 h-full"
        >
            <div className="flex w-full justify-start">
                <div className = "flex items-center gap-x-2">
                    <PlayerItem
                        data={song}
                    />
                    <div className="z-10 md:z-0">
                        <LikeButton
                            songId={song.id}
                        />
                    </div>
                </div>
            </div>
            <div className="h-full flex flex-col justify-center items-center w-full max-w-[722px] gap-y-2">
                <div
                    className= "h-full flex justify-center items-center w-full max-w-[722px] gap-x-6"
                >
                    <FaBackwardStep
                        onClick = {onPlayPrevious}
                        size={18}
                        className = "text-neutral-400 cursor-pointer hover:text-white transition"
                    />
                    <div
                        onClick = {handlePlay}
                        className = "flex bg-white items-center justify-center h-8 w-8 p-1 rounded-full cursor-pointer"
                    >
                        <Icon size = {28} className = "text-black" />
                    </div>
                    <FaForwardStep
                        onClick = {onPlayNext}
                        size={18}
                        className = "text-neutral-400 cursor-pointer hover:text-white transition"
                    />
                </div>
                <div className="h-full flex justify-center items-center w-full max-w-[722px] gap-x-4">
                    <p className="text-xs text-neutral-300">{format(states.playedSeconds)}</p>
                    <ProgressSlider
                        value={states.played}
                        onChange={(value)=>handleSeekChange(value)}
                    />
                    <div className="hidden">
                        <ReactPlayer
                            
                            ref={playerRef}
                            autoPlay={true}
                            playing={isPlaying}
                            controls={true}
                            loop = {repeat}
   Repeat                   onDuration={handleDuration}
                            onProgress={handleProgress}
                            volume={volume}
                            onEnded={()=>{
                                setIsPlaying(false);
                                onPlayNext();
                            }}  
                            url={songUrl}
                            muted = {mute}
                        />
                    </div>
                    <p className="text-xs text-neutral-300">{format(states.duration)}</p>
                </div>
            </div>
            <div
                className = "flex w-full justify-end pr-4"
            >
                <div className = "flex items-center gap-x-2 w-[150px]">
                    <RepeatIcon 
                        onClick={()=>setRepeat(!repeat)}
  Repeat                size= {35} 
                        className={twMerge("text-neutral-400 mr-3 cursor-pointer",
                                    repeat && "Repeatreen-500"
                                )}
                    />
                    <VolumeIcon
                        onClick = {toogelMute}
                        className = "cursor-pointer"
                        size={22}
                    />
                    <Slider
                        value={volume}
                        onChange={(value)=>setVolume(value)}
                    />
                </div>
            </div>
        </div>
        </>
    )
}

export default PlayerContent;