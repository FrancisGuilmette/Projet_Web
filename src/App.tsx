  import { TimerProvider, useTimer } from './context/TimerContext';
  import { Toaster } from 'react-hot-toast';
  import HomePage from './pages/HomePage';
  import SupportPage from './pages/SupportPage';
  import TimerRanOut from './pages/TimerRanOut';
  import { useState } from 'react';
  import Jumpscare from './components/Jumpscare';
  import uhOh from './assets/UhOh.png';
  import './App.css';
  import CursorTrail from './components/CursorTrail';
import NotificationPopup from './components/Notification';


  function AppContent() {
    const timer = useTimer();
    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    if (!timer) return null;
    const { page, setPage, isRunning, events, eventFlags, setEventFlags } = timer;
    const [spooky, setSpooky] = useState(false);
    const [trail, setTrail] = useState(false);
    const [popup, setPopup] = useState<{ message: string; duration: number } | null>(null);




    if (events.two && !eventFlags.twoDone) {
      eventFlags.twoDone = true;
      setEventFlags(prev => ({ ...prev, twoDone: true }));
      document.body.style.color = "red";
      document.body.classList.add('font-getting-bigger');
      setPopup({ message: "This specific popup was made with the intention of covering as much of your screen as possibl" +
         "please enjoy your experience as this popup disappears in an undisclosed amount of time.", duration: getRandomInt(10000) });

      setSpooky(true);

    }
    if (events.one && !eventFlags.oneDone) {
      eventFlags.oneDone = true;
      setEventFlags(prev => ({ ...prev, oneDone: true }));
      document.body.style.background = "linear-gradient(37deg,rgba(0, 0, 0, 1) 0%, rgba(105, 24, 24, 1) 53%, rgba(0, 0, 0, 1) 100%)";
      document.body.classList.add('shake-text');
      document.body.classList.add('font-getting-bigger');
      setTrail(true);

    }
    if (events.timeUp && !eventFlags.timeUpDone) {
      eventFlags.timeUpDone = true;
      setEventFlags(prev => ({ ...prev, timeUpDone: true }));
      document.body.style.color = "black";
      setTrail(false);
      document.body.classList.remove('font-getting-bigger');
      setPopup(null);
    }

    return (
      <>
        <Toaster position='top-right' />
        {popup && (
          <NotificationPopup
            message={popup.message}
            duration={popup.duration}
            onClose={() => setPopup(null)}
          />
        )}
        {spooky &&
          <Jumpscare
            image={uhOh}
            message="YOU CANNOT HIDE AMONGST THE LIVING"
            duration={3000}
          />
        }
        {trail && <CursorTrail />}
        {page !== 'gameover' && (
          <nav>
            <button onClick={() => setPage('home')}>Home</button>
            {isRunning && <button onClick={() => setPage('support')}>Support</button>}
          </nav>
        )}

        {page === 'home' && <HomePage />}
        {page === 'support' && <SupportPage />}
        {page === 'gameover' && <TimerRanOut />}
      </>
    );
  }

  export default function App() {
    return (
      <TimerProvider>
        <AppContent />
      </TimerProvider>
    );
  }