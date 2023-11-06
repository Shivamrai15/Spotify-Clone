import getLikedSongs from "@/actions/getLikedSongs";
import Header from "@/components/Header";
import Image from "next/image";
import LikedContent from "./components/LikedContent";

export const revalidate = 0;

const LikedSongsPage = async() => {

    const songs = await getLikedSongs();

    return (
        <div
            className="bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto"
        >
            <Header className="from-[#4c3797] to-[#2b2053]">
                <div className="mt-20">
                    <div
                        className="flex flex-col md:flex-row items-center gap-x-5"
                    >
                        <div
                            className="relative h-32 w-32 lg:h-56 lg:w-56 "
                        >
                            <Image
                                fill
                                alt="Playlist"
                                src="/images/liked.png"
                                className="object-cover rounded-md shadow-lg"
                            />
                        </div>
                        <div
                            className="flex flex-col gap-y-2 mt-4 md:mt-0"
                        >
                            <p className="hidden md:block font-semibold text-sm">
                                Playlist
                            </p>
                            <h1 className="text-white text-4xl sm:text-5xl lg:text-8xl font-extrabold">
                                Liked Songs
                            </h1>
                        </div>
                    </div>
                </div>
            </Header>
            <LikedContent songs = {songs}/>
        </div>
    )
}

export default LikedSongsPage