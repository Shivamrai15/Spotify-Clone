"use client";

import * as RadixSlider from "@radix-ui/react-slider";


const ProgressSlider = ({value = 1, onChange}) => {

    const handleChange = (newValues)=>{
        onChange?.(newValues[0]);
    }

    return (
        <RadixSlider.Root
                className = "relative flex items-center select-none touch-none max-w-64 w-[600px] h-3 group md:cursor-pointer"
                defaultValue = {[1]}
                value = {[value]}
                onValueChange = {handleChange}
                max = {1}
                step = {0.01}
                aria-label = "range"
            >
                <RadixSlider.Track
                    className = "bg-neutral-600 relative grow rounded-full h-[3px]"
                >
                    <RadixSlider.Range className= "absolute bg-white group-hover:bg-green-500 rounded-full h-full"/>
                </RadixSlider.Track>
        </RadixSlider.Root>
    )
}

export default ProgressSlider