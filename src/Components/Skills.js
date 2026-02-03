import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact, faVuejs } from "@fortawesome/free-brands-svg-icons";

import useLights from "../Hooks/useLights";

import Heading from "./Base/Heading";
import { useContext } from "react";
import DataContext from "../Contexts/DataContext";
import { language } from "../Tools/lang";
import useLoader from "../Hooks/useLoader";

const Icon = ({ name, icon, faIcon, noname = false }) => {
    const { toggleLight } = useLights();

    return (
        <div className="tw-flex tw-items-center tw-cursor-pointer tw-min-h-11" onClick={() => toggleLight(name)}>
            {icon && <img className="tw-m-2" src={icon} alt={name} width={noname ? 32 * 3 : 32} height={32} aria-label={`icon for ${icon}`} />}
            {faIcon && <FontAwesomeIcon icon={faIcon} className="tw-m-2" size="2x" />}
            {!noname && <p className="tw-mx-1">{name}</p>}
        </div>
    )
}

const Skills = () => {
    const { isActiveLight } = useLights();
    const { isReady } = useLoader();
    
    

    const skills = [
        { name: "React", faIcon: faReact, color: "cyan" },
        { name: "Next.JS", icon: `${process.env.PUBLIC_URL}/assets/icons/nextjs.svg`, color: "gray", nofilter: true },
        { name: "Firebase", icon: `${process.env.PUBLIC_URL}/assets/icons/firebase.svg`, color: "orange", nofilter: true, noname: true },
        { name: "VueJS", faIcon: faVuejs, color: "green" },
        { name: "Tailwind", icon: `${process.env.PUBLIC_URL}/assets/icons/tailwind.svg`, color: "sky", nofilter: true, noname: true }
    ]

    /** Tailwind loader for skill icons */
    // eslint-disable-next-line no-unused-vars
    const dummy = (
        <div className="xl:tw-bg-cyan-950 xl:tw-bg-cyan-500 xl:tw-bg-gray-950 xl:tw-bg-gray-500 xl:tw-bg-orange-950 xl:tw-bg-orange-500 xl:tw-bg-green-950 xl:tw-bg-green-500 xl:tw-bg-sky-950 xl:tw-bg-sky-500"/>
    )

    const title = useContext(DataContext).sections.skills[language];

    return isReady() && (
        <div className="tw-my-2 xl:tw-pl-8">
            <Heading level={2}>{title}</Heading>
            <div className="tw-flex tw-items-center tw-text-white tw-flex-wrap">
                {skills.map((s, i) =>
                    <div key={i} className={`xl:tw-border-solid xl:tw-rounded xl:tw-mx-1 ${isActiveLight(s.name) ? `xl:tw-bg-${s.color}-500` : `xl:tw-bg-${s.color}-950`}`}>
                        <Icon name={s.name} icon={s.icon} faIcon={s.faIcon} noname={s.noname} />
                    </div>
                )}
            </div>            
        </div>
    )
}

export default Skills;