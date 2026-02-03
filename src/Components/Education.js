import useWindowDimensions from "../Hooks/useWindowProperties.js";
import Heading from "./Base/Heading";
import HoverableTag from "./Base/HoverableTag.js";
import Sign from "./Deco/Sign.js";
import { language } from "../Tools/lang.js";
import useCollection from "../Hooks/useCollection.js";
import { useContext, useEffect } from "react";
import DataContext from "../Contexts/DataContext.js";
import useLoader from "../Hooks/useLoader.js";

const Education = () => {
    const { isMobile } = useWindowDimensions();
    const title = useContext(DataContext).sections.education;
    const { data, isPending, error } = useCollection("education");
    const { loaded, isReady } = useLoader();
    
    useEffect(() => {
        if (!isPending && data) {
            loaded("Education");
        }
    }, [isPending, data, loaded]);

    return isReady() && (
        <div className="xl:tw-h-1/2 max-xl:tw-pb-6 xl:tw-flex">
            {/** Left side Japanese text */}
            {!isMobile() && 
                <div className="tw-translate-x-5 tw-translate-y-10">
                    <Sign
                        className={`tw-bg-green-800 hover:tw-bg-green-600 hover:tw-shadow-green-600 hover:tw-shadow-lg tw-shadow`}
                        text="初心者歓迎" />
                </div>
            }

            {/** Building */}
            <div className="xl:tw-flex-1">
                
                {/** Roof */}
                <div className="xl:tw-bg-opacity-100 xl:tw-pl-2 xl:trapezoid xl:tw-w-[752px]">
                    <Heading className="xl:tw-pl-8" level={2}>{title[language]}</Heading>
                </div>

                {/** Contents */}
                <div className="xl:tw-bg-slate-800 xl:tw-w-[752px] xl:tw-h-[360px] xl:tw-flex xl:tw-flex-wrap xl:tw-pl-8 xl:tw-pb-8 xl:tw-shadow xl:tw-shadow-slate-800">
                    {data && data.map(d =>
                        <div key={d.id} className="tw-pt-2 tw-px-2">
                            <Heading level={3}>{d.degree[language]}</Heading>
                            {d.specialty && <Heading level={3}>{d.specialty[language]}</Heading>}
                            <p className="tw-text-sm">{d.schoolName}</p>
                            <p className="tw-text-sm">{d.years}</p>
                            <div className="tw-flex tw-flex-wrap">
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