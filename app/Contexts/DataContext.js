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
        experiences: {
            "fr": "Expériences",
            "en": "Experiences"
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
            "fr": "Développer web fullstack",
            "en": "Fullstack Web Developer"
        }
    },
    placeholders: {
        interestInfo: {
            "en": "Hover an icon above to show more info!",
            "fr": "Survolez une icône pour en savoir plus!"
        },
        goToDesktopPls: {
            "en": "Switch to desktop for a completely different viewing experience!",
            "fr": "Passez sur grand écran pour un visionnage complètement différent !"
        },
        maybeZoomALittleBit: {
            "en": "The website is currently a work in progress. Very large screens are not yet supported. Zoom a little bit to see how it is supposed to look like! (Ctrl + '+')",
            "fr": "Le site est en cours de construction, et les écrans très larges ne sont pas encore supportés. Vous pouvez voir à quoi c'est censé ressembler en zoomant! (Ctrl + '+')"
        }
    },
    tags: {
        ["Active Listening"]: {
            "en": "Active Listening",
            "fr": "Écoute Active"
        },
    }
});

export default DataContext;