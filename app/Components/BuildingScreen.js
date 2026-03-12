import useTheaterProjector from "../Hooks/useTheaterProjector";

import BuildingLogo from '../../public/assets/deco/building.svg';
import Image from "next/image";

const BuildingScreen = ({ className = "", style = {} }) => {
    const { url, color } = useTheaterProjector();

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

    return (
        <div className={`-z-20 ${className}`} style={{ ...style }}>
            <Image
                src={BuildingLogo} className="absolute -z-30 w-60 max-w-60"
                alt="Background building"
                loading="eager"/>

            {/** Contents of the ad board */}
            <div className={`-z-30 h-40 w-60 max-h-40 max-w-60 px-2 flex justify-center items-center ${url ? "bg-slate-500" : "bg-slate-800"}`}>
                {url
                    ? <img src={url} alt={"Project preview"} className={`${color ? `shadow-md ${colors[color]}` : ""} max-h-40 max-w-60 h-auto w-auto`} />
                    : <p className="font-bold font-[Meiryo] text-center text-slate-300"><span className="tracking-widest text-4xl">ラーメン</span><br />食べるために働きたい</p>
                    // </div>
                }
            </div>
        </div>
    );
}

export default BuildingScreen;