import useColor from "./useColor";

export const useSetColor = (color)=>{
   const {previousColor, setColor} = useColor();
   setColor(color, previousColor)
}

export const useResetColor = ()=>{
    const {previousColor, resetColor} = useColor();
    resetColor(previousColor);
}