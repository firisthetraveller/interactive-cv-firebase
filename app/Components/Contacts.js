import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconContext from "../Contexts/IconContext";

import Heading from "./Base/Heading";
import { useContext } from "react";
import DataContext from "../Contexts/DataContext";
import { language } from "../Tools/lang";
import useCollection from "../Hooks/useCollection";

const ContactsEmpty = () => {
    return (
        <>
            {[...Array(5).keys()].map(i => <div className="flex items-center gap-x-2" key={i}>
                <div className="skeleton-circle size-6" />
                <p className="skeleton w-60 h-4" />
            </div>)}
        </>
    )
}

const Contacts = () => {
    const { data: contacts, isPending, error } = useCollection("personal");

    const role = useContext(DataContext).sections.role[language];
    const icons = useContext(IconContext);

    return (
        <div className="my-2 xl:pl-8 xl:flex">
            <div className="xl:pr-4">
                <Heading level={2}>Guy Luong</Heading>
                <Heading level={3}>{role}</Heading>
            </div>
            <div className="max-lg:pl-4 my-2 xl:px-4 xl:flex-1 flex flex-col gap-y-1">
                {/* <ContactsEmpty /> */}
                {contacts
                    ? contacts.map((d, i) => <div className="flex items-center gap-x-2" key={i}>
                        <FontAwesomeIcon icon={icons[d.label]} />
                        {d.value && <p>{d.value}</p>}
                        {d.link && <a href={`https://${d.link}`} target="_blank" rel="noreferrer">{d.link} <FontAwesomeIcon icon={icons.externalLink} /></a>}
                    </div>)
                    : <ContactsEmpty />}
            </div>
        </div>
    )
}

export default Contacts;