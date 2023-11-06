import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "./components/SearchContent";

export const revalidate = 0;

const SearchPage = async({searchParams}) => {

    const songs = await getSongsByTitle(searchParams.title);

    return (
        <div
            className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto"
        >
            <Header className="from-neutral-900">
                <div
                    className="mb-2 flex flex-col gap-y-6"
                >
                    <h1 className="text-white text-3xl font-bold">Search</h1>
                    <SearchInput/>
                </div>
            </Header>
            <SearchContent songs = {songs} search = {searchParams.title}/>
        </div>
    )
}

export default SearchPage;