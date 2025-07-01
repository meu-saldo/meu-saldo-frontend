import { Routes, Route, Navigate } from 'react-router-dom';
import EmBreve from './pages/EmBreve';
import './index.css';
import Layout from './components/Layout';

const GITHUB_OWNER = import.meta.env.VITE_GITHUB_OWNER || 'meu-saldo';
const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO || 'meu-saldo-backend';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || '';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/em-breve" replace />} />
        <Route path="/em-breve" element={<EmBreve />} />
      </Routes>
    </Layout>
  );
}

export default App;
