import { useEffect, useState } from 'react';

interface NotificationPopupProps {
    message: string;
    duration: number;
    onClose: () => void;
}

export default function NotificationPopup({ message, duration, onClose }: NotificationPopupProps) {
    const [visible, setVisible] = useState(true);
    const [timeLeft, setTimeLeft] = useState(duration / 1000);

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimeLeft(prev => prev - 1); 
        }, 1000);

        const timer = setTimeout(() => {
            setVisible(false);
            onClose();
        }, duration);

        return () => {
            clearInterval(countdown);
            clearTimeout(timer);
        };
    }, [duration, onClose]);

    if (!visible) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#1a1a1a',
            color: 'white',
            padding: '16px 24px',
            borderRadius: '8px',
            zIndex: 9999,
            maxWidth: '300px',
        }}>
            <h1>{message}</h1>
        </div>
    );
}