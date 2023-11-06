import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req){
    const res= NextResponse.next()
    const supabse = createMiddlewareClient({
        req,
        res
    });

    await supabse.auth.getSession();
    return res;
}

