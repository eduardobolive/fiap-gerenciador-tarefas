import type { NextPage } from "next";
import { useState } from "react";

export const Login : NextPage = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const doLogin = () => {
        try {
            setError('');
            if(!login || !password){
                setError('Login ou Senha não preenchidos');
                return
            }

            setError('Formulário Ok');

        } catch (e) {
            console.log(`Erro ao efetuar login: ${e}`);        
        }
    }

    return(
        <div className="container-login">
            <img src="/logo.svg" alt="Logo FIAP" className="logo"/>
            <div className="form">
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
                <button onClick={doLogin}>Login</button>
            </div>
        </div>
    )
}