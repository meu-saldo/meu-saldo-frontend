import { useState, useEffect } from 'react';
import Notificacao from '../components/Notificacao';
import Carrossel from '../components/Carrossel';
import LoginForm from '../components/forms/LoginForm';

import finance from '../assets/finance.svg';
import banking from '../assets/online-banking.svg';
import personal from '../assets/personal-finance.svg';
import receipt from '../assets/receipt.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const images = [finance, banking, personal, receipt];

export default function LoginPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const message = location.state?.message;

    if (message) {
      toast.error(message)

      setTimeout(() => {
        navigate(location.pathname, { replace: true, state: null });
      }, 100);
    }
  }, [location, navigate]);

  return (
    <>
      <div className="flex min-h-screen bg-gray-100 items-center justify-center">
        <div className="
          flex flex-col w-full items-center justify-center px-10
          md:flex-row md:h-[80vh] md:gap-20 
          max-w-6xl
        ">
          <div className="flex-[0_0_40%] flex items-center justify-center h-full relative">
            <div className="bg-green-500 rounded-3xl w-full h-full shadow-lg overflow-hidden flex items-center justify-center relative">
              <Carrossel images={images} />
              <span className="absolute top-6 left-5/12 -translate-x-1/2 text-white text-3xl font-bold text-center drop-shadow-lg">
                Simplifique o seu gerenciamento financeiro com o Meu Saldo!
              </span>
            </div>
          </div>

          <div className="md:flex-[0_0_55%] flex items-center justify-center h-full w-full">
            <LoginForm
              onLoginSuccess={() => navigate("/home")}
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
