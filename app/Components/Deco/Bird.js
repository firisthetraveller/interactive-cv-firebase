const Bird = ({ position }) => {
    return (
        <>
            <circle cx={position.x} cy={position.y} r={6} fill="black" />
            <circle cx={position.x + 1} cy={position.y - 6} r={3} fill="black" />
            <circle className="bird-beak" cx={position.x + 4} r={1} cy={position.y - 5} fill="gray" />
        </>
    );
}

export default Bird;