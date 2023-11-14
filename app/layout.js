import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import {Toaster} from "sonner";
import getSongsByUser from "@/actions/getSongsByUser";
import Player from "@/components/Player";
import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify - Web Player: Music for everyone",
  description: "Experience the ultimate music streaming platform with our Spotify clone. Discover and play your favorite songs, create playlists, and upload your own tracks with a premium subscription.",
};

export const revalidate = 0 ;

export default async function RootLayout({ children }) {

  const userSongs = await getSongsByUser();
  const products = await getActiveProductsWithPrices();

  return (
    <html lang="en">
      <link rel="icon" href="/images/spotify.ico" sizes="any" />
      <body className={figtree.className}>
        <SupabaseProvider>
          <Toaster
            position="bottom-center"
          />
          <UserProvider>
            <ModalProvider products = {products}/>
            <Sidebar
              songs = {userSongs}
            >
              {children}
            </Sidebar>
            <Player/>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
