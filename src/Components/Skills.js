import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNode, faReact, faVuejs } from "@fortawesome/free-brands-svg-icons";
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

const Icon = ({ name, icon, faIcon, noname = false }) => {
    const { toggleLight } = useLights();

    return (
        <div className="flex items-center cursor-pointer min-h-11" onClick={() => toggleLight(name)}>
            {icon && <Image className="m-2" unoptimized src={icon} alt={name} width={noname ? 32 * 3 : 32} height={32} aria-label={`icon for ${icon}`} />}
            {faIcon && <FontAwesomeIcon icon={faIcon} className="m-2" size="2x" />}
            {!noname && <p className="mx-1">{name}</p>}
        </div>
    )
}

const Skills = () => {
    const { isActiveLight } = useLights();
    const { isReady } = useLoader();

    const skills = [
        { name: "React", faIcon: faReact, color: "cyan" },
        { name: "Next.JS", icon: nextLogo, color: "gray", nofilter: true},
        { name: "Firebase", icon: firebaseLogo, color: "orange", nofilter: true, noname: true },
        { name: "VueJS", faIcon: faVuejs, color: "green" },
        { name: "Tailwind", icon: tailwindLogo, color: "sky", nofilter: true, noname: true }
    ]

    /** Tailwind loader for skill icons */
    // eslint-disable-next-line no-unused-vars
    const dummy = (
        <div className="xl:bg-cyan-950 xl:bg-cyan-500 xl:bg-gray-950 xl:bg-gray-500 xl:bg-orange-950 xl:bg-orange-500 xl:bg-green-950 xl:bg-green-500 xl:bg-sky-950 xl:bg-sky-500"/>
    )

    const title = useContext(DataContext).sections.skills[language];

    return isReady() && (
        <div className="my-2 xl:pl-8">
            <Heading level={2}>{title}</Heading>
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