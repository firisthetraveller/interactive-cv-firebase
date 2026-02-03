import { useContext, useEffect } from "react";

import { LightProvider } from "../Contexts/LightContext";
import { TheaterProvider } from "../Contexts/TheaterContext";
import { LoadProvider } from "../Contexts/LoadContext";
import DataContext from "../Contexts/DataContext";

import useWindowDimensions from "../Hooks/useWindowDimensions";
import useCustomParallax from "../Hooks/useCustomParallax";

import Languages from "../Components/Languages";
import Contacts from "../Components/Contacts";
import Skills from "../Components/Skills";
import Interests from "../Components/Interests";
import Highlights from "../Components/Highlights";
import Education from "../Components/Education";
import StarrySky from "../Components/Deco/StarrySky";
import Background from "../Components/Deco/Background";
import BuildingScreen from "../Components/BuildingScreen";

import { language } from "../Tools/lang";

const SideView = () => {
    const { isMobile } = useWindowDimensions();

    const { style: leftStyle } = useCustomParallax(0.55);
    const { style: buildingStyle } = useCustomParallax(0.1);

    const goToDesktopPls = useContext(DataContext).placeholders.goToDesktopPls[language];

    return (
        <div className="xl:h-full xl:pt-16" style={isMobile() ? {} : { ...leftStyle }}>
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
            <div className="px-8 2xl:px-16">
                <StarrySky />
            </div>

            <div className="px-8 2xl:px-16 pt-8 bg-gradient-to-b from-slate-900 from-50% via-teal-700 via-85% to-cyan-400">
                <LightProvider>
                    <TheaterProvider>
                        <LoadProvider>
                            <div className="xl:flex relative xl:h-full z-10">
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