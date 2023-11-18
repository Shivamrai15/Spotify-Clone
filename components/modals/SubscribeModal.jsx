"use client";

import { useState } from "react";
import Button from "../Button";
import Modal from "./Modal";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripeClient";
import useSubscribeModal from "@/hooks/useSubscribeModal";

const priceFormat = (price) => {
    const priceString = new Intl.NumberFormat('en-US', {
        style : 'currency',
        currency : price.currency,
        minimumFractionDigits : 0
    }).format((price?.unit_amount || 0) / 100);

    return priceString;
}

const SubscribeModal = ({products}) => {

    const subscribeModal = useSubscribeModal();
    const {user, isLoading, subscription } = useUser();
    const [priceIdLoading, setPriceIdLoading] = useState();

    const onChange = (open)=>{
        if(!open){
            subscribeModal.onClose();
        }
    }

    const handleCheckOut = async(price)=>{
        setPriceIdLoading(price.id);
        if(!user){
            setPriceIdLoading(undefined);
            return toast.error("User must logged in");
        }
        if(subscription){
            setPriceIdLoading(undefined);
            return toast.info("Already subscribed");
        }

        try {
            const {sessionId} = await postData({
                url : '/api/create-checkout-session',
                data : {price}
            });

            const stripe = await getStripe();
            stripe?.redirectToCheckout({sessionId});
        } catch (error) {
            toast.error(error?.message);
        }finally{
            setPriceIdLoading(undefined);
        }
    }

    let content = (
        <div className = "text-center">
            No Products Available.
        </div>
    )


    if(products.length){
        content = (
            <div className="">
                {products.map((product)=>{
                    if(!product.prices?.length){
                        return (
                            <div
                                key = {product.id}
                            >
                                No Prices Available.
                            </div>
                        )
                    }

                    return product.prices.map((price)=>(
                        <Button
                            className = "bg-green-500 mb-4"
                            key = {price.id}
                            onClick = {()=>handleCheckOut(price)}
                            disabled = {isLoading || price.id === priceIdLoading}
                        >
                            {`Subscribe for ${priceFormat(price)} for a ${price.interval}`}
                        </Button>
                    ))
                })}
            </div>
        )
    }

    if(subscription){
        content = (
            <div className = "text-center">
                Already Subscribed
            </div>
        )
    }

    return (
        <Modal
            title= "Only for premium users"
            description="Listen to music with Spotify premium"
            isOpen = {subscribeModal.isOpen}
            onChange={onChange}
        >
            {content}
        </Modal>
    )
}

export default SubscribeModal;