const commonStyle = "heading"

const Heading = ({ level, className, children }) => {
    switch (level) {
        case 1: return <h1 className={`${commonStyle} ${className} tw-font-bold tw-text-xl tw-my-2`}>{children}</h1>;
        case 2: return <h2 className={`${commonStyle} ${className} tw-font-semibold tw-text-lg tw-my-1`}>{children}</h2>;
        case 3: return <h3 className={`${commonStyle} ${className} tw-font-semibold tw-text-base`}>{children}</h3>;
        default: return <p>{children}</p>
    }
}

export default Heading;