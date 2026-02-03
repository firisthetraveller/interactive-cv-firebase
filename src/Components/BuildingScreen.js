import Image from "next/image";
import { memo } from "react";

import useLoader from "../Hooks/useLoader";
import useTheaterProjector from "../Hooks/useTheaterProjector";
import ResizeSVG from "./Base/ResizeSVG";

const BuildingSVG = memo(() => {
    return (
        <>
            <ResizeSVG minWidth={1280} width={240} height={400} className="-z-30">
                {/** Ad board */}
                <rect x={0} y={176} width={240} height={400} fill="#132135" />

                {/** Ad board leg */}
                <line x1={30} y1={0} x2={30} y2={176} strokeWidth={4} stroke="#000" />
                <line x1={120} y1={0} x2={120} y2={176} strokeWidth={4} stroke="#000" />
                <line x1={210} y1={0} x2={210} y2={176} strokeWidth={4} stroke="#000" />
            </ResizeSVG>
            <ResizeSVG minWidth={1280} height={400} width={240}>
                {/** Background building windows */}
                {[1, 2, 3, 4, 5, 6, 7].map(i => <line key={i} x1={30 * i} y1={176} x2={30 * i} y2={400} strokeWidth={1} stroke="#475569" />)}
                {[1, 2, 3, 4].map(i => <line key={i} x1={0} y1={176 + 44 * i} x2={240} y2={176 + 44 * i} strokeWidth={1} stroke="#475569" />)}
            </ResizeSVG>
        </>
    )
});

const BuildingScreen = ({ className, style }) => {
    const { url, color } = useTheaterProjector();
    const { isReady } = useLoader();

    const colors = {
        "pink": "shadow-pink-200",
        "slate": "shadow-slate-400",
        "white": "shadow-white",
        "purple": "shadow-purple-400"
    }

    /** Tailwind loader for preview shadows */
    // eslint-disable-next-line no-unused-vars
    const dummy = (
        <div className="shadow-pink-200 shadow-slate-400 shadow-white shadow-purple-400" />
    )

    return isReady() && (
        <div className={`-z-20 ${className}`} style={{ ...style }}>
            <BuildingSVG />

            {/** Contents of the ad board */}
            <div className={`-z-30 h-40 w-60 max-h-40 max-w-60 px-2 flex justify-center items-center ${url ? "bg-slate-500" : "bg-slate-800"}`}>
                {url
                    ? <Image src={url} unoptimized alt={"Project preview"} className={`${color ? `shadow-md ${colors[color]}` : ""}`} />
                    : <p className="font-bold font-[Meiryo] text-center text-slate-300"><span className="tracking-widest text-4xl">ラーメン</span><br />食べるために働きたい</p>
                    // </div>
                }
            </div>
        </div>
    );
}

export default BuildingScreen;