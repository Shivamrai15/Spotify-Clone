import { create } from "zustand";

const useColor = create((set)=>({
    defaultColor : "#262626",
    setColor : (color) => set({defaultColor : color}),
}));

export default useColor;