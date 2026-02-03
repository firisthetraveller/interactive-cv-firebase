import useWindowDimensions from "../../Hooks/useWindowDimensions";

const ResizeSVG = ({ children, className, height, width, minWidth = 0 }) => {
    const { width: screenWidth } = useWindowDimensions();

    return (
        <>
            {screenWidth >= minWidth && <svg className={`absolute ${className}`} width={width} height={height} xmlns="http://www.w3.org/2000/svg">
                {children}
            </svg>}
        </>
    );
}

export default ResizeSVG;