import { createContext } from "react";

import { faArrowUpRightFromSquare, faEnvelope, faGamepad, faLocationDot, faPaintBrush, faPersonRunning, faPhoneVolume, faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

const IconContext = createContext({
    externalLink: faArrowUpRightFromSquare,
    mail: faEnvelope,
    location: faLocationDot,
    phone: faPhoneVolume,
    github: faGithub,
    linkedin: faLinkedinIn,
    Running: faPersonRunning,
    Travel: faPlaneDeparture,
    Draw: faPaintBrush,
    Play: faGamepad
});
 
export default IconContext;