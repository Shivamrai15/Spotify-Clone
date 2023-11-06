import { create } from "zustand";

const useSubscribeModal = create((set)=>({
    isOpen : false,
    onOpen : () => set({isOpen : true}),
    onClose : () => set({isOpen : false})
}));

export default useSubscribeModal;