import { useSessionContext } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {useMemo} from 'react';

const useGetSongById = (id)=>{
    const [isLoading, setIsLoading] = useState(false);
    const [song, setSong] = useState(null);
    const {supabaseClient} = useSessionContext();

    useEffect(()=>{
        if(!id){
            return;
        }

        setIsLoading(true);
        const fetchSong = async()=>{
            const { data, error } = await supabaseClient.from('songs').select('*').eq('id', id).single();
            if(error){
                setIsLoading(false);
                return toast.error(error.message);
            }

            setSong(data);
            setIsLoading(false);
        }

        fetchSong();

    }, [id, supabaseClient]);

    return useMemo(()=>({
        isLoading,
        song
    }), [isLoading, song]);
}

export default useGetSongById;