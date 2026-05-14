import { useState } from "react";
import Timer from "../components/Timer";

export default function SupportPage() {
    const [pos, setPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const [clickCounter, setClickCounter] = useState(0);

    const moveButton = () => {
        setTimeout(() => {
            setPos({
                x: Math.random() * (window.innerWidth - 100),
                y: Math.random() * (window.innerHeight - 100),
            });
        }, 130);
    };
    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }
    const clickButton = () => {
        switch (clickCounter) {
            case 0:
                alert("Are you sure you want to stop the timer?");
                setClickCounter(1);
                break;
            case 1:
                alert("Like, reallyyyy sure?");
                setClickCounter(2);
                break;
            case 2:
                alert("What if there are puppies on the line? Huh? HUH?");
                setClickCounter(3);
                break;
            case 3:
                alert("Not even for puppies? Wow. Just... wow.");
                setClickCounter(4);
                break;
            case 4:
                alert("I really dont feel like stopping it.");
                setClickCounter(5);
                break;
            case 5:
                alert("No");
                setClickCounter(6);
                break;
            default:
                if (getRandomInt(2) === 0) {
                    alert("Im not doing it")
                } else if (getRandomInt(2) === 1) {
                    alert("Nope, not gonna stop it");
                }
                else {
                    alert("Stop");
                }
        }
    };
    return (
        <div>
            <Timer />
            <h1>Support</h1>

            <p>Did you click the button? EVEN THOUGH WE WARNED YOU NOT TO???</p>
            <p>  Dont worry! Just click this button to stop the timer. </p>

            <button
                onMouseEnter={moveButton}
                onClick={clickButton}
                style={{
                    position: 'absolute',
                    left: pos.x,
                    top: pos.y,
                }}
            >
                Stop
            </button>
        </div>
    );
}
