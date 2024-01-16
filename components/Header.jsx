"use client";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { GoHomeFill } from "react-icons/go";
import { RiSearchLine } from "react-icons/ri";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from 'sonner';
import { FaUserAlt } from "react-icons/fa";
import { useUser } from "@/hooks/useUser";
import usePlayer from "@/hooks/usePlayer";

import Button from "./Button";
import { useEffect, useState } from "react";


const Header = ({children, className, color}) => {

    const player = usePlayer();
    const router = useRouter();
    const authModal = useAuthModal();

    const supabaseClient = useSupabaseClient();
    const { user } = useUser()

    const handleLogOut = async()=>{
        const {error} = await supabaseClient.auth.signOut();
        player.reset();
        router.refresh();
        if(error){
            console.error(error);
            toast.error("Something went wrong");
        }else{
            toast.success("Logged Out")
        }
    } 

    const [bgColor, setBgColor]= useState(color)

    useEffect(()=>{
        setBgColor(color);
    }, [color]);

    return (
        <div
            style={color && {
                background: `linear-gradient(to bottom, ${bgColor}, ${bgColor}5e, #171717)`,
                transitionProperty: "all",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                transitionDuration: "650ms"
            }}
            className={twMerge(
                "h-fit bg-gradient-to-b from-[#262626] p-6",
                className,
            )}
        >
            <div className="w-full mb-4 flex items-center justify-between">
                <div className="hidden md:flex gap-x-2 items-center">
                    <button
                        onClick={()=> router.back()}
                        className="rounded-full bg-opacity-50 bg-black flex items-center justify-center cursor-default md:cursor-pointer hover:opacity-75 transition"
                    >
                        <RxCaretLeft className="text-white" size={35}/>
                    </button>
                    <button
                        onClick={()=> router.forward()}
                        className="rounded-full bg-opacity-50 bg-black flex items-center justify-center cursor-default md:cursor-pointer hover:opacity-75 transition"
                    >
                        <RxCaretRight className="text-white" size={35}/>
                    </button>
                </div>
                <div 
                    className="flex md:hidden gap-x-2 items-center"
                >
                    <button
                        onClick={()=>router.push("/")}
                        className="rounded-full p-2 bg-white flex items-center justify-center cursor-default"
                    >
                        <GoHomeFill className="text-black" size={25}/>
                    </button>
                    <button
                        onClick={()=>router.push("/search")}
                        className="rounded-full p-2 bg-white flex items-center justify-center cursor-default"
                    >
                        <RiSearchLine className="text-black" size={25}/>
                    </button>
                </div>
                <div className="flex justify-between items-center gap-x-4">
                    { user ? (
                        <div className="flex gap-x-4 items-center">
                            <Button
                                onClick = {handleLogOut}
                                className = "bg-white text-black opacity-100 hover:opacity-80 px-6 py-2"
                            >
                                Logout
                            </Button>
                            <Button
                                onClick = {()=> router.push("/account")}
                                className = "bg-black text-white"
                            >
                                <FaUserAlt size={15}/>
                            </Button>
                        </div>
                    ) : (
                    <>
                        <div>
                            <Button
                                onClick = { authModal.onOpen }
                                className = "text-white"
                            >
                                Sign up
                            </Button>
                        </div>
                        <div>
                            <Button
                                onClick = { authModal.onOpen }
                                className = "bg-white text-black opacity-100 hover:opacity-80 px-6 py-3"
                            >
                                Log in
                            </Button>
                        </div>
                    </>
                    )}
                </div>
            </div>
            {children}
        </div>
    )
}

export default Header;