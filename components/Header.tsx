import type { NextPage } from "next";

type HeaderProps = {
    sair(): void,
    showModal():void
}
export const Header : NextPage<HeaderProps> = ({sair, showModal}) => {

    var name = localStorage.getItem("name");
    if(name == null) name = "~Erro~";

    return (
        <div className="container-header">
            <img src="/logo.svg" alt="Logo Fiap" className="logo"/>
            <button onClick={showModal}><span>+</span>Adicionar Tarefa</button>
            <div className="mobile">
                <span>Olá, {name}</span>
                <img src="/exit-mobile.svg" alt="Sair" onClick={sair}/>
            </div>
            <div className="desktop">
                <span>Olá, {name}</span>
                <img src="/exit-desktop.svg" alt="Sair" onClick={sair}/>
            </div>
        </div>
    );
}