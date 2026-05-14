import { useEffect, useState } from 'react';

interface TrailDot {
    id: number;
    x: number;
    y: number;
}

interface CursorTrailProps {
    emoji?: string; 
    count?: number; 
}

export default function CursorTrail({ emoji = '⛔', count = 500 }: CursorTrailProps) {
    const [trail, setTrail] = useState<TrailDot[]>([]);
    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    useEffect(() => {
        let id = 0;

        const handleMouseMove = (e: MouseEvent) => {
            setTrail(prev => {
                const newDot = { id: id++, x: e.clientX, y: e.clientY };
                const updated = [...prev, newDot];
                return updated;
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [count]);

    return (
        <>
            {trail.map((dot, i) => (
                <span
                    key={dot.id}
                    style={{
                        position: 'fixed',
                        left: dot.x,
                        top: dot.y,
                        pointerEvents: 'none', 
                        zIndex: getRandomInt(1000),
                        transform: 'translate(-50%, -50%)',
                        userSelect: 'none',
                    }}
                >
                    {emoji}
                </span>
            ))}
        </>
    );
}