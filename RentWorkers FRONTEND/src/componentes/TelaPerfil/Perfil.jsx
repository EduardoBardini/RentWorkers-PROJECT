import React, { useState, useEffect, useContext } from "react";
import "./Perfil.css";
import { listaUsuarios } from "../../config/axios";
import { atualizarUsuario } from "../../config/axios";
import { UserContext } from "../../context/GlobalContext";

function Perfil() {
    const { usuario } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cep, setCep] = useState("");
    const [username, setUsername] = useState('');
    const [editarUsuario, setEditarUsuario] = useState(false);

    useEffect(() => {
        listaUsuarios()
            .then((response) => {
                if (usuario) {
                    setEmail(usuario.email);
                    setTelefone(usuario.telefone);
                    setCep(usuario.cep);
                    setUsername(usuario.username);

                    console.log(response.data)
                } else {
                    console.log("Não está logado");
                }
            })
            .catch((error) => {
                console.log("Erro ao carregar =", error);
            });
    }, [usuario]);

    function mostrarEdicao() {
        setEditarUsuario(!editarUsuario); 
    }

    function atualizarEdicao() {
        const dadosAtualizado = {
            id_usuario: usuario.id_usuario,
            email: email,
            telefone: telefone,
            cep: cep,
            username: username,
        };

        atualizarUsuario(dadosAtualizado)
            .then(() => {
                alert("Informações atualizadas com sucesso");
                setEditarUsuario(false);
            })
            .catch((error) => {
                console.error("Erro ao atualizar os dados do usuário", error);
                alert("Erro ao salvar informações. Tente novamente.");
            });
    }

    return (
        <div className="container-Perfil">
            <div className="divPerfil">
                <div className="div-cima">
                    <img className="imgPerfilum" src="/images/download 46 (1).png" alt="Perfil" />
                    <p className="fonteNome">{username}</p>
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
                        <div className="formulario-edicao">
                            <div className="campo-edicao">
                                <label htmlFor="username">Username:</label>
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Digite seu username"
                                />
                            </div>

                            <div className="campo-edicao">
                                <label htmlFor="email">Email:</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Digite seu email"
                                />
                            </div>

                            <div className="campo-edicao">
                                <label htmlFor="telefone">Telefone:</label>
                                <input
                                    id="telefone"
                                    type="tel"
                                    value={telefone}
                                    onChange={(e) => setTelefone(e.target.value)}
                                    placeholder="Digite seu telefone"
                                />
                            </div>

                            <div className="campo-edicao">
                                <label htmlFor="cep">CEP:</label>
                                <input
                                    id="cep"
                                    type="text"
                                    value={cep}
                                    onChange={(e) => setCep(e.target.value)}
                                    placeholder="Digite seu CEP"
                                />
                            </div>

                            <div className="div-botoes">
                                <button onClick={atualizarEdicao} className="botaoSalvar">Salvar</button>
                                <button onClick={mostrarEdicao} className="botaoInfo">Cancelar</button>
                            </div>
                        </div>
                    ) : (
                        <div className="dados-usuario">
                            <p><strong>Username:</strong> {username}</p>
                            <p><strong>Email:</strong> {email}</p>
                            <p><strong>Telefone:</strong> {telefone}</p>
                            <p><strong>CEP:</strong> {cep}</p>

                            <div className="div-botoes">
                                <button onClick={mostrarEdicao} className="botaoInfo">Editar Informações</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Perfil;
