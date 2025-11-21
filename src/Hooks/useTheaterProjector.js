import { useContext } from "react";
import { TheaterContext } from "../Contexts/TheaterContext";

const useTheaterProjector = () => {
    const context = useContext(TheaterContext);

    if (context === null) {
        throw new Error("useTheaterProjector should be used inside a TheaterProvider.");
    }

    return context;
}
 
export default useTheaterProjector;