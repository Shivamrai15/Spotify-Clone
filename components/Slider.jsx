"use client";

import * as RadixSlider from "@radix-ui/react-slider";

const Slider = ({value = 1, onChange}) => {

    const handleChange = (newValues)=>{
        onChange?.(newValues[0]);
    }

    return (
        <RadixSlider.Root
            className = "relative flex items-center select-none touch-none w-full h-10"
            defaultValue = {[1]}
            value = {[value]}
            onValueChange = {handleChange}
            max = {1}
            step = {0.1}
            aria-label = "Volume"
        >
            <RadixSlider.Track
                className = "bg-neutral-600 relative grow rounded-full h-[3px]"
            >
                <RadixSlider.Range className= "absolute bg-white rounded-full h-full"/>
            </RadixSlider.Track>
        </RadixSlider.Root>
    );
}

export default Slider;