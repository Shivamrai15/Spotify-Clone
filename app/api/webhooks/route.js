import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/libs/stripe";

import {
    upsertPriceRecord,
    upsertProductRecord,
    manageSubscriptionStatusChange
} from "@/libs/supabaseAdmin";

const relevantEvents = new Set([
    'product.created',
    'product.updated',
    'price.created',
    'price.updated',
    'checkout.session.completed',
    'customer.subscription.created',
    'customer.subscription.updated',
    'customer.subscription.deleted'
]);

export async function POST (request) {
    const body = await request.text();
    const sig = headers().get('Stripe-Signature');

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;
    try {
        if(!sig || !webhookSecret){
            return;
        }

        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

    } catch (error) {
        console.error("Error Message", error);
        return new NextResponse(`Webhook Error: ${error.message}`, {status: 400});
    }

    if(relevantEvents.has(event.type)){
        try {
            switch (event.type) {
                case 'product.created':
                case 'product.updated':
                    await upsertProductRecord(event.data.object);
                    break;
                case 'price.created':
                case 'price.updated':
                    await upsertPriceRecord(event.data.object);
                    break;
                case 'customer.subscription.created':
                case 'customer.subscription.updated':
                case 'customer.subscription.deleted':
                    const subscription = event.data.object;
                    await manageSubscriptionStatusChange(
                        subscription.id,
                        subscription.customer,
                        event.type === 'customer.subscription.created'
                    );
                    break;
                case 'checkout.session.completed':
                    const checkoutSession = event.data.object;
                    if(checkoutSession.mode === 'subscription'){
                        const subscriptionId = checkoutSession.subscription;
                        await manageSubscriptionStatusChange(
                            subscriptionId,
                            checkoutSession.customer,
                            true
                        );
                    }
                    break;
                default:
                    throw new Error("Unhandled Event");

            }
        } catch (error) {
            console.error("Error Message", error);
            return new NextResponse(`Webhook Error: ${error.message}`, {status: 400});
        }
    }

    return NextResponse.json({
        received : true
    }, {status : 200});
}

