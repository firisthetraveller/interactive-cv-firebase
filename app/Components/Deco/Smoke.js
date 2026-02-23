import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const clamp = (v, min, max) => {
    return Math.max(Math.min(max, v), min);
}

const growMove = keyframes`
    0% {
        transform: translate(0, 0) scale(1);
        opacity: 1;
    }
    100% {
        transform: translate(var(--dx), var(--dy)) scale(8);
        opacity: 0;
    }
`;

const Circle = styled.circle`
    fill: gray;
    transform-origin: center;
    transform-box: fill-box;
    animation: ${growMove} ${({ $duration }) => $duration}s ease-out infinite;
    animation-delay: ${({ $delay }) => $delay}s;
`;

const Smoke = React.memo(({sourceX, sourceY}) => {
    const [ends] = useState(() =>
        [...Array(5).keys()].map(() => ({
            x: sourceX + clamp(Math.random() * 100, 0, 100),
            y: sourceY * 2 / 3 - clamp(Math.random() * 340, 0, 170),
            duration: (3 + clamp(Math.floor(Math.random() * 5), 2, 4)),
            delay: Math.random(),
        }))
    );

    console.log({ends});

    return (
        <>
            {
                ends.map((end, i) =>
                    <Circle key={i}
                        cx={sourceX}
                        cy={sourceY}
                        r={3}
                        $duration={end.duration}
                        $delay={end.delay}
                        style={{
                            "--dx": `${Math.floor(end.x) - sourceX}px`,
                            "--dy": `${Math.floor(end.y) - sourceY}px`
                        }}
                    />
                )
            }
        </>
    );
});

export default Smoke;