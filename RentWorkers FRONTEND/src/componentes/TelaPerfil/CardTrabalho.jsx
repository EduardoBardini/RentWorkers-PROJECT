import React from 'react';
import './CardTrabalho.css'; // Importando o CSS para o estilo do card
import axios from 'axios';

// Componente CardTrabalho
const CardTrabalho = ({ trabalho, usuario }) => {
    const statusTrabalho = trabalho.status
        ? "Solicitação de trabalho aceita."
        : "Aguardando a aceitação do trabalho";  // Condicional para o status

    const handleStatusChange = (id_trabalho_solicitado, status) => {
        const newStatus = status ? false : true;  // Inverter o status
        axios.put(`http://127.0.0.1:8080/trabalhos/change-status/${id_trabalho_solicitado}`, { status: newStatus })
            .then(() => {
                alert(`Status do trabalho alterado para: ${newStatus ? "Aceito" : "Negado"}`);
            })
            .catch(error => {
                console.error("Erro ao atualizar status", error);
                alert("Erro ao atualizar o status do trabalho.");
            });
    };

    return (
        <div className="cardTrabalho">
            <div className="cardHeader">
                <h3>{trabalho.tipo}</h3>
            </div>
            <div className="cardBody">
                <p><strong>Valor:</strong> R${trabalho.valor}</p>
                <p><strong>Localização:</strong> {trabalho.localizacao}</p>
                <p><strong>Descrição:</strong> {trabalho.descricao}</p>
                <p><strong>Status:</strong> {statusTrabalho}</p>  {/* Exibindo o status com a condição */}
                
                {/* Exibindo os botões apenas se o usuário for do tipo 'TRABALHADOR' e o trabalho não tiver status definido */}
                {usuario.tipoUsuario === 'TRABALHADOR' && !trabalho.status && (
                    <div className="botoes-trabalho">
                        <button onClick={() => handleStatusChange(trabalho.id_trabalho_solicitado, trabalho.status)} className="botaoAceitar">Aceitar</button>
                        <button onClick={() => handleStatusChange(trabalho.id_trabalho_solicitado, trabalho.status)} className="botaoNegar">Negar</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardTrabalho;
