import useWindowProperties from './useWindowProperties';

const useCustomParallax = (speed, bgImage = null) => {
    const { scrollY } = useWindowProperties();

    return bgImage
        ? {
            style: {
                backgroundImage: `url(${bgImage})`,
                transform: `translateY(${scrollY * speed}px)`,
            },
        }
        : {
            style: {
                transform: `translateY(${scrollY * speed}px)`,
            },
        };
};

export default useCustomParallax;
