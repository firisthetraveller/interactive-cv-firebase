import { motion } from 'framer-motion';

import ResizeSVG from "../Base/ResizeSVG";
import useLoader from '../../Hooks/useLoader';
import Smoke from './Smoke';

const Bird = ({ position }) => {
    return (
        <>
            <circle cx={position.x} cy={position.y} r={6} fill="black" />
            <circle cx={position.x + 1} cy={position.y - 6} r={3} fill="black" />
            <motion.circle initial={{ cx: position.x + 4 }} animate={{ cx: position.x + 2 }} r={1} cy={position.y - 5} transition={{ delay: Math.random() * 20, duration: 0.8, ease: "easeIn", repeatDelay: Math.random() * 20, repeat: Infinity }} fill="gray" />
        </>
    );
}

export default function Background() {
    const { isReady } = useLoader();

    return isReady() && (
        <ResizeSVG className="-tw-z-10 tw-pl-8 tw-translate-y-2" height={700} width={800} minWidth={1280}>
            <g>
                {/** First horizontal bar */}
                <line x1={-100} y1={191} x2={800} y2={191} stroke="black" strokeWidth={4} />
                <line x1={630} y1={189} x2={680} y2={189} stroke="lightgray" strokeWidth={1} />

                {/** Birds */}
                <Bird position={{ x: 586, y: 185 }} />
                <Bird position={{ x: 570, y: 185 }} />
                <Bird position={{ x: 680, y: 139 }} />

                {/** Second horizontal bar */}
                <line x1={-100} y1={208} x2={800} y2={208} stroke="black" strokeWidth={4} />
                <line x1={610} y1={206} x2={660} y2={206} stroke="lightgray" strokeWidth={1} />

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