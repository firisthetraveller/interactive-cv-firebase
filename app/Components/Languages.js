import React, { useCallback, useContext, useState } from "react";
import { motion } from "framer-motion";

import Heading from "./Base/Heading";
import { language, localeText } from "../Tools/lang";
import DataContext from "../Contexts/DataContext";
import useCollection from "../Hooks/useCollection";

const LanguageDisplay = React.memo(({ name, level, certification }) => {
    const [showCert, setShowCert] = useState(false);

    const handleMouseEnter = useCallback(() => setShowCert(true), []);
    const handleMouseLeave = useCallback(() => setShowCert(false), []);

    return (
        <>
            {certification
                ? <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <p>{name} {level} {showCert && <motion.span className="italic text-sm px-1 xl:text-yellow-300 xl:text-shadow-light xl:pixel-font" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>{certification}</motion.span>}</p>
                </div>
                : <div>
                    <p>{name} {level}</p>
                </div>
            }
        </>
    )
});

const LanguagesEmpty = () => {
    return (
        <>
            {[...Array(3).keys()].map(i => <div key={i}>
                <p className="min-h-6 w-full skeleton"/>
            </div>)}
        </>
    )
};

const Languages = () => {
    const title = useContext(DataContext).sections.languages;
    const { data: languages, isPending, error } = useCollection("languages");

    return (
        <div className="my-2 xl:pl-8">
            <Heading level={2}>{title[language]}</Heading>

            <div className="xl:pl-1 xl:rounded-md xl:bg-[#020617] xl:m-2 xl:px-2 xl:py-1 xl:w-67.5 flex flex-col gap-y-2">
                {/* <LanguagesEmpty /> */}
                {!languages
                    ? <LanguagesEmpty />
                    : languages.map((d, i) => (
                        <LanguageDisplay key={i} name={d.name[language]} level={localeText(d.level[language])} certification={d.certification} />
                    ))
                }
            </div>
        </div>
    )
}

export default Languages;