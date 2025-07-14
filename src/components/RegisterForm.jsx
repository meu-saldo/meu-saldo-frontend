import { Eye, EyeSlash } from 'phosphor-react';
import { useState } from 'react';
import { register } from '../service/auth';
import InputField from './InputField';
import Logo from './Logo';


export default function RegisterForm({ onRegisterSuccess, onError, loading, setLoading }) {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        onError(null);

        if (form.password !== form.confirmPassword) {
            onError('As senhas não coincidem');
            return;
        }

        setLoading(true);
        try {
            await register({
                name: form.name,
                email: form.email,
                password: form.password
            });
            onRegisterSuccess();
        } catch (err) {
            onError(err.message || 'Erro ao cadastrar');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md p-4 md:p-8">
            <Logo />
            <h2 className="text-2xl font-bold text-center">Criar Conta</h2>
            <p className="text-md text-center mb-4">Crie uma conta para acessar o Meu Saldo</p>

            {/* Nome */}
            <div className="mb-4">
                <label htmlFor="name" className="sr-only">Nome</label>
                <InputField
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Nome"
                />
            </div>

            {/* Email */}
            <div className="mb-4">
                <label htmlFor="email" className="sr-only">Email</label>
                <InputField
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                />
            </div>

            {/* Senha */}
            <div className="relative mb-4">
                <label htmlFor="password" className="sr-only">Senha</label>
                <InputField
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="Senha"
                    showToggle={true}
                    iconShow={Eye}
                    iconHide={EyeSlash}
                />
            </div>

            {/* Confirmar Senha */}
            <div className="relative mb-6">
                <label htmlFor="confirmPassword" className="sr-only">Confirmar Senha</label>
                <InputField
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={handleChange}
                    required
                    placeholder="Confirmar Senha"
                    showToggle={true}
                    iconShow={Eye}
                    iconHide={EyeSlash}
                />   
            </div>

            <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition cursor-pointer"
                disabled={loading}
            >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>

            <div className="text-center mt-3">
                <p className="text-sm">
                    Já possui uma conta?
                    <a href="/login" className="ml-1 text-green-600 hover:underline font-semibold">Fazer login</a>
                </p>
            </div>
        </form>
    );
}
