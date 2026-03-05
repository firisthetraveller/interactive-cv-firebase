import { LightProvider } from "./Contexts/LightContext";
import { TheaterProvider } from "./Contexts/TheaterContext";

import Highlights from "./Components/Highlights";
import SideView from "./Components/SideView";
import StarrySky from "./Components/Deco/StarrySky";


const Content = () => {
    return (
        <div className="xl:flex relative xl:h-full z-10">
            <SideView />
            <Highlights />
        </div>
    )
}

const InteractiveCV = () => {
    return (
        <>
            <div className="px-8 2xl:px-16">
                <StarrySky />
            </div>

            <div className="px-8 2xl:px-16 pt-8 bg-linear-to-b from-slate-900 from-50% via-teal-700 via-85% to-cyan-400">
                <LightProvider>
                    <TheaterProvider>
                        <Content />
                    </TheaterProvider>
                </LightProvider>
            </div>
        </>
    );
}

export default InteractiveCV;