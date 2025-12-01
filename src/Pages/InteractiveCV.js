import { useContext, useEffect } from "react";

import { LightProvider } from "../Contexts/LightContext";

import Languages from "../Components/Languages";
import Contacts from "../Components/Contacts";
import Skills from "../Components/Skills";
import Interests from "../Components/Interests";
import Highlights from "../Components/Highlights";
import Education from "../Components/Education";
import StarrySky from "../Components/Deco/StarrySky";
import Background from "../Components/Deco/Background";
import useWindowDimensions from "../Hooks/useWindowDimensions";
import BuildingScreen from "../Components/BuildingScreen";
import { TheaterProvider } from "../Contexts/TheaterContext";
import useCustomParallax from "../Hooks/useCustomParallax";
import { LoadProvider } from "../Contexts/LoadContext";
import DataContext from "../Contexts/DataContext";
import { language } from "../Tools/lang";

const SideView = () => {
    const { isMobile } = useWindowDimensions();

    const { style: leftStyle } = useCustomParallax(0.55);
    const { style: buildingStyle } = useCustomParallax(0.1);

    const goToDesktopPls = useContext(DataContext).placeholders.goToDesktopPls[language];

    return (
        <div className="xl:tw-h-full xl:tw-pt-16" style={isMobile() ? {} : { ...leftStyle }}>
            <Background />
            {isMobile() && <p className="tw-italic tw-py-5">{goToDesktopPls}</p>}
            <Contacts />
            <Skills />
            <div className="tw-flex tw-space-x-24">
                <Languages />
                {!isMobile() && <BuildingScreen style={isMobile() ? {} : { ...buildingStyle }} />}
            </div>
            <Interests />
            <Education />
        </div>
    );
}

const InteractiveCV = () => {
    useEffect(() => {
        const backToTop = () => {
            if (window.innerWidth >= 1280) {
                window.scrollTo(0, 0);
            }
        };

        window.addEventListener('resize', backToTop);

        return () => window.removeEventListener('resize', backToTop);
    })

    return (
        <>
            <div className="tw-px-8 2xl:tw-px-16">
                <StarrySky />
            </div>

            <div className="tw-px-8 2xl:tw-px-16 tw-pt-8 tw-bg-gradient-to-b tw-from-slate-900 tw-from-50% tw-via-teal-700 tw-via-85% tw-to-cyan-400">
                <LightProvider>
                    <TheaterProvider>
                        <LoadProvider>
                            <div className="xl:tw-flex tw-relative xl:tw-h-full tw-z-10">
                                <SideView />
                                <Highlights />
                            </div>
                        </LoadProvider>
                    </TheaterProvider>
                </LightProvider>
            </div>
        </>
    );
}

export default InteractiveCV;