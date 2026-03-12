import React, { useContext, useEffect, useRef, useState } from "react";

import DataContext from "../Contexts/DataContext";

import useWindowProperties from "../Hooks/useWindowProperties";
import useCustomParallax from "../Hooks/useCustomParallax";

import Languages from "./Languages";
import Contacts from "./Contacts";
import Skills from "./Skills";
import Interests from "./Interests";
import Education from "./Education";

const BuildingScreen = React.lazy(() => import('./BuildingScreen'));
const Background = React.lazy(() => import('./Deco/Background'));

import { language } from "../Tools/lang";

const SideView = () => {
    const { isMobile, isVeryLargeDesktop } = useWindowProperties();

    const [parallaxSpeed, setParallaxSpeed] = useState(0.65);

    const { style: leftStyle } = useCustomParallax(parallaxSpeed);
    const { style: buildingStyle } = useCustomParallax(0.07);

    const goToDesktopPls = useContext(DataContext).placeholders.goToDesktopPls[language];
    // const maybeZoomALittleBit = useContext(DataContext).placeholders.maybeZoomALittleBit[language];

    return (
        <div className="xl:h-full xl:pt-16" style={isMobile() ? {} : { ...leftStyle }}>
            {!isMobile() && <Background />}
            {isMobile() && <p className="italic py-5">{goToDesktopPls}</p>}
            {/* {isVeryLargeDesktop() && <p className="italic py-5">{maybeZoomALittleBit}</p>} */}
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

