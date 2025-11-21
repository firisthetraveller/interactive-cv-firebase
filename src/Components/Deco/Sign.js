const Sign = ({ className, text, large = false }) => {
    return (
        <div className={`${className} tw-flex tw-tracking-wider tw-z-20 tw-flex-col ${large ? "tw-text-xl tw-p-2" : "tw-text-lg tw-p-[6px]"}  tw-items-center tw-font-bold tw-shadow-slate-700 tw-text-yellow-100 text-shadow-light tw-rounded`}>
            {text.split('').map((e, i) => <div key={i}>{e}</div>)}
        </div>
    )
}

export default Sign;