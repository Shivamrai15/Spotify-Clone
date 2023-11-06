
import getSongs from "@/actions/getSongs";

import SongContent from "./components/SongContent";
import HomeHeader from "./components/HomeHeader";

export const revalidate = 0;



export default async function Home() {

    const songs = await getSongs();

    return (
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
            <HomeHeader/>
            <div
                className="mt-4 mb-7 px-6"
            >
                <div className="flex justify-between items-center">
                    <h1 className="text-white text-2xl font-semibold">
                        Fresh new music
                    </h1>
                </div>
                <SongContent
                    songs = {songs}
                />
            </div>
        </div>
    )
}
