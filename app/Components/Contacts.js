import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconContext from "../Contexts/IconContext";

import Heading from "./Base/Heading";
import { useContext, useEffect } from "react";
import DataContext from "../Contexts/DataContext";
import { language } from "../Tools/lang";
import useCollection from "../Hooks/useCollection";
import useLoader from "../Hooks/useLoader";

const Contacts = () => {
    const { data, isPending, error } = useCollection("personal");
    const { loaded, isReady } = useLoader();

    const role = useContext(DataContext).sections.role[language];
    const icons = useContext(IconContext);

    useEffect(() => {
        if (!isPending && data) {
            loaded("Contacts");
        }
    }, [isPending, data, loaded]);

    return isReady() && (
        <div className="my-2 xl:pl-8 xl:flex">
            <div className="xl:pr-4">
                <Heading level={2}>Guy Luong</Heading>
                <Heading level={3}>{role}</Heading>
            </div>
            <div className="max-lg:pl-4 my-2 xl:px-4 xl:flex-1">
                {data.map((d, i) => <div className="flex items-center" key={i}>
                    <FontAwesomeIcon className="mr-2" icon={icons[d.label]} />
                    {d.value && <p>{d.value}</p>}
                    {d.link && <a href={`https://${d.link}`} target="_blank" rel="noreferrer">{d.link} <FontAwesomeIcon icon={icons.externalLink} /></a>}
                </div>)}
            </div>
        </div>)
}

export default Contacts;