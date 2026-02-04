import { useContext, useEffect } from "react";

import useWindowProperties from "../Hooks/useWindowProperties.js";
import useCollection from "../Hooks/useCollection.js";
import useLoader from "../Hooks/useLoader.js";
import DataContext from "../Contexts/DataContext.js";

import Heading from "./Base/Heading.js";
import Sign from "./Deco/Sign.js";
import HighlightBuilding from "./Deco/HighlightBuilding.js";

import { language } from "../Tools/lang.js";

const Highlights = () => {
    const { isMobile } = useWindowProperties();
    const title = useContext(DataContext).sections.highlights;

    const { data: projects, isPending: isPendingA } = useCollection("projects");
    const { data: experiences, isPending: isPendingB } = useCollection("experiences");

    const { loaded, isReady } = useLoader();

    useEffect(() => {
        if (!isPendingA && !isPendingB) {
            loaded("Highlights");
        }
    }, [isPendingA, isPendingB, loaded]);

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
                    {projects && experiences && <HighlightBuilding projects={projects} experiences={experiences}/>}
                </div>
            </div>
        </div>
    );
}

export default Highlights;