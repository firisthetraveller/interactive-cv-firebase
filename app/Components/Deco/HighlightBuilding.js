import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import useTheaterProjector from "../../Hooks/useTheaterProjector";

import HoverableTag from "../Base/HoverableTag";
import Heading from "../Base/Heading";

import { localeText, language } from "../../Tools/lang";

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

const HighlightBuilding = ({ projects, experiences }) => {
    const { clearTheater, switchMovie } = useTheaterProjector();
    const data = [...projects, ...experiences].sort(compareProjects);

    return (
        <>
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
        </>
    )
}


export default HighlightBuilding;