import useWindowProperties from './useWindowProperties';

const useCustomParallax = (speed, bgImage = null) => {
    const { scrollY } = useWindowProperties();
    const style = ({ transform: `translateY(${scrollY * speed}px)` });

    return bgImage
        ? { style: { ...style, backgroundImage: `url(${bgImage})` } }
        : { style };
};

export default useCustomParallax;
