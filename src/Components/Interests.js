import React, { useContext, useEffect, useState } from "react";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Heading from "./Base/Heading";
import DataContext from "../Contexts/DataContext";
import { language } from "../Tools/lang";
import useCollection from "../Hooks/useCollection";
import IconContext from "../Contexts/IconContext";
import useLoader from "../Hooks/useLoader";

const Interests = () => {
    const title = useContext(DataContext).sections.interests;

    const [infoLines, setInfoLines] = useState("");
    const { data, isPending, error } = useCollection("interests");

    const handleExit = () => setInfoLines("");

    const { loaded, isReady } = useLoader();
    
    useEffect(() => {
        if (!isPending && data) {
            loaded("Interests");
        }
    }, [isPending, data, loaded]);

    useEffect(() => console.log(infoLines), [infoLines]);

    return isReady() && (
        <div className="tw-my-2 xl:tw-pl-8">
            <Heading level={2}>{title[language]}</Heading>
            <div className="tw-text-white">
                <div className="tw-flex tw-flex-wrap">
                    {data && data.map((d, i) =>
                        <Icon key={i} data={d} onHover={() => setInfoLines(d.info[language])} onExit={handleExit} />
                    )}
                </div>
                <div className="xl:tw-pl-3 xl:tw-rounded-md xl:tw-bg-[#020617] xl:tw-m-2 xl:tw-w-[580px]">
                    {infoLines.length > 0
                        ? <motion.p
                            className="xl:tw-text-yellow-300 xl:text-shadow-light xl:pixel-font"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 1 }}>
                            {infoLines}
                        </motion.p>
                        :
                        <div>
                            <p className="tw-text-slate-400 tw-italic">
                                Hover an icon above to show more info!
                            </p><br /><p></p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

const Icon = ({ data, onHover, onExit }) => {
    const icons = useContext(IconContext);

    return (
        <div className="tw-flex tw-items-center" onMouseEnter={onHover} onMouseLeave={onExit} >
            <FontAwesomeIcon className={`tw-m-2`} size={"2x"} icon={icons[data.id]} aria-label={`icon for ${data.icon}`} />

            <p className="tw-mx-1">{data.name[language]}</p>
        </div>
    );
}

export default Interests;