import { useContext, useEffect, useState } from "react";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Heading from "./Base/Heading";
import DataContext from "../Contexts/DataContext";
import { language } from "../Tools/lang";
import useCollection from "../Hooks/useCollection";
import IconContext from "../Contexts/IconContext";

const InterestEmpty = () => {
    return (
        <div className="flex items-center gap-x-2">
            <div className="skeleton-circle size-8" />
            <div className="skeleton w-14 h-4" />
        </div>
    )
}

const InterestEmptyList = () => {
    return (
        <>
            {[...Array(4).keys()].map(i => <InterestEmpty key={i} />)}
        </>
    )
}

const Interests = () => {
    const title = useContext(DataContext).sections.interests;
    const placeholder = useContext(DataContext).placeholders.interestInfo;

    const [infoLines, setInfoLines] = useState("");
    const { data: interests, isPending, error } = useCollection("interests");

    const handleExit = () => setInfoLines("");

    return (
        <div className="my-2 xl:pl-8">
            <Heading level={2}>{title[language]}</Heading>
            <div className="text-white">
                <div className="flex flex-wrap items-center my-2">
                    {/* <InterestEmptyList/>  */}
                    {interests
                        ? interests.map((d, i) =>
                            <Icon key={i} data={d} className="p-2" onHover={() => setInfoLines(d.info[language])} onExit={handleExit} />
                        )
                        : <InterestEmptyList />
                    }
                </div>
                <div className="xl:pl-3 xl:rounded-md xl:bg-[#020617] xl:m-2 xl:w-145 h-12">
                    <motion.p
                        className={`${infoLines.length > 0 ? "xl:text-yellow-300 xl:text-shadow-light xl:pixel-font" : "italic text-gray-400"}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 1 }}>
                        {infoLines.length > 0 ? infoLines : placeholder[language]}
                    </motion.p>
                    {/* :
                        <div>
                            <p className="text-slate-400 italic">
                                {placeholder[language]}
                            </p><br /><p></p>
                        </div>
                    } */}
                </div>
            </div>
        </div>
    )
}

const Icon = ({ className, data, onHover, onExit }) => {
    const icons = useContext(IconContext);

    return (
        <div className={`flex items-center gap-x-3 ${className}`} onMouseEnter={onHover} onMouseLeave={onExit} >
            <FontAwesomeIcon size={"2x"} icon={icons[data.id]} aria-label={`icon for ${data.icon}`} />

            <p>{data.name[language]}</p>
        </div>
    );
}

export default Interests;