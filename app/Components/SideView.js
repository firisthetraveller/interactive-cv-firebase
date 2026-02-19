import { useContext, useEffect, useRef, useState } from "react";

import DataContext from "../Contexts/DataContext";

import useWindowProperties from "../Hooks/useWindowProperties";
import useCustomParallax from "../Hooks/useCustomParallax";

import Languages from "./Languages";
import Contacts from "./Contacts";
import Skills from "./Skills";
import Interests from "./Interests";
import Education from "./Education";
import Background from "./Deco/Background";
import BuildingScreen from "./BuildingScreen";

import { language } from "../Tools/lang";

const SideView = () => {
    const { isMobile } = useWindowProperties();

    const sideRef = useRef(null);
    const [parallaxSpeed, setParallaxSpeed] = useState(0.3);

    const ready = isReady();

    useEffect(() => {
        const leftSideRect = sideRef.current.getBoundingClientRect();
        const rightSideElement = document.getElementById("highlights-root");

        const highlightsRect = rightSideElement.getBoundingClientRect();
        const delta = highlightsRect.height - leftSideRect.height;
        const scrollMax = document.documentElement.scrollHeight - window.innerHeight;

        if (scrollMax <= 0 || delta <= 0) return;

        const speed = delta / scrollMax;
        const clampedSpeed = Math.min(Math.max(speed, 0.05), 0.6);

        setParallaxSpeed(clampedSpeed);
    }, [ready]);

    const { style: leftStyle } = useCustomParallax(parallaxSpeed);
    const { style: buildingStyle } = useCustomParallax(0.1);

    const goToDesktopPls = useContext(DataContext).placeholders.goToDesktopPls[language];

    return (
        <div ref={sideRef} className="xl:h-full xl:pt-16" style={isMobile() ? {} : { ...leftStyle }}>
            <Background />
            {isMobile() && <p className="italic py-5">{goToDesktopPls}</p>}
            <Contacts />
            <Skills />
            <div className="flex space-x-24">
                <Languages />
                {!isMobile() && <BuildingScreen style={isMobile() ? {} : { ...buildingStyle }} />}
            </div>
            <Interests />
            <Education />
        </div>
    );
}

export default SideView;

