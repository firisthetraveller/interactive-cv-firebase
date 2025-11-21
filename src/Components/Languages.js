import React, { useCallback, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";

import Heading from "./Base/Heading";
import { language, localeText } from "../Tools/lang";
import DataContext from "../Contexts/DataContext";
import useCollection from "../Hooks/useCollection";
import useLoader from "../Hooks/useLoader";

const LanguageDisplay = React.memo(({ name, level, certification }) => {
    const [showCert, setShowCert] = useState(false);

    const handleMouseEnter = useCallback(() => setShowCert(true), []);
    const handleMouseLeave = useCallback(() => setShowCert(false), []);

    return (
        <>
            {certification
                ? <div className="tw-my-1 tw-mx-2" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <p>{name} {level} {showCert && <motion.span className="tw-italic tw-text-sm tw-px-1 xl:tw-text-yellow-300 xl:text-shadow-light xl:pixel-font" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>{certification}</motion.span>}</p>
                </div>
                : <div className="tw-my-1 tw-mx-2">
                    <p>{name} {level}</p>
                </div>
            }
        </>
    )
});

const Languages = () => {
    const title = useContext(DataContext).sections.languages;
    const { data: languages, isPending, error } = useCollection("languages");
    const { loaded, isReady } = useLoader();
    
    useEffect(() => {
        if (!isPending && languages) {
            loaded("Languages");
        }
    }, [isPending, languages, loaded]);
    
    

    return isReady() && (
        <div className="tw-my-2 xl:tw-pl-8">
            <Heading level={2}>{title[language]}</Heading>

            <div className="xl:tw-pl-1 xl:tw-rounded-md xl:tw-bg-[#020617] xl:tw-m-2 xl:tw-w-[270px]">
                {languages && languages.map((d, i) =>
                    <LanguageDisplay key={i} name={d.name[language]} level={localeText(d.level[language])} certification={d.certification} />
                )}
            </div>
        </div>
    )
}

export default Languages;