import { useContext, useEffect } from "react";

import useWindowProperties from "../Hooks/useWindowProperties.js";
import useLoader from "../Hooks/useLoader.js";
import useCollection from "../Hooks/useCollection.js";
import DataContext from "../Contexts/DataContext.js";

import Heading from "./Base/Heading";
import HoverableTag from "./Base/HoverableTag.js";
import Sign from "./Deco/Sign.js";

import { language } from "../Tools/lang.js";

const Education = () => {
    const { isMobile } = useWindowProperties();
    const title = useContext(DataContext).sections.education;
    const { data, isPending, error } = useCollection("education");
    const { loaded, isReady } = useLoader();
    
    useEffect(() => {
        if (!isPending && data) {
            loaded("Education");
        }
    }, [isPending, data, loaded]);

    return isReady() && (
        <div className="xl:h-1/2 max-xl:pb-6 xl:flex">
            {/** Left side Japanese text */}
            {!isMobile() && 
                <div className="translate-x-5 translate-y-10">
                    <Sign
                        className={`bg-green-800 hover:bg-green-600 hover:shadow-green-600 hover:shadow-lg shadow`}
                        text="初心者歓迎" />
                </div>
            }

            {/** Building */}
            <div className="xl:flex-1">
                
                {/** Roof */}
                <div className="xl:bg-opacity-100 xl:pl-2 xl:trapezoid xl:w-[752px]">
                    <Heading className="xl:pl-8" level={2}>{title[language]}</Heading>
                </div>

                {/** Contents */}
                <div className="xl:bg-slate-800 xl:w-[752px] xl:h-[360px] xl:flex xl:flex-wrap xl:pl-8 xl:pb-8 xl:shadow xl:shadow-slate-800">
                    {data.map(d =>
                        <div key={d.id} className="pt-2 px-2">
                            <Heading level={3}>{d.degree[language]}</Heading>
                            {d.specialty && <Heading level={3}>{d.specialty[language]}</Heading>}
                            <p className="text-sm">{d.schoolName}</p>
                            <p className="text-sm">{d.years}</p>
                            <div className="flex flex-wrap">
                                {d.skills && d.skills.map((s, i) => <HoverableTag key={i} name={s} />)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Education;