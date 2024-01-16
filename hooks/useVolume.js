import { create } from "zustand";

export const useVolume = create((set)=>({
    volume : Number(localStorage.getItem("spotify-player-volume")) || 1,
    setVolume : (volume)=>{
        set({volume});
        localStorage.setItem("spotify-player-volume", `${volume}`);
    }
}));