import React, { createContext, useContext, useState, useEffect } from 'react';

interface TimerContextType {
    timeLeft: number;
    isRunning: boolean;
    start: () => void;
    addTime: (seconds: number) => void;
    events: {
        two: boolean;
        one: boolean;
        timeUp: boolean;
    };
    eventFlags: {

        twoDone: boolean;
        oneDone: boolean;
        timeUpDone: boolean;
    };
    setPage: (page: 'home' | 'support' | 'gameover') => void;
    page: 'home' | 'support' | 'gameover';

}

export const TimerContext = createContext<TimerContextType | null>(null);

export function TimerProvider({ children }: { children: React.ReactNode }) {
    const [timeLeft, setTimeLeft] = useState(3 * 60);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 0) {
                    setIsRunning(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 400);

        return () => clearInterval(interval);
    }, [isRunning]);
    const [page, setPage] = useState<'home' | 'support' | 'gameover'>('home');

    useEffect(() => {
        if (timeLeft === 0) {
            setPage('gameover');
        }
    }, [timeLeft]);

    const addTime = (seconds: number) => setTimeLeft(prev => prev + seconds);
    const start = () => setIsRunning(true);
    const [events, setEvents] = useState({
        two: false,
        one: false,
        timeUp: false,
    });
    const [eventFlags, setEventFlags] = useState({

        twoDone: false,
        oneDone: false,
        timeUpDone: false,
    });

    useEffect(() => {


        if (timeLeft === 2 * 60 && !events.two) {
            setEvents(prev => ({ ...prev, two: true }));
        }
        if (timeLeft === 1 * 60 && !events.one) {
            setEvents(prev => ({ ...prev, one: true }));
        }
        if (timeLeft === 0 && !events.timeUp) {
            setEvents(prev => ({ ...prev, timeUp: true }));
        }
    }, [timeLeft]);

    return (
        <TimerContext.Provider value={{ timeLeft, isRunning, start, addTime, events, page, setPage, eventFlags, setEventFlags }}>
            {children}
        </TimerContext.Provider>
    );
}

export function useTimer() {
    return useContext(TimerContext);
}