import { useContext, useEffect } from "react";

import useWindowProperties from "../Hooks/useWindowProperties.js";
import useCollection from "../Hooks/useCollection.js";
import useLoader from "../Hooks/useLoader.js";
import DataContext from "../Contexts/DataContext.js";

import Heading from "./Base/Heading.js";
import Sign from "./Deco/Sign.js";
import HighlightBuildingContent from "./Deco/HighlightBuildingContent.js";

import { language } from "../Tools/lang.js";

const HighlightBuilding = ({ front = false, title, projects = [], experiences = [] }) => {
    const { isMobile } = useWindowProperties();

    return (
        <div className={`${front ? "-mt-8" : "mr-12"} relative`}>
            {/** Roof */}
            <div className="trapezoid">
                <Heading className="px-2 xl:px-8" level={2}>{title[language]}</Heading>
            </div>

            {/** Contents */}
            <div className={`${front ? "bg-slate-900 shadow-slate-900" : "bg-slate-800 shadow-slate-800 pb-12"} ${isMobile() ? "px-4" : ""} shadow-xl xl:flex xl:h-full py-2`}>
                {/** Japanese signs on the left */}
                {!isMobile() && front &&
                    <div className="-translate-x-5 absolute">
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
                <div className={"space-y-4"}>
                    {experiences && <HighlightBuildingContent experiences={experiences} />}
                    {projects && <HighlightBuildingContent projects={projects} />}
                </div>
            </div>
        </div>
    )
}

const Highlights = () => {
    const projectsTitle = useContext(DataContext).sections.highlights;
    const expsTitle = useContext(DataContext).sections.experiences;
    const { data: projects, isPending: isPendingA } = useCollection("projects");
    const { data: experiences, isPending: isPendingB } = useCollection("experiences");

    const { loaded, isReady } = useLoader();

    useEffect(() => {
        if (!isPendingA && !isPendingB) {
            loaded("Highlights");
        }
    }, [isPendingA, isPendingB, loaded]);

    return isReady() && (
        <div id="highlights-root" className="xl:h-full xl:flex-col z-30">
            <HighlightBuilding title={expsTitle} experiences={experiences} />
            <HighlightBuilding front={1} title={projectsTitle} projects={projects} />
        </div>
    );
}

export default Highlights;