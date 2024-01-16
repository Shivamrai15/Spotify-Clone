"use client";

import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import useColor from "@/hooks/useColor";
import headerWelcome from "@/libs/utils";

const HomeHeader = () => {

    const {defaultColor} = useColor();
    const timeHeading = headerWelcome();

    return (
        <Header
            color = {defaultColor}
            className="transition-colors duration-500"
        >
                <h1
                    className="text-white text-3xl font-bold"
                >
                    {timeHeading}
                </h1>
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4"
                >
                    <ListItem
                        image = "/images/liked.png"
                        name= "Liked Songs"
                        href="liked"
                    />
                </div>
        </Header>
    )
}

export default HomeHeader;