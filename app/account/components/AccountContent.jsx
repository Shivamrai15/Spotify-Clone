"use client";

import Button from "@/components/Button";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AccountContent = () => {

    const router = useRouter();
    const subscribeModal = useSubscribeModal();
    const {isLoading, user, subscription} = useUser();

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(!loading && !user){
            router.replace("/");
        }
    }, [isLoading, user, router]);

    const redirectToCustomerPortal = async()=>{
        setLoading(true);
        try {
            const {url, error} = await postData({
                url : '/api/create-portal-link',
            });
            window.location.assign(url);
        } catch (error) {
            toast.error(error?.message);
        }
        setLoading(false);
    }

    return (
        <div className="mb-7 mt-20 px-6 w-full">
            {!subscription && (
                <div className="flex flex-col gap-y-4 justify-center items-center">
                    <p>
                        No Active Plan.
                    </p>
                    <Button
                        onClick = {()=>subscribeModal.onOpen()}
                        className = "w-[300px] bg-green-500"
                    >
                        Subscribe
                    </Button>
                </div>
            )}
            {subscription && (
                <div className="flex flex-col gap-y-4 justify-center items-center">
                    <p>
                        You are currently on the <b>{subscription?.prices?.products?.name}</b>
                    </p>
                    <Button
                        disabled = {loading || isLoading}
                        onClick = {redirectToCustomerPortal}
                        className = "w-[300px] bg-green-500"
                    >
                        Open Customer Portal
                    </Button>
                </div>
            )}
        </div>
    )
}

export default AccountContent;