import { createContext, useReducer } from "react";

export const LightContext = createContext(null);

export const LightProvider = ({children}) => {
    const [lights, dispatch] = useReducer(lightReducer, ["React", "Firebase", "Tailwind"]);

    const toggleLight = (name) => {
        dispatch({
            type: 'TOGGLE_LIGHT',
            name
        });
    }

    const isActiveLight = (name) => {
        return lights.includes(name);
    }

    return (
        <LightContext.Provider value={{...lights, toggleLight, isActiveLight}}>
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