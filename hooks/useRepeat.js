import { create } from "zustand";

export const useRepeat = create((set)=>({
    repeat : Boolean(localStorage.getItem("spotify-player-loop")) || false,
    setRepeat : (value)=>{
        set({repeat : value});
        localStorage.setItem("spotify-player-loop", `${value}`);
    }
}));