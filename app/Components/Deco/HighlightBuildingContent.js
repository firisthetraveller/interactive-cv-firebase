import { HighlightBuildingFloor, HighlightEmptyFloor } from "./HighlightBuildingFloor";


const compareProjects = (p1, p2) => {
    if (p1.priority === p2.priority)
        return new Date(p1.date) < new Date(p2.date);
    return p1.priority < p2.priority;
}

export const HighlightBuildingEmpty = ({count = 4}) => {
    return (
        <>
            {[...Array(count).keys()].map(i => <HighlightEmptyFloor key={i}/>)}
        </>
    )
}

export const HighlightBuildingContent = ({projects, hoverStyle = ""}) => {
    return (
        <>
            {projects && projects.sort(compareProjects).map((p, i) => (
                <HighlightBuildingFloor key={i} project={p} hoverStyle={hoverStyle}/>
            ))}
        </>
    )
}