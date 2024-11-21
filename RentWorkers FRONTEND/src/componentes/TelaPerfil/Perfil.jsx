import React, { useState, useEffect, useContext } from "react";
import "./Perfil.css";
import { listaUsuarios } from "../../config/axios";
import { UserContext } from "../../context/GlobalContext";
import { atualizarUsuario } from "../../config/axios";
import { Hamburger, Plus, InformationSquare, OpenPadlock, Trash, Settings } from "./IconPerfil";



function Perfil() {
    const { usuario } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cep, setCep] = useState("");
    const [editarUsuario, setEditarUsuario] = useState(false);

    useEffect(() => {

        listaUsuarios()
            .then((response) => {
                
                if (usuario) {
                    setEmail(usuario.email);
                    setTelefone(usuario.telefone);
                    setCep(usuario.cep);
                } else {
                    console.log("Não esta logado");
                }
            })
            .catch((error) => {
                console.log("Erro ao carregar =", error);
            });
    }, [usuario]);

    function mostrarEdicao() {
        setEditarUsuario(!editarUsuario); // Alterna entre visualização e edição
    }

    function atualizarEdicao() {

        const dadosAtualizado = {
            id_usuario: usuario.id_usuario,
            email: email,
            telefone: telefone,
            cep: cep
        }

        atualizarUsuario(dadosAtualizado)
            .then((response) => {

                alert("Informações atualizadas com sucesso");
                setEditarUsuario(false)

            })
            .catch((error) => {

                console.error("erro ao atualizar os dados do usuario", error);
                alert("erro ao salvar informações,Tente Novamente")

            })

    }

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
                    {editarUsuario ? (
                        <div>
                            <p>Email:
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                            </p>
                            <p>Telefone:
                                <input
                                    type="text"
                                    value={telefone}
                                    onChange={(e) => setTelefone(e.target.value)}
                                />
                            </p>


                            <p> CEP:

                                <input
                                    type="text"
                                    value={cep}
                                    onChange={(e) => setCep(e.target.value)}
                                />

                            </p>


                        </div>
                    ) : (
                        <div>
                            <p>Email: {email}</p>
                            <p>Telefone: {telefone}</p>
                            <p>CEP: {cep}</p>
                        </div>
                    )}

                    <div className="div-botoes">
                        <button onClick={atualizarEdicao} className="botaoSalvar">Salvar</button>
                        <button onClick={mostrarEdicao} className="botaoInfo">Editar Informações</button>
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
