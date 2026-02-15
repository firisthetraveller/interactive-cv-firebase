import { motion } from 'framer-motion';

const clamp = (v, min, max) => {
    return Math.max(Math.min(max, v), min);
}

const Smoke = () => {
    const [sourceX, sourceY] = [650, 528];

    return (
        <>
            {
                Array.from({ length: 5 }, (e, i) => i).map(i =>
                    <motion.circle
                        key={i}
                        initial={{ cx: sourceX, cy: sourceY, r: 3, fillOpacity: 1 }}
                        animate={{ cx: sourceX + clamp(Math.random() * 100, 50, 150), cy: sourceY * 2 / 3 - clamp(Math.random() * 340, 100, 170), r: 15, fillOpacity: 0 }}
                        transition={{ duration: 3 + clamp(Math.floor(Math.random() * 5), 2, 4), repeat: Infinity, ease: "easeOut", delay: Math.random() }}
                        fill="gray"
                    />
                )
            }
        </>
    );
}

export default Smoke;