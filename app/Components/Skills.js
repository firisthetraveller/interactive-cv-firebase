import Image from "next/image";
import { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons";

import useLights from "../Hooks/useLights";
import useWindowProperties from "../Hooks/useWindowProperties";

import Heading from "./Base/Heading";
import DataContext from "../Contexts/DataContext";
import { language } from "../Tools/lang";

import firebaseLogo from "../../public/assets/icons/firebase.svg";
import tailwindLogo from "../../public/assets/icons/tailwind.svg";
import nextLogo from "../../public/assets/icons/nextjs.svg";
import d3Logo from "../../public/assets/icons/d3.svg";

import CablesSVG from "../../public/assets/deco/pole-cables.svg";
import Bird from "./Deco/Bird";

const Icon = ({ name, icon, faIcon, noname = false }) => {
    const { toggleLight } = useLights();

    return (
        <div className="flex items-center cursor-pointer min-h-11" onClick={() => toggleLight(name)}>
            {icon && <Image className={`m-2 ${noname ? "w-24" : "w-8"} h-auto`} src={icon} alt={name} aria-label={`icon for ${name}`} />}
            {faIcon && <FontAwesomeIcon icon={faIcon} className="m-2 text-xl" />}
            {!noname && <p className="mx-2">{name}</p>}
        </div>
    )
}

const Skills = () => {
    const { isActiveLight } = useLights();
    const { width, isMobile } = useWindowProperties();

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
        <div className="xl:bg-cyan-950 xl:bg-cyan-500 bg-cyan-800/50 xl:bg-gray-950 xl:bg-gray-500 bg-gray-800/50 xl:bg-orange-950 xl:bg-orange-500 bg-orange-800/50 xl:bg-green-950 xl:bg-green-500 bg-green-800/50 xl:bg-sky-950 xl:bg-sky-500 bg-sky-800/50" />
    )

    const title = useContext(DataContext).sections.skills[language];

    return (
        <div className="my-2 xl:pl-8 relative">
            <Heading level={2}>{title}</Heading>
            {!isMobile() && <Image
                src={CablesSVG} alt={"Deco cables behind skills"}
                className="-z-10 translate-y-[0.4rem] absolute w-252 h-auto"
                loading="eager" />}

            <div className="flex items-center text-white flex-wrap relative">
                {skills.map((s, i) =>
                    <div key={i} className={`xl:border-solid relative xl:rounded xl:mx-1 ${isActiveLight(s.name) ? `xl:bg-${s.color}-500` : `xl:bg-${s.color}-950`}`}>
                        {isMobile() && isActiveLight(s.name) && <div className={`absolute inset-0 bg-${s.color}-800/50 blur-md border-white border rounded-xl pointer-events-none -z-10`} />}
                        <Icon name={s.name} icon={s.icon} faIcon={s.faIcon} noname={s.noname} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Skills;