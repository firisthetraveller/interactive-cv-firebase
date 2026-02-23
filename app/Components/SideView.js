import React, { useContext, useEffect, useRef, useState } from "react";

import DataContext from "../Contexts/DataContext";

import useWindowProperties from "../Hooks/useWindowProperties";
import useCustomParallax from "../Hooks/useCustomParallax";

import Languages from "./Languages";
import Contacts from "./Contacts";
import Skills from "./Skills";
import Interests from "./Interests";
import Education from "./Education";
import Background from "./Deco/Background";

const BuildingScreen = React.lazy(() => import('./BuildingScreen'));

import { language } from "../Tools/lang";

const SideView = () => {
    const { isMobile, isVeryLargeDesktop } = useWindowProperties();

    const sideRef = useRef(null);
    const [parallaxSpeed, setParallaxSpeed] = useState(0.65);

    useEffect(() => {
        const leftSideRect = sideRef.current.getBoundingClientRect();
        const rightSideElement = document.getElementById("highlights-root");

        const highlightsRect = rightSideElement.getBoundingClientRect();
        const delta = highlightsRect.height - leftSideRect.height;
        const scrollMax = document.documentElement.scrollHeight - window.innerHeight;

        if (scrollMax <= 0 || delta <= 0) return;

        setParallaxSpeed(Math.max((delta / scrollMax) - 0.1, 0.8));
    }, []);

    const { style: leftStyle } = useCustomParallax(parallaxSpeed);
    const { style: buildingStyle } = useCustomParallax(0.07);

    const goToDesktopPls = useContext(DataContext).placeholders.goToDesktopPls[language];
    const maybeZoomALittleBit = useContext(DataContext).placeholders.maybeZoomALittleBit[language];;

    return (
        <div ref={sideRef} className="xl:h-full xl:pt-16" style={isMobile() ? {} : { ...leftStyle }}>
            <Background />
            {isMobile() && <p className="italic py-5">{goToDesktopPls}</p>}
            {isVeryLargeDesktop() && <p className="italic py-5">{maybeZoomALittleBit}</p>}
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

