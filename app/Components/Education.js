import { useContext } from "react";

import useWindowProperties from "../Hooks/useWindowProperties.js";
import useCollection from "../Hooks/useCollection.js";
import DataContext from "../Contexts/DataContext.js";

import Heading from "./Base/Heading.js";
import HoverableTag from "./Base/HoverableTag.js";
import Sign from "./Deco/Sign.js";

import { language } from "../Tools/lang.js";

const EducationEmpty = () => {
    return (
        <>
            {[...Array(3).keys()].map(i =>
                <div className="flex flex-col pt-2 gap-1 px-2" key={i}>
                    {/** Title */}
                    <Heading level={3} className="skeleton min-w-50 min-h-5"/>
                    {/** Specialty */}
                    <Heading level={3} className="skeleton min-w-50 min-h-5"/>

                    {/** Description */}
                    <p className="text-sm skeleton min-w-1/3 min-h-4"/>
                    <p className="text-sm skeleton min-w-1/3 min-h-4"/>

                    <div className="flex flex-wrap gap-x-2">
                        {[...Array(3).keys()].map(j => <div className="min-w-1/4 min-h-5 p-1 skeleton" key={j}/>)}
                    </div>
                </div>
            )}
        </>
    );
}

const EducationApt = ({ data }) => {
    return (
        <div className="pt-2 px-2">
            <Heading level={3}>{data.degree[language]}</Heading>
            {data.specialty && <Heading level={3}>{data.specialty[language]}</Heading>}
            <p className="text-sm">{data.schoolName}</p>
            <p className="text-sm">{data.years}</p>
            <div className="flex flex-wrap">
                {data.skills && data.skills.map((s, i) => <HoverableTag key={i} name={s} />)}
            </div>
        </div>
    )
}

const Education = () => {
    const { isMobile } = useWindowProperties();
    const title = useContext(DataContext).sections.education;
    const { data: schools, isPending, error } = useCollection("education");

    return (<div className="xl:h-1/2 max-xl:pb-6 xl:flex">
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
            <div className="xl:pl-2 xl:trapezoid xl:w-188">
                <Heading className="xl:pl-8" level={2}>{title[language]}</Heading>
            </div>

            {/** Contents */}
            <div className="xl:bg-slate-800 xl:w-188 xl:h-45 xl:flex xl:flex-wrap xl:pl-8 xl:pb-8 xl:shadow xl:shadow-slate-800">
                {/* <EducationEmpty /> */}
            
                {!schools
                    ? <EducationEmpty />
                    : schools.map(d =>
                        <EducationApt data={d} key={d.id} />
                    )
                }
            </div>
        </div>
    </div>);
}

export default Education;