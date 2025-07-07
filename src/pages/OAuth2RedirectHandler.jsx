import { useEffect } from "react";
import { replace, useNavigate, useSearchParams } from "react-router-dom"

const OAuth2RedirectHandler = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');

        if (token) {
            localStorage.setItem('authToken', token);
            navigate('/home', { replace: true });
        } else {
            navigate('/login', { replace: true, state: { error: "Falha no login com Google." } })
        }
    }, [navigate, searchParams])

    return <div>Carregando...</div>
}

export default OAuth2RedirectHandler;