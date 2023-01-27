import type { NextPage } from "next";
import { useState } from "react";
import { executeRequest } from "../services/api";

type ListProps = {
    switchSignUp() : void,
    setSuccess(msg: string) : void,
    setEmail(email: string): void
}

export const SignupForm : NextPage<ListProps> = ({switchSignUp, setSuccess, setEmail}) => {

    const [login, setLogin] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const doAction = () => {
        setLoading(true);
        setError('');
        setSuccess('');
        doSignUp();
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
                setEmail(email);
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

    return(
        <div>
            {error && <p className="error">{error}</p>}

            <div className="input">
                <img src="/person.svg"/>
                <input type="text" placeholder="Nome" alt="Nome" 
                    value={name}
                    onChange={evento => setName(evento.target.value)}
                />
            </div>   

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

            <div className="input">
                <img src="/repeat.svg" />
                <input type="password" placeholder="Confirmar Senha" 
                    value={confirmPassword}
                    onChange={evento => setConfirmPassword(evento.target.value)}
                />
            </div>
            <button onClick={doAction} disabled={loading}>{loading? 'Carregando' : 'Cadastre-se'}</button>
        </div>
    )
}