import { create } from "zustand";

const useMobilePlayer = create((set)=>({
    isOpen : false,
    onOpen : () => set({isOpen : true}),
    onClose : ()=>set({isOpen : false})
}));

export default useMobilePlayer;