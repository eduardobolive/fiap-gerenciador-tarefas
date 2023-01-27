import type { NextPage } from "next";
import { useState } from "react";
import { executeRequest } from "../services/api";

type LoginProps = {
    setToken(s: string): void
}

export const Login : NextPage<LoginProps> = ({setToken}) => {

    const [login, setLogin] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [signUp, setSignUp] = useState(false);

    const switchSignUp = () => {
        setError('');
        setName('');
        setPassword('');
        setConfirmPassword('');
        setSignUp(!signUp);
    }

    const doAction = () => {
        setLoading(true);
        setError('');
        setSuccess('');
        if(signUp){
            doSignUp();
        }else{
            doLogin();
        }
        setLoading(false);
    }

    const doSignUp = async () => {
        try{

            if(!login || !password || !name || !confirmPassword){
                setError('Preencha todos os campos');
                return
            }

            const email = login;

            const body = {
                name,
                email,
                password
            };

            const result = await executeRequest('user', 'post', body);

            if(result && result.data){
                setSuccess('Cadastro realizado com sucesso');
                switchSignUp();
            }

            if(password != confirmPassword){
                setError('As senhas não conferem, verifique e tente novamente.')
            }

        }catch(e: any){
            if(e?.response?.data?.error){
                setError(e.response.data.error)
            }else{
                setError('Erro ao efetuar cadastro, tente novamente.');
            }
        }
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
        <div className="container-login">
            <img src="/logo.svg" alt="Logo FIAP" className="logo"/>

            <div className="form">
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}

                {signUp? 

                    <div className="input">
                        <img src="/person.svg"/>
                        <input type="text" placeholder="Nome" alt="Nome" 
                            value={name}
                            onChange={evento => setName(evento.target.value)}
                        />
                    </div>   
                    : <></>
                }
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

                {signUp? 
                    <div className="input">
                        <img src="/repeat.svg" />
                        <input type="password" placeholder="Confirmar Senha" 
                            value={confirmPassword}
                            onChange={evento => setConfirmPassword(evento.target.value)}
                        />
                    </div>

                    : <></>
                }
                <button onClick={doAction} disabled={loading}>{loading? 'Carregando' : signUp? 'Cadastre-se' : 'Login'}</button>
                <span onClick={switchSignUp}>{signUp? 'Voltar ao Login' : 'Cadastre-se'}</span>
            </div>
        </div>
    )
}