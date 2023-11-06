"use client";

import Header from "@/components/Header";
import AccountContent from "./components/AccountContent";



const AccoutPage = () => {

    return (
        <div className = "bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
            <Header
                className="from-neutral-900"
            >
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-bold">Account Settings</h1>
                </div>
            </Header>
            <AccountContent/>
        </div>
    )
}

export default AccoutPage;