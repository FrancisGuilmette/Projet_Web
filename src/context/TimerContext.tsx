import React, { createContext, useContext, useState, useEffect } from 'react';

interface TimerContextType {
    timeLeft: number;
    isRunning: boolean;
    start: () => void;
    addTime: (seconds: number) => void;
    events: {
        five: boolean;
        four: boolean;
        three: boolean;
        two: boolean;
        one: boolean;
        timeUp: boolean;
    };
    setPage: (page: 'home' | 'support' | 'gameover') => void;
    page: 'home' | 'support' | 'gameover';

}

export const TimerContext = createContext<TimerContextType | null>(null);

export function TimerProvider({ children }: { children: React.ReactNode }) {
    const [timeLeft, setTimeLeft] = useState(5* 60);
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
        }, 1000);

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
        four: false,
        three: false,
        two: false,
        one: false,
        timeUp: false,
    });

    useEffect(() => {

        if (timeLeft === 4 * 60 && !events.four) {
            setEvents(prev => ({ ...prev, four: true }));
        }
        if (timeLeft === 3 * 60 && !events.three) {
            setEvents(prev => ({ ...prev, three: true }));
        }

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
        <TimerContext.Provider value={{ timeLeft, isRunning, start, addTime, events, page, setPage }}>
            {children}
        </TimerContext.Provider>
    );
}

export function useTimer() {
    return useContext(TimerContext);
}