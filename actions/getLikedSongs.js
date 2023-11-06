import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getLikedSongs = async() => {
    const supabase = createServerComponentClient({
        cookies
    });

    const {
        data : {
            session
        }
    } = await supabase.auth.getSession();

    const { data, error } = await supabase
                            .from('liked_songs')
                            .select('*, songs(*)')
                            .eq('user_id', session?.user?.id)
                            .order("created_at", {ascending : false});

    if (error){
        console.log(error);
        return [];
    }

    if(!data){
        return [];
    }

    return data.map((item)=>({
        ...item.songs
    }));
}

export default getLikedSongs;