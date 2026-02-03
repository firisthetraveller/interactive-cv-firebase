import useWindowDimensions from "../../Hooks/useWindowProperties";
import ResizeSVG from "../Base/ResizeSVG";

const stars = Array.from({ length: 30 }, () => {
    return {
        x: Math.floor(Math.random() * window.innerWidth * 0.9),
        y: Math.floor(Math.random() * window.innerHeight * 0.7),
        radius: Math.floor(Math.random() * 4)
    }
});

export default function StarrySky () {
    const {width, height} = useWindowDimensions();

    return (
        <ResizeSVG className={"tw-z-0"} width={width * 0.9} height={height * 0.7}>
            {/* Stars */}
            <defs>
                <filter id="blur">
                    <feGaussianBlur stdDeviation="0.5" />
                </filter>
            </defs>
            {stars.map((s, i) => <circle key={i} r={s.radius} cx={s.x} cy={s.y} fill={s.radius >= 3 ? "#a5f3fc" : "white"} filter="url(#blur)" fillOpacity={1 - (s.y / (window.innerHeight * 0.8))} />)}

            {/* Moon */}
        </ResizeSVG>
    );
}