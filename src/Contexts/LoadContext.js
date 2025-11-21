import { createContext, useEffect, useReducer } from "react";

export const LoadContext = createContext(null);

export const LoadProvider = ({ children }) => {
    const [state, dispatch] = useReducer(loadReducer, new Set());

    const loaded = (value) => {
        dispatch({ type: "added", value });
    }

    const isReady = () => {
        // Contacts, Education, Highlights, Interests, Skills
        return state.size === 5;
    }

    useEffect(() => {
        console.log(state);
    }, [state]);

    return <LoadContext.Provider value={{ ...state, loaded, isReady }}>
        {children}
    </LoadContext.Provider>
}

const loadReducer = (state, action) => {
    switch (action.type) {
        case "added": return new Set([...state, action.value]);
        default: throw new Error(`LoadReducer > This action doesn't exist: ${action.type}`)
    }
}