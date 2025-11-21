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
    const { toggleLight, isActiveLight } = useLights();
    const ref = createRef();
    const [divWidth, setDivWidth] = useState(null);

    useEffect(() => {
        if (!divWidth && ref.current) {
            setDivWidth(Math.floor(ref.current.getBoundingClientRect().width));
        }
    }, [ref, divWidth]);

    return (
        <div ref={ref}>
            <ResizeSVG width={divWidth} height={34} minWidth={1280} className="tw-pointer-events-none">
                {/** TODO: Curtains */}

                {/** This is the guardrail */}
                <line x1={0} y1={28} x2={divWidth} y2={28} strokeWidth={1} stroke="#475569" />
                {Array.from({ length: 18 }, (e, i) => i + 1).map(i => <line key={i} x1={4 + 4 * i} y1={28} x2={4 + 4 * i} y2={34} strokeWidth={1} strokeOpacity={0.4} stroke="#475569" />)}
            </ResizeSVG>

            {/** The window lighting up and turning off */}
            <div className={`
                    tw-my-0.5 tw-mx-1 tw-p-1 tw-cursor-pointer
                    ${isActiveLight(name)
                    ? "tw-bg-yellow-100 tw-shadow-lg tw-shadow-yellow-200 tw-text-slate-800"
                    : "tw-bg-slate-700 hover:tw-bg-slate-500"
                }`}
                onClick={() => toggleLight(name)}>
                {name}
            </div>
        </div>
    );
}

export default HoverableTag;