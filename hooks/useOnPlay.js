import useAuthModal from "./useAuthModal";
import usePlayer from "./usePlayer"
import useSubscribeModal from "./useSubscribeModal";
import { useUser } from "./useUser";

const useOnPlay = (songs)=>{
    const player = usePlayer();
    const authModal = useAuthModal();
    const subscriptionModal = useSubscribeModal();
    const { user, subscription } = useUser();

    const onPlay = (id)=>{
        if(!user){
            return authModal.onOpen();
        }

        if(!subscription){
            return subscriptionModal.onOpen();
        }

        player.setId(id);
        player.setIds(songs.map((song)=>song.id));
    }

    return onPlay;
}

export default useOnPlay;