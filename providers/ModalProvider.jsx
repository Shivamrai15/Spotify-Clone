"use client"

import AuthModal from "@/components/modals/AuthModal";
import SubscribeModal from "@/components/modals/SubscribeModal";
import UploadModal from "@/components/modals/UploadModal";
import { useEffect, useState } from "react";


const ModalProvider = ({products}) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    }, []);

    if(!isMounted){
        return null;
    }

    return (
        <>
            <AuthModal/>
            <UploadModal/>
            <SubscribeModal products = {products}/>
        </>
    )
}

export default ModalProvider;