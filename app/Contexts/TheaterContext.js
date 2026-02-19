import { createContext, useReducer } from "react";

export const TheaterContext = createContext(null);

export const TheaterProvider = ({children}) => {
    const [state, dispatch] = useReducer(theaterReducer, null);

    /**
     * Switch the current theater image to the one linked in the URL.
     * @param {string} url 
     * @param {string?} color 
     */
    const switchMovie = (url, color = null) => {
        // console.log(`Called switch: ${url} ${color}`)
        dispatch({type: "switch", url, color});
    }

    /**
     * Remove the set image in the theater.
     */
    const clearTheater = () => {
        // console.log("Called clear.")
        dispatch({type: "clear"});
    }

    return (
        <TheaterContext.Provider value={{...state, switchMovie, clearTheater}}>
            {children}
        </TheaterContext.Provider>
    )
}

const theaterReducer = (state, action) => {
    switch (action.type) {
        case "switch": return action;
        case "clear": return null;
        default: throw new Error("No such action for Theater.");
    }
}