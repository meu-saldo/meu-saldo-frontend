import { Eye, EyeSlash } from 'phosphor-react';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { login } from '../service/auth';

export default function LoginForm({ onLoginSuccess, onError, loading, setLoading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();;
    onError(null);
    setLoading(true);

    try {
      await login({ email, password });
      onLoginSuccess();
    } catch (err) {
      onError(err.message);
    } finally {
      setLoading(false);
    }
  
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md p-4 md:p-8">
      <h2 className="text-xl font-bold text-center mb-4">Meu Saldo</h2>
      <h2 className="text-2xl font-bold text-center">Bem-vindo de volta!</h2>
      <p className="text-md text-center mb-4">Faça login para acessar a sua conta</p>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full bg-gray-200 px-3 py-2 rounded text-base mb-3"
        required
      />
      <div className="relative mb-3">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Senha"
          className="w-full bg-gray-200 px-3 py-2 rounded pr-10 text-base"
          required
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
        >
          {showPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
        </span>
      </div>
      <div className="text-right mb-3">
        <a href="/recuperar-senha" className="text-green-500 text-sm hover:underline">Esqueceu a senha?</a>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 text-white py-2 rounded font-semibold hover:bg-green-600 transition mb-4 cursor-pointer"
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 h-px bg-gray-400"></div>
        <span className="text-sm">Ou entrar com</span>
        <div className="flex-1 h-px bg-gray-400"></div>
      </div>
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 border border-gray-400 py-2 rounded bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
      >
        <FcGoogle size={20} /> Google
      </button>
      <div className="text-center mt-3">
        <p className="text-sm">
          Não possui uma conta?
          <a href="/cadastro" className="ml-1 text-green-600 hover:underline font-semibold">Criar conta</a>
        </p>
      </div>
    </form>
  );
}
