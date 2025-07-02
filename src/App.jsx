import { Routes, Route, Navigate } from 'react-router-dom';
import EmBreve from './pages/EmBreve';
import './index.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const GITHUB_OWNER = import.meta.env.VITE_GITHUB_OWNER || 'meu-saldo';
const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO || 'meu-saldo-backend';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || '';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/em-breve" element={<EmBreve />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
