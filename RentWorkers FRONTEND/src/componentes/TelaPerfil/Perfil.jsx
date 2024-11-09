import React, { useState, useEffect, useContext } from "react";
import "./Perfil.css";
import { listaUsuarios } from "../../services/api";
import { UserContext } from "../../context/GlobalContext";
import { Hamburger, Plus, InformationSquare, OpenPadlock, Trash, Settings } from "./IconPerfil";

function Perfil() {
    const { idUsuarioLogado } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cep, setCep] = useState("");

    useEffect(() => {
        if (!idUsuarioLogado) {
            alert("Por favor, faça login para visualizar seu perfil.");
            return;
        }
    
        listaUsuarios()
            .then((response) => {
                const usuarioLogado = response.data.find(
                    (user) => user.id_usuario === idUsuarioLogado
                );
                if (usuarioLogado) {
                    setEmail(usuarioLogado.email);
                    setTelefone(usuarioLogado.telefone);
                    setCep(usuarioLogado.cep);
                } else {
                    console.log("Usuário não encontrado na lista.");
                }
            })
            .catch((error) => {
                console.log("Erro ao carregar lista de usuários:", error);
            });
    }, [idUsuarioLogado]);
    
    return (
        <div className="container-Perfil">
            <div className="divPainel">
                <Hamburger style={{ width: "50px", height: "60px", marginTop: "4rem" }} />
                <Plus style={{ width: "50px", height: "50px" }} />
                <InformationSquare style={{ width: "50px", height: "60px" }} />
                <OpenPadlock style={{ width: "50px", height: "60px" }} />
                <Trash style={{ width: "60px", height: "60px" }} />
                <Settings style={{ width: "60px", height: "60px" }} />
            </div>

            <div className="divPerfil">
                <div className="div-cima">
                    <img className="imgPerfilum" src="/images/download 46 (1).png" alt="Perfil" />
                    <p className="fonteNome">Jackson Arthur Dudu dos Santos</p>
                </div>

                <div className="divPerfil-Esquerda">
                    <div className="div-dados"><p>Dados</p></div>
                    <div className="div-nota"><p>Nota e Avaliações</p></div>
                    <div className="div-solicitacoes"><p>Solicitações de trabalho</p></div>
                    <div className="div-vazio"></div>
                    <div className="div-Sair"><p>Sair</p></div>
                </div>

                <div className="div-meio">
                    <p>Email: {email}</p>
                    <p>Telefone: {telefone}</p>
                    <p>CEP: {cep}</p>

                    <div className="div-botoes">
                        <button className="botaoSalvar">Salvar</button>
                        <button className="botaoInfo">Editar Informações</button>
                    </div>

                    <div className="div-form">
                        <div className="div-formeio">
                            <img className="imgPerfildois" src="/images/download 46 (1).png" alt="Perfil" />
                            <button className="botaoExcluir">Excluir Foto</button>
                            <button className="botaoAlterar">Alterar Foto</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Perfil;
