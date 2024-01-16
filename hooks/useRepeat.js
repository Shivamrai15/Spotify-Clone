import { create } from "zustand";

export const useRepeat = create((set)=>({
    repeat : false,
    setRepeat : (value)=>set({repeat : value})
}));