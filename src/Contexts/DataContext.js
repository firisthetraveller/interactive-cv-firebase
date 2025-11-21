import { createContext } from "react";

const DataContext = createContext({
    sections: {
        interests: {
            "fr": "Intérêts",
            "en": "Interests"
        },
        education: {
            "fr": "Éducation",
            "en": "Education"
        },
        highlights: {
            "fr": "Projets",
            "en": "Projects"
        },
        skills: {
            "fr": "Compétences",
            "en": "Skills"
        },
        languages: {
            "fr": "Langues",
            "en": "Languages"
        },
        role: {
            "fr": "Développeur front-end",
            "en": "Frontend Web Developer"
        }
    }
});

export default DataContext;