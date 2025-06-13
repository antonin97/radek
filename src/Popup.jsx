import { useEffect, useState } from "react";

function Popup({ text, x, y, onDone }) {
    const [style, setStyle] = useState({
        position: "absolute",
        left: x,
        top: y,
        opacity: 1,
        background: "white",
        transition: "all 2s ease-out",
        pointerEvents: "none",
        fontSize: "24px",
        color: "black",
        fontWeight: "bold",
        borderRadius: "5px",
        transform: "translate(-50%, 0)",
        padding: "10px 20px",
    });

    useEffect(() => {
        setTimeout(() => {
            setStyle((prev) => ({
                ...prev,
                top: `${parseFloat(prev.top) - 100}px`,
                opacity: 0,
            }));
        }, 10);

        const timeout = setTimeout(onDone, 2000);
        return () => clearTimeout(timeout);
    }, [onDone]);

    return <div style={style}>{text}</div>;
}

export default Popup;
