import { TimerProvider, useTimer } from './context/TimerContext';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import SupportPage from './pages/SupportPage';
import TimerRanOut from './pages/TimerRanOut';

function AppContent() {
  const timer = useTimer();

  if (!timer) return null;
  const { page, setPage, isRunning } = timer;

  return (
    <>
      <Toaster position='top-right' />

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