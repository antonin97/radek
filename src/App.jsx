import { useEffect, useState } from "react";
import Popup from "./Popup";
import "./App.css";

function App() {
    const [timeLeft, setTimeLeft] = useState("");
    const [popups, setPopups] = useState([]);

    const nadavky = [
      "KOKOT",
      "HOVNO",
      "DEBIL",
      "BLBEC",
      "IDIOT",
      "PÍČA",
      "MRDKA",
      "ZMRD"
    ]

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const pragueTime = new Date(
                now.toLocaleString("en-US", { timeZone: "Europe/Prague" })
            );
            const target = new Date(pragueTime);
            target.setHours(16, 33, 0, 0);

            const diff = target - pragueTime;

            if (diff <= 0) {
                setTimeLeft("Willkommen!!!");
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleClick = (e) => {
        const id = Math.random().toString(36).substr(2, 9);
        const x = `${e.clientX}px`;
        const y = `${e.clientY}px`;

        setPopups((prev) => [
            ...prev,
            {
                id,
                x,
                y,
                text: nadavky[Math.floor(Math.random() * nadavky.length)],
            },
        ]);
    };

    const removePopup = (id) => {
        setPopups((prev) => prev.filter((p) => p.id !== id));
    };

    return (
        <div
            onClick={handleClick}
            style={{
                position: "relative",
                height: "100vh",
                overflow: "hidden",
                cursor: "pointer",
            }}
        >
            <h1>Kolik času ti ještě zbývá?</h1>
            <h2>{timeLeft}</h2>

            <div className="darecek">
                <img src="./public/db.png" alt="db" />
            </div>

            {popups.map((p) => (
                <Popup
                    key={p.id}
                    x={p.x}
                    y={p.y}
                    text={p.text}
                    onDone={() => removePopup(p.id)}
                />
            ))}
            <p>Od Toníka pro Ráďu s 🩷</p>
        </div>
    );
}

export default App;
