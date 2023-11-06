"use client"

import { MyUserContextProvider } from "@/hooks/useUser";

const UserProvider = ({children}) => {
    return (
        <MyUserContextProvider>
            {children}
        </MyUserContextProvider>
    )
}

export default UserProvider;