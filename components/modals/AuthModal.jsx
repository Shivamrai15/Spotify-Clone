"use client";

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";

import Modal from "./Modal";

const AuthModal = () => {

    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const session = useSessionContext();

    const { onClose, isOpen } = useAuthModal();

    const onChange = (open) => {
        if(!open){
            onClose();
        }
    }

    useEffect(()=>{
        if(session){
            router.refresh();
            onClose();
        }
    }, [session, router]);

    return (
        <Modal
            title="Welcome Back"
            description="Login to your account"
            isOpen = {isOpen}
            onChange={onChange}
        >
            <Auth 
                theme="dark"
                providers={["google"]}
                magicLink
                supabaseClient={supabaseClient}
                appearance={{
                    theme : ThemeSupa,
                    variables : {
                        default : {
                            colors : {
                                brand : "#404040",
                                brandAccent : "#22c55e",
                            }
                        }
                    }
                }}
            />
        </Modal>
    )
}

export default AuthModal