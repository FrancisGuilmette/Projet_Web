import { useEffect, useState } from 'react';

interface JumpscareProps {
    image: string;
    message: string;
    duration: number; 
}

export default function Jumpscare({ image, message, duration }: JumpscareProps) {
    const [visible, setVisible] = useState(true);
    const [style, setStyle] = useState({});

    useEffect(() => {
        const chaos = setInterval(() => {
            setStyle({
                position: 'fixed',
                left: `${Math.random() * 80}vw`,
                top: `${Math.random() * 80}vh`,
                width: `${Math.random() * 400 + 100}px`,
                zIndex: 9999,
            });
        }, 200); 

        const timer = setTimeout(() => {
            setVisible(false);
            clearInterval(chaos);
        }, duration);

        return () => {
            clearInterval(chaos);
            clearTimeout(timer);
        };
    }, [duration]);

    if (!visible) return null;

    return (
        <div style={style}>
            <img src={image} alt="jumpscare" style={{ width: '100%' }} />
            <p style={{ 
                color: 'red', 
                fontWeight: 'bold',
                fontSize: `${Math.random() * 2 + 1}rem`
            }}>{message}</p>
        </div>
    );
}