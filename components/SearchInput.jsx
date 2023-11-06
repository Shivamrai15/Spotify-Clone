"use client";

import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import qs from "query-string";
import Input from "./Input";



const SearchInput = () => {

    const router = useRouter();
    const [value, setValue] = useState("");
    const debounceValue = useDebounce(value, 500);

    useEffect(()=>{
        const query = {
            title : debounceValue
        }

        const url = qs.stringifyUrl({
            url : '/search',
            query
        });

        router.push(url);
    }, [debounceValue, router]);

    return (
        <Input
            placeholder = "what do you want to listen to?"
            value = {value}
            onChange = {(e)=>setValue(e.target.value)}
            className = "py-4 px-6 rounded-full text-lg md:w-96"
        />
    )
}

export default SearchInput;