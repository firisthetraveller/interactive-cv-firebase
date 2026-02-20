import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import useTheaterProjector from "../../Hooks/useTheaterProjector";

import Heading from "../Base/Heading";
import HoverableTag from "../Base/HoverableTag";

import { language, localeText } from "../../Tools/lang";

const dateFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
};

const locateDateString = (date) => {
    return date.toLocaleDateString(navigator.language, dateFormatOptions);
}

export const HighlightEmptyFloor = () => {
    return (
        <div className={`py-2 xl:pl-8 xl:pr-4 px-3 flex flex-col gap-y-2 w-full`}>
            <div className="flex gap-x-2 items-center">
                {/** Title */}
                <Heading level={3} className={"skeleton min-w-40 min-h-5"} />

                {/** Icons */}
                <div className="skeleton-circle size-5" />
                <div className="skeleton-circle size-5" />
            </div>
            {/** Project duration */}
            <p className="skeleton min-w-20 min-h-4" />

            {/** Project location */}
            <p className="skeleton min-w-20 min-h-4" />

            {/** Project description */}
            <div>
                <p className="skeleton min-w-120 min-h-4" />
                <p className="skeleton min-w-120 min-h-4" />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-x-2">
                {[...Array(3).keys()].map(i => <div className={"skeleton min-w-8 min-h-5 p-1"} width={30} key={i} />)}
            </div>
        </div>
    );
}

export const HighlightBuildingFloor = ({ project, hoverStyle }) => {
    const [isHovered, setHovered] = useState(false);
    const { clearTheater, switchMovie } = useTheaterProjector();

    return (
        <div className={`py-4 xl:pl-8 xl:pr-4 px-3 ${isHovered ? hoverStyle : ""}`}
            onMouseEnter={() => {
                setHovered(true);
                project.images ? switchMovie(project.images[0]) : clearTheater();
            }}
            onMouseLeave={() => {
                setHovered(false);
                clearTheater()
            }}>
            <div className="flex">
                <Heading level={3}>{localeText(project.title)}</Heading>
                {project.url && <a href={project.url} target="_blank" rel="noreferrer"><FontAwesomeIcon className="mx-2" icon={faArrowUpRightFromSquare} /></a>}
                {project.github && <a href={project.github} target="_blank" rel="noreferrer"><FontAwesomeIcon className="mx-2" icon={faGithub} /></a>}
            </div>
            <p>{project.date.includes("/") ? locateDateString(new Date(project.date)) : project.date}{project.duration && ` - ${localeText(project.duration)}`}</p>
            {project.location && <p className="text-sm">{localeText(project.location)}</p>}
            <p className="italic text-sm">
                {project.description[language].split(". ").map((sentence, i) => (
                    <span key={i}>
                        {sentence.trim()}
                        {i < project.description[language].split(". ").length - 1 && <br />}
                    </span>
                ))}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap">
                {project.tags && project.tags.map((t, i) =>
                    <HoverableTag key={i} name={t} />
                )}
                {/* {Array.from({ length: maxTagsOnProjects - ((project.tags) ? project.tags.length : 0) }, (e, i) => i).map(i =>
                                    <HoverableTag key={i} name={`__${nextId()}`} />
                                )} */}
            </div>
        </div>
    );
}