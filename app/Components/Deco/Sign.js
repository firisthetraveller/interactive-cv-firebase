const Sign = ({ className, text, large = false }) => {
    return (
        <div className={`${className} flex tracking-wider z-20 flex-col ${large ? "text-xl p-2" : "text-lg p-[6px]"}  items-center font-bold shadow-slate-700 text-yellow-100 text-shadow-light rounded`}>
            {text.split('').map((e, i) => <div key={i}>{e}</div>)}
        </div>
    )
}

export default Sign;