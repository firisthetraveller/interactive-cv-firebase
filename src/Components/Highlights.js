import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import Heading from "./Base/Heading";
import HoverableTag from "./Base/HoverableTag.js";
import useWindowDimensions from "../Hooks/useWindowDimensions.js";
import Sign from "./Deco/Sign.js";
import useTheaterProjector from "../Hooks/useTheaterProjector.js";
import { useContext, useEffect, useState } from "react";
import DataContext from "../Contexts/DataContext.js";
import { localeText, language } from "../Tools/lang.js";
import useCollection from "../Hooks/useCollection.js";
import useLoader from "../Hooks/useLoader.js";

const dateFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
};

const locateDateString = (date) => {
    return date.toLocaleDateString(navigator.language, dateFormatOptions);
}

const compareProjects = (p1, p2) => {
    if (p1.priority === p2.priority)
        return new Date(p1.date) < new Date(p2.date);
    return p1.priority < p2.priority;
}

const Highlights = () => {
    const { isMobile } = useWindowDimensions();
    const { clearTheater, switchMovie } = useTheaterProjector();
    const title = useContext(DataContext).sections.highlights;

    const { data: projects, isPending: isPendingA } = useCollection("projects");
    const { data: experiences, isPending: isPendingB } = useCollection("experiences");
    const [data, setData] = useState([]);

    const { loaded, isReady } = useLoader();

    useEffect(() => {
        if (!isPendingA && !isPendingB && data) {
            loaded("Highlights");
        }
    }, [isPendingA, isPendingB, data, loaded]);

    useEffect(() => {
        if (projects)
            setData(d => [...d, ...projects].sort(compareProjects));
    }, [projects]);

    useEffect(() => {
        if (experiences)
            setData(d => [...d, ...experiences].sort(compareProjects));
    }, [experiences]);

    return isReady() && (
        <div className="xl:h-full xl:flex-col z-30">
            {/** Roof */}
            <div className="trapezoid bg-opacity-100">
                <Heading className="px-2 xl:px-8" level={2}>{title[language]}</Heading>
            </div>

            {/** Contents */}
            <div className="bg-slate-900 shadow-xl shadow-slate-900 xl:flex xl:h-full py-2">

                {/** Japanese signs on the left */}
                {!isMobile() &&
                    <div className="-translate-x-5">
                        <Sign
                            className={`bg-orange-800 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-600 translate-y-32`}
                            text="コIヒI好きのみ" large />
                        <Sign
                            className={`bg-lime-700 hover:bg-lime-400 hover:shadow-lg hover:shadow-lime-300 translate-y-40`}
                            text="抹茶でもいい" large />
                        <Sign
                            className={`bg-teal-700 hover:bg-teal-500 hover:shadow-lg hover:shadow-teal-500 translate-y-72`}
                            text="ホテルのはずだ" large />
                    </div>
                }

                {/** Contents */}
                <div className="space-y-4">
                    {data && data.map((p, i) => (
                        <div key={i} className="mx-2 xl:px-8 px-3"
                            onMouseEnter={() => p.images ? switchMovie(p.images[0]) : clearTheater()}
                            onMouseLeave={() => clearTheater()}>
                            <div className="flex">
                                <Heading level={3}>{localeText(p.title)}</Heading>
                                {p.url && <a href={p.url} target="_blank" rel="noreferrer"><FontAwesomeIcon className="mx-2" icon={faArrowUpRightFromSquare} /></a>}
                                {p.github && <a href={p.github} target="_blank" rel="noreferrer"><FontAwesomeIcon className="mx-2" icon={faGithub} /></a>}
                            </div>
                            <p>{p.date.includes("/") ? locateDateString(new Date(p.date)) : p.date}{p.duration && ` - ${localeText(p.duration)}`}</p>
                            {p.location && <p className="text-sm">{localeText(p.location)}</p>}
                            <p className="italic text-sm">
                                {p.description[language].split(". ").map((sentence, i) => (
                                    <span key={i}>
                                        {sentence.trim()}
                                        {i < p.description[language].split(". ").length - 1 && <br />}
                                    </span>
                                ))}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap">
                                {p.tags && p.tags.map((t, i) =>
                                    <HoverableTag key={i} name={t} />
                                )}
                                {/* {Array.from({ length: maxTagsOnProjects - ((p.tags) ? p.tags.length : 0) }, (e, i) => i).map(i =>
                                    <HoverableTag key={i} name={`__${nextId()}`} />
                                )} */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Highlights;