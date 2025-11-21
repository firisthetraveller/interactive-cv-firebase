import { useContext } from "react";
import { LoadContext } from "../Contexts/LoadContext";

const useLoader = () => {
    const context = useContext(LoadContext);

    if (!context) {
        throw new Error("useLoader should be used in a LoadProvider tag.");
    }

    return context;
}
 
export default useLoader;