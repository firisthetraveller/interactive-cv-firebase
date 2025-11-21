import { useState, useEffect } from 'react';

const useCustomParallax = (speed, bgImage = null) => {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setOffset(window.scrollY * speed);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [offset, speed]);

    return bgImage
        ? {
            style: {
                backgroundImage: `url(${bgImage})`,
                transform: `translateY(${offset}px)`,
            },
        }
        : {
            style: {
                transform: `translateY(${offset}px)`,
            },
        };
};

export default useCustomParallax;
