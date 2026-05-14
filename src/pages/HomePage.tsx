import Timer from '../components/Timer';
import { useTimer } from '../context/TimerContext';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Jumpscare from '../components/Jumpscare';
import CursorTrail from '../components/CursorTrail';


export default function HomePage() {
    const { timeLeft, isRunning, start, addTime } = useTimer();

    const handleFight = () => {
        if (getRandomInt(5) === 0) {
            addTime(1);
        }
        if (getRandomInt(100) === 1) {
            addTime(-10);
        }
    };
    const [attempts, setAttempts] = useState(1);
    const attemptStart = () => {
        setAttempts(prev => prev + 1);
        if (attempts >= 3) {
            start();
            toast.error("You have made a terrible mistake. The timer has started. You have been warned.", { icon: '⏱️' });
        }
    };
    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    return (
        <div>


            {!isRunning ? (
                <div>
                    <h1>DO NOT START THIS TIMER</h1>
                    <p>Terrible. Terrible. TERRIBLE things will happen if you start it.</p>
                </div>
            ) : (
                <div>
                    <h1>What have you done?</h1>
                    <p>There may still be time, quick, contact support.
                        do NOT let the timer run out, or you will regret it. You have been warned.
                    </p>
                </div>
            )}
            <Timer />

            {!isRunning ? (
                <button onClick={attemptStart}>
                    {attempts === 1 ? "Start" : attempts === 2 ? "Do Not" : "BAD USER"}
                </button>
            ) : (
                <button onClick={handleFight}>FIGHT the timer</button>
            )}

        </div>
    );
}
