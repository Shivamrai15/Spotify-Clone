import { create } from "zustand";

const useAuthModal = create((set)=>({
    isOpen : false,
    onOpen : () => set({isOpen : true}),
    onClose : () => set({isOpen : false})
}));

export default useAuthModal;