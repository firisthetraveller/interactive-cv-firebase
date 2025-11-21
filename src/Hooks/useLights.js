import { useContext } from "react";
import { LightContext } from "../Contexts/LightContext";

const useLights = () => {
    const context = useContext(LightContext);

    if (context === null) {
        throw new Error("useLights should be used inside a LightProvider.");
    }

    return context;
}

export default useLights;