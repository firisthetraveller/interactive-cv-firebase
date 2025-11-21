import useLoader from "../Hooks/useLoader";
import useTheaterProjector from "../Hooks/useTheaterProjector";
import ResizeSVG from "./Base/ResizeSVG";

const BuildingScreen = ({ className, style }) => {
    const { url, color } = useTheaterProjector();
    const { isReady } = useLoader();

    console.log(url);

    const colors = {
        "pink": "tw-shadow-pink-200",
        "slate": "tw-shadow-slate-400",
        "white": "tw-shadow-white",
        "purple": "tw-shadow-purple-400"
    }

    /** Tailwind loader for preview shadows */
    // eslint-disable-next-line no-unused-vars
    const dummy = (
        <div className="tw-shadow-pink-200 tw-shadow-slate-400 tw-shadow-white tw-shadow-purple-400" />
    )

    return isReady() && (
        <div className={`-tw-z-20 ${className}`} style={{ ...style }}>
            <ResizeSVG minWidth={1280} width={240} height={400} className="-tw-z-30">
                {/** Ad board */}
                <rect x={0} y={176} width={240} height={400} fill="#334155" />

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

            {/** Contents of the ad board */}
            <div className="-tw-z-30 tw-h-40 tw-w-60 tw-max-h-40 tw-max-w-60 tw-px-2 tw-flex tw-justify-center tw-items-center tw-bg-slate-500">
                {url
                    ? <img src={url} alt={"Project preview"} className={`${color ? `tw-shadow-md ${colors[color]}` : ""}`} />
                    : <p className="tw-font-bold tw-font-[Meiryo] tw-text-center tw-text-slate-300"><span className="tw-tracking-widest tw-text-4xl">ラーメン</span><br />食べるために働きたい</p>
                    // </div>
                }
            </div>
        </div>
    );
}

export default BuildingScreen;