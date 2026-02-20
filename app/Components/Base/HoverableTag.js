import { createRef, useEffect, useState } from "react";
import useLights from "../../Hooks/useLights";
import ResizeSVG from "./ResizeSVG";

/**
 * 
 * @param {object} param0 
 * @param {string} param0.name
 * @returns 
 */
const HoverableTag = ({ name }) => {
    const { toggleLight, isActiveLight, isPermanentLight } = useLights();
    const ref = createRef();
    const [divWidth, setDivWidth] = useState(null);

    useEffect(() => {
        if (!divWidth && ref.current) {
            setDivWidth(Math.floor(ref.current.getBoundingClientRect().width));
        }
    }, [ref]);

    return (
        <div ref={ref} className="relative">
            <ResizeSVG width={divWidth} height={8} minWidth={1280} className="pointer-events-none bottom-0 absolute">
                {/** TODO: Curtains */}

                {/** This is the guardrail */}
                <line x1={0} y1={0} x2={divWidth} y2={0} strokeWidth={1} stroke="#475569" />
                {Array.from({ length: divWidth / 4 }, (e, i) => i + 1).map(i => <line key={i} x1={4 + 4 * i} y1={0} x2={4 + 4 * i} y2={8} strokeWidth={1} strokeOpacity={0.4} stroke="#475569" />)}
            </ResizeSVG>

            {/** The window lighting up and turning off */}
            <div className={`
                    my-0.5 mx-1 p-1 cursor-pointer
                    ${isPermanentLight(name)
                    ? "bg-teal-100 shadow-lg shadow-teal-200 text-slate-800"
                    : (isActiveLight(name)
                        ? "bg-yellow-100 shadow-lg shadow-yellow-200 text-slate-800"
                        : "bg-slate-950 hover:bg-slate-600")
                }`}
                onClick={() => toggleLight(name)}>
                {name}
            </div>
        </div>
    );
}

export default HoverableTag;