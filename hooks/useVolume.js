import { create } from "zustand";

export const useVolume = create((set)=>({
    volume : 1,
    setVolume : (volume)=>set({volume})
}));