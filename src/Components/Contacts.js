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
        <div className="tw-my-2 xl:tw-pl-8 xl:tw-flex">
            <div className="xl:tw-pr-4">
                <Heading level={2}>Guy Luong</Heading>
                <Heading level={3}>{role}</Heading>
            </div>
            <div className="max-lg:tw-pl-4 tw-my-2 xl:tw-px-4 xl:tw-flex-1">
                {data.map((d, i) => <div className="tw-flex tw-items-center" key={i}>
                    <FontAwesomeIcon className="tw-mr-2" icon={icons[d.label]} />
                    {d.value && <p>{d.value}</p>}
                    {d.link && <a href={`https://${d.link}`} target="_blank" rel="noreferrer">{d.link} <FontAwesomeIcon icon={icons.externalLink} /></a>}
                </div>)}
            </div>
        </div>)
}

export default Contacts;