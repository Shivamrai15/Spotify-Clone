"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {toast} from "sonner";

const LikeButton = ({songId}) => {

    const router = useRouter();
    const {supabaseClient} = useSessionContext();
    const authModal = useAuthModal();
    const {user} = useUser();
    const [liked, setLiked] = useState(false);

    useEffect(()=>{
        if(!user?.id){
            return;
        }

        const fetchData = async() =>{
            const {data, error} = await supabaseClient.from("liked_songs").select('*').eq('user_id', user.id).eq('song_id', songId).single();
            if(!error && data){
                setLiked(true);
            }
        }

        fetchData();

    }, [songId, supabaseClient, user?.id]);

    const Icon = liked ? AiFillHeart : AiOutlineHeart;

    const handleLike = async()=>{
        if(!user){
            return authModal.onOpen();
        }

        if(liked){
            const {error} = await supabaseClient.from('liked_songs').delete().eq('user_id', user.id).eq('song_id', songId);
            if(error){
                toast.error(error.message);
            }else{
                setLiked(false);
                toast.success("Removed from your Liked Songs")
            }
        } else {
            const {error} = await supabaseClient.from('liked_songs').insert({
                song_id : songId,
                user_id : user.id
            });
            if(error){
                toast.error(error.message);
            }else{
                setLiked(true);
                toast.success("Added to your Liked Songs")
            }
        }

        router.refresh();
    }

    return (
        <button
            onClick={handleLike}
            className="cursor-default md:cursor-pointer hover:opacity-75 transition"
        >
            <Icon color={liked ? "#22c55e" : '#fff'} size={25}/>
        </button>
    )
}

export default LikeButton;