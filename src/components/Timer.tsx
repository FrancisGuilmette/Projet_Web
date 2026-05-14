import { useState } from 'react';
import { useTimer } from '../context/TimerContext';
import toast, { Toaster } from 'react-hot-toast';



export default function Timer() {
    const { timeLeft, isRunning, start, addTime } = useTimer();

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return (
        <div>
            <h1>{display}</h1>

        </div>
    );
}