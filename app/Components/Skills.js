import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact, faVuejs } from "@fortawesome/free-brands-svg-icons";

import useLights from "../Hooks/useLights";

import Heading from "./Base/Heading";
import { useContext } from "react";
import DataContext from "../Contexts/DataContext";
import { language } from "../Tools/lang";
import useLoader from "../Hooks/useLoader";

import firebaseLogo from "../../public/assets/icons/firebase.svg";
import tailwindLogo from "../../public/assets/icons/tailwind.svg";
import nextLogo from "../../public/assets/icons/nextjs.svg";
import d3Logo from "../../public/assets/icons/d3.svg";
import ResizeSVG from "./Base/ResizeSVG";
import Bird from "./Deco/Bird";
import useWindowProperties from "../Hooks/useWindowProperties";

const Icon = ({ name, icon, faIcon, noname = false }) => {
    const { toggleLight } = useLights();

    return (
        <div className="flex items-center cursor-pointer min-h-11" onClick={() => toggleLight(name)}>
            {icon && <Image className="m-2" unoptimized src={icon} alt={name} width={noname ? 32 * 3 : 32} height={32} aria-label={`icon for ${icon}`} />}
            {faIcon && <FontAwesomeIcon icon={faIcon} className="m-2" size="2x" />}
            {!noname && <p className="mx-2">{name}</p>}
        </div>
    )
}

const Skills = () => {
    const { isActiveLight } = useLights();
    const { isReady } = useLoader();
    const { width } = useWindowProperties();

    const skills = [
        { name: "React", faIcon: faReact, color: "cyan" },
        { name: "Next.JS", icon: nextLogo, color: "gray", nofilter: true },
        { name: "Firebase", icon: firebaseLogo, color: "orange", nofilter: true, noname: true },
        { name: "D3", icon: d3Logo, color: "gray", nofilter: true },
        { name: "Tailwind", icon: tailwindLogo, color: "sky", nofilter: true, noname: true }
    ]

    /** Tailwind loader for skill icons */
    // eslint-disable-next-line no-unused-vars
    const dummy = (
        <div className="xl:bg-cyan-950 xl:bg-cyan-500 xl:bg-gray-950 xl:bg-gray-500 xl:bg-orange-950 xl:bg-orange-500 xl:bg-green-950 xl:bg-green-500 xl:bg-sky-950 xl:bg-sky-500" />
    )

    const title = useContext(DataContext).sections.skills[language];

    return isReady() && (
        <div className="my-2 xl:pl-8 relative">
            <Heading level={2}>{title}</Heading>
            <ResizeSVG className="-z-10 translate-y-[0.4rem] absolute" height={700} width={width * 0.7} minWidth={1280}>
                {/** First horizontal bar */}
                <line x1={-100} y1={14} x2={width * 0.7} y2={14} stroke="black" strokeWidth={4} />
                <line x1={630} y1={11} x2={680} y2={11} stroke="lightgray" strokeWidth={1} />

                {/** Birds */}
                <Bird position={{ x: width >= 1920 ? 786 : 586, y: 9 }} />
                <Bird position={{ x: width >= 1920 ? 770 : 570, y: 9 }} />

                {/** Second horizontal bar */}
                <line x1={-100} y1={26} x2={width * 0.7} y2={26} stroke="black" strokeWidth={4} />
                <line x1={610} y1={24} x2={660} y2={24} stroke="lightgray" strokeWidth={1} />
            </ResizeSVG>
            <div className="flex items-center text-white flex-wrap">
                {skills.map((s, i) =>
                    <div key={i} className={`xl:border-solid xl:rounded xl:mx-1 ${isActiveLight(s.name) ? `xl:bg-${s.color}-500` : `xl:bg-${s.color}-950`}`}>
                        <Icon name={s.name} icon={s.icon} faIcon={s.faIcon} noname={s.noname} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Skills;