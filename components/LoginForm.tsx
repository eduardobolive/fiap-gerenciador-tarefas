import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { executeRequest } from "../services/api";

type LoginProps = {
    setToken(s: string): void
    email: string
}

export const LoginForm : NextPage<LoginProps> = ({setToken, email}) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(email && email.length > 0){
            setLogin(email);
        }
        
    }, [email]);

    const doAction = () => {
        setLoading(true);
        setError('');
        doLogin();
        setLoading(false);
    }

    const getLogin = () => {

    }

    const doLogin = async () => {
        try {
            if(!login || !password){
                setError('Login ou Senha não preenchidos');
                return
            }

            const body = {
                login,
                password
            };

            const result = await executeRequest('login', 'post', body);

            if(result && result.data){
                const obj = result.data
                localStorage.setItem('accessToken', obj.token);
                localStorage.setItem('name', obj.name);
                localStorage.setItem('email', obj.email);
                setToken(obj.token);
            }
        } catch (e: any) {
            if(e?.response?.data?.error){
                setError(e.response.data.error)
            }else{
                setError('Erro ao efetuar login, tente novamente.');
            }
        }
    }

    return(
        <div>
            {error && <p className="error">{error}</p>}

            <div className="input">
                <img src="/mail.svg"/>
                <input type="text" placeholder="Login" alt="Login Icone" 
                    value={login}
                    onChange={evento => setLogin(evento.target.value)}
                />
            </div>
            <div className="input">
                <img src="/lock.svg" />
                <input type="password" placeholder="Senha" 
                    value={password}
                    onChange={evento => setPassword(evento.target.value)}
                />
            </div>
            <button onClick={doAction} disabled={loading}>{loading? 'Carregando' : 'Login'}</button>
        </div>
    )
}