import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSongsByTitle = async(title) => {
    const supabase = createServerComponentClient({
        cookies
    });

    if(!title){
        return [];
    }

    const { data, error } = await supabase
                            .from('songs')
                            .select('*')
                            .ilike('title', `%${title}%`)
                            .order("created_at", {ascending : false});

    if (error){
        console.log(error);
    }

    return data || [];
}

export default getSongsByTitle;