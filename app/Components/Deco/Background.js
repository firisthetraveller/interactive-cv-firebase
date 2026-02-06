import ResizeSVG from "../Base/ResizeSVG";
import useLoader from '../../Hooks/useLoader';
import Smoke from './Smoke';
import Bird from "./Bird";

export default function Background() {
    const { isReady } = useLoader();

    return isReady() && (
        <ResizeSVG className="-z-10 pl-8 translate-y-2" height={700} width={800} minWidth={1280}>
            <g>
                {/** Bird */}
                <Bird position={{ x: 680, y: 139 }} />

                {/** First vertical bar */}
                <line x1={50} y1={144} x2={50} y2={700} stroke="black" strokeWidth={15} />
                <line x1={55} y1={144} x2={55} y2={145} stroke="lightgray" strokeWidth={3} />

                {/** Second vertical bar */}
                <line x1={245} y1={244} x2={245} y2={700} stroke="black" strokeWidth={15} />
                <line x1={248} y1={244} x2={248} y2={245} stroke="lightgray" strokeWidth={7} />

                {/** Third vertical bar */}
                <line x1={680} y1={144} x2={680} y2={700} stroke="black" strokeWidth={15} />
                <line x1={683} y1={144} x2={683} y2={145} stroke="lightgray" strokeWidth={7} />

                {/** Small vertical bar */}
                <line x1={490} y1={484} x2={490} y2={700} stroke="black" strokeWidth={15} />
                <line x1={493} y1={484} x2={493} y2={485} stroke="lightgray" strokeWidth={7} />

                {/** Chimney */}
                <line x1={650} y1={534} x2={650} y2={700} stroke="#54647b" strokeWidth={10} />
                <line x1={650} y1={524} x2={650} y2={528} stroke="#54647b" strokeWidth={10} />
                <line x1={646} y1={528} x2={646} y2={534} stroke="#54647b" strokeWidth={2} />
                <line x1={654} y1={528} x2={654} y2={534} stroke="#54647b" strokeWidth={2} />

                {/** Smoke */}
                {/* <path id="smokeCurve" d={"M 650 350 Q 680 50 750 0"} fill="none" stroke="lightgray" strokeWidth="2" /> */}
                <Smoke />
            </g>
        </ResizeSVG>
    )
}