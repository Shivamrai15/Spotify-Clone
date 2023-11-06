"use client";

import Box from "@/components/Box";

const Error = () => {
    return (
        <div className = "h-full">
            <Box className="h-full flex items-center justify-center">
                <div className = "text-neutral-400-400 font-semibold">
                    Something went wrong.
                </div>
            </Box>
        </div>
    )
}

export default Error