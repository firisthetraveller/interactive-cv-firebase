import ResizeSVG from "../Base/ResizeSVG";

import BackgroundSVG from "../../../public/assets/deco/poles.svg";

import Smoke from './Smoke';
import Bird from "./Bird";
import Image from "next/image";

const Background = () => {
    return (
        <>
            <Image src={BackgroundSVG} className="-z-10 absolute w-200 h-175"
                alt={"Desktop background"} loading="eager"/>

            <ResizeSVG className="-z-10 absolute" height={700} width={800} minWidth={1280}>
                {/** Dynamic smoke */}
                <Smoke sourceX={650} sourceY={528} />
            </ResizeSVG>
        </>
    )
};

export default Background;