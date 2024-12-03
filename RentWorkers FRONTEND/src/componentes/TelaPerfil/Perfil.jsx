import React, { useState, useEffect, useContext } from "react";
import "./Perfil.css";
import { listaUsuarios } from "../../config/axios";
import { atualizarUsuario, dadosUsuarioLogado } from "../../config/axios";
import { UserContext } from "../../context/GlobalContext";
import CardTrabalho from "./CardTrabalho";

function Perfil() {
    const { usuario } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cep, setCep] = useState("");
    const [username, setUsername] = useState('');
    const [editarUsuario, setEditarUsuario] = useState(false);
    const [mostrarTrabalhos, setMostrarTrabalhos] = useState(false);  // Estado para mostrar os trabalhos
    const [trabalhos, setTrabalhos] = useState([]);  // Estado para armazenar os trabalhos

    useEffect(() => {
        if (usuario) {
            dadosUsuarioLogado(usuario.id_usuario)
                .then((response) => {
                    setEmail(usuario.email);
                    setTelefone(usuario.telefone);
                    setCep(usuario.cep);
                    setUsername(usuario.username);

                    if (response.data.trabalhos) {
                        setTrabalhos(response.data.trabalhos);  // Armazena os trabalhos
                    }

                    localStorage.setItem('usuario', JSON.stringify(response.data))

                    console.log(response.data);
                })
                .catch((error) => {
                    console.log("Erro ao carregar dados do usuário:", error);
                });
        } else {
            console.log("Não está logado");
        }
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

    function mostrarSolicitacoes() {
        setMostrarTrabalhos(!mostrarTrabalhos);  // Alterna entre mostrar os trabalhos ou os dados do usuário
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
                    <div className="div-solicitacoes">
                        <p onClick={mostrarSolicitacoes}>Solicitações de trabalho</p>
                    </div>
                    <div className="div-vazio"></div>
                    <div className="div-Sair"><p>Sair</p></div>
                </div>

                <div className="div-meio">
                    {mostrarTrabalhos ? (
                        <div className="listaTrabalhos">
                            {trabalhos.length === 0 ? (
                                <p>Nenhuma solicitação de trabalho encontrada.</p>
                            ) : (
                                trabalhos.map((trabalho, index) => (
                                    <CardTrabalho key={index} trabalho={trabalho} usuario={usuario} />
                                ))
                            )}
                        </div>
                    ) : (
                        <div>
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
                    )}
                </div>
            </div>
        </div>
    );
}

export default Perfil;
