import { useState, useEffect } from 'react';
import Notificacao from '../components/Notificacao';
import Carrossel from '../components/Carrossel';
import LoginForm from '../components/LoginForm';

import finance from '../assets/finance.svg';
import banking from '../assets/online-banking.svg';
import personal from '../assets/personal-finance.svg';
import receipt from '../assets/receipt.svg';
import { useLocation, useNavigate } from 'react-router-dom';

const images = [finance, banking, personal, receipt];

export default function LoginPage() {
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProgress, setNotificationProgress] = useState(100);
  const [loading, setLoading] = useState(false);
  const notificationDuration = 7000;

  const location = useLocation();
  const navigate = useNavigate();

  // Exibe mensagem que veio por redirecionamento (ex: AdminRoute)
  useEffect(() => {
    const message = location.state?.message;

    if (message) {
      setError(message);

      // Apaga a mensagem após leitura para não reaparecer em reload
      setTimeout(() => {
        navigate(location.pathname, { replace: true, state: null });
      }, 100);
    }
  }, [location, navigate]);

  // Exibe a notificação e controla barra de progresso
  useEffect(() => {
    if (!error) return;

    setShowNotification(true);
    setNotificationProgress(100);

    const start = Date.now();

    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - start;
      setNotificationProgress(Math.max(0, 100 - (elapsed / notificationDuration) * 100));
    }, 30);

    const hideTimer = setTimeout(() => setShowNotification(false), notificationDuration);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(hideTimer);
    };
  }, [error]);

  return (
    <>
      {showNotification && (
        <Notificacao
          message={error}
          onClose={() => setShowNotification(false)}
          progress={notificationProgress}
        />
      )}

      <div className="flex min-h-screen bg-gray-100 items-center justify-center">
        <div className="flex flex-row w-full max-w-6xl h-[80vh] gap-20 items-center justify-center">
          <div className="flex-[0_0_40%] flex items-center justify-center h-full relative">
            <div className="bg-green-500 rounded-3xl w-full h-full shadow-lg overflow-hidden flex items-center justify-center relative">
              <Carrossel images={images} />
              <span className="absolute top-6 left-5/12 -translate-x-1/2 text-white text-3xl font-bold text-center drop-shadow-lg">
                Simplifique o seu gerenciamento financeiro com o Meu Saldo!
              </span>
            </div>
          </div>

          <div className="flex-[0_0_55%] flex items-center justify-center h-full">
            <LoginForm
              onLoginSuccess={() => (window.location.href = '/em-breve')}
              onError={setError}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
}
