import type { NextPage } from "next";
import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { SignupForm } from "../components/SignupForm";

type LoginProps = {
    setToken(s: string): void
}

export const Login : NextPage<LoginProps> = ({setToken}) => {

    const [signUp, setSignUp] = useState(false);
    const [success, setSuccess] = useState("");
    const [email, setEmail] = useState("");

    const switchSignUp = () => {
        setSignUp(!signUp);
    }

    return(
        <div className="container-login">
            <img src="/logo.svg" alt="Logo FIAP" className="logo"/>

            <div className="form">
                {signUp ? 
                    <SignupForm switchSignUp={switchSignUp} setSuccess={setSuccess} setEmail={setEmail} />
                :
                <>
                    {success && <p className="success">{success}</p>}
                    <LoginForm setToken={setToken} email={email} />               
                </>

                }
                <span onClick={switchSignUp}>{signUp? 'Voltar ao Login' : 'Cadastre-se'}</span>
            </div>
        </div>
    )
}