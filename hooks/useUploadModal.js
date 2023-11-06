import { create } from "zustand";

const useUploadModal = create((set)=>({
    isOpen : false,
    onOpen : () => set({isOpen : true}),
    onClose : () => set({isOpen : false})
}));

export default useUploadModal;