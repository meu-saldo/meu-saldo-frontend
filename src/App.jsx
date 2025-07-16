import './index.css';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'sonner';


const GITHUB_OWNER = import.meta.env.VITE_GITHUB_OWNER || 'meu-saldo';
const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO || 'meu-saldo-backend';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || '';


function App() {
  return (
    <>
      <AppRoutes />
      <Toaster richColors position='top-right' />
    </>
  );
}

export default App;
