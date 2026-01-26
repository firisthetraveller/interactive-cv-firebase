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
        <div className="xl:tw-h-full xl:tw-flex-col tw-z-30">
            {/** Roof */}
            <div className="trapezoid tw-bg-opacity-100">
                <Heading className="tw-px-2 xl:tw-px-8" level={2}>{title[language]}</Heading>
            </div>

            {/** Contents */}
            <div className="tw-bg-slate-900 tw-shadow-xl tw-shadow-slate-900 xl:tw-flex xl:tw-h-full tw-py-2">

                {/** Japanese signs on the left */}
                {!isMobile() &&
                    <div className="-tw-translate-x-5">
                        <Sign
                            className={`tw-bg-orange-800 hover:tw-bg-orange-600 hover:tw-shadow-lg hover:tw-shadow-orange-600 tw-translate-y-32`}
                            text="コIヒI好きのみ" large />
                        <Sign
                            className={`tw-bg-lime-700 hover:tw-bg-lime-400 hover:tw-shadow-lg hover:tw-shadow-lime-300 tw-translate-y-40`}
                            text="抹茶でもいい" large />
                        <Sign
                            className={`tw-bg-teal-700 hover:tw-bg-teal-500 hover:tw-shadow-lg hover:tw-shadow-teal-500 tw-translate-y-72`}
                            text="ホテルのはずだ" large />
                    </div>
                }

                {/** Contents */}
                <div className="tw-space-y-4">
                    {data && data.map((p, i) => (
                        <div key={i} className="tw-mx-2 xl:tw-px-8 tw-px-3"
                            onMouseEnter={() => p.images ? switchMovie(p.images[0]) : clearTheater()}
                            onMouseLeave={() => clearTheater()}>
                            <div className="tw-flex">
                                <Heading level={3}>{localeText(p.title)}</Heading>
                                {p.url && <a href={p.url} target="_blank" rel="noreferrer"><FontAwesomeIcon className="tw-mx-2" icon={faArrowUpRightFromSquare} /></a>}
                                {p.github && <a href={p.github} target="_blank" rel="noreferrer"><FontAwesomeIcon className="tw-mx-2" icon={faGithub} /></a>}
                            </div>
                            <p>{p.date.includes("/") ? locateDateString(new Date(p.date)) : p.date}{p.duration && ` - ${localeText(p.duration)}`}</p>
                            {p.location && <p className="tw-text-sm">{localeText(p.location)}</p>}
                            <p className="tw-italic tw-text-sm">
                                {p.description[language].split(". ").map((sentence, i) => (
                                    <span key={i}>
                                        {sentence.trim()}
                                        {i < p.description[language].split(". ").length - 1 && <br />}
                                    </span>
                                ))}
                            </p>

                            {/* Tags */}
                            <div className="tw-flex tw-flex-wrap">
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