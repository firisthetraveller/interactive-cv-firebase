import { createContext, useReducer } from "react";

export const LightContext = createContext(null);

const permanentLights = ["Mentoring", "Active listening", "Code review", "Empathy", "Problem solving", "Self-learning"];

export const LightProvider = ({children}) => {
    const [lights, dispatch] = useReducer(lightReducer, ["React", "Firebase", "Tailwind", "Next.JS", "D3"]);

    const toggleLight = (name) => {
        dispatch({
            type: 'TOGGLE_LIGHT',
            name
        });
    }

    const isActiveLight = (name) => {
        return lights.includes(name);
    }

     const isPermanentLight = (name) => {
        return permanentLights.includes(name);
    }

    return (
        <LightContext.Provider value={{...lights, toggleLight, isActiveLight, isPermanentLight}}>
            {children}
        </LightContext.Provider>
    )
}

function lightReducer (lights, action) {
    switch (action.type) {
        case 'TOGGLE_LIGHT':
            if (lights.includes(action.name)) {
                return lights.filter(l => l !== action.name);
            }
            return [...lights, action.name];
        default: throw new Error(`No such action type for LightProvider: ${action.type}`);
    }
}