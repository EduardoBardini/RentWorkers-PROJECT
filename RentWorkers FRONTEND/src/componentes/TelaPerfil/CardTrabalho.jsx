import React from 'react';
import './CardTrabalho.css'; 
import axios from 'axios';


const CardTrabalho = ({ trabalho, usuario }) => {
    const statusTrabalho = trabalho.status
        ? "Solicitação de trabalho aceita."
        : "Aguardando a aceitação do trabalho";  

    const handleStatusChange = (id_trabalho_solicitado, status) => {
        console.log(trabalho)
        console.log("ID Trabalho:", id_trabalho_solicitado);
        const objetoStatus = {
            status: true
        };
        axios.put(`http://127.0.0.1:8080/trabalhos/change-status/${id_trabalho_solicitado}`, objetoStatus)
            .then(() => {
                alert("O trabalho foi aceito pelo trabalhador.");
                window.location.reload()
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
                <p><strong>Valor:</strong> R$ {trabalho.valor}</p>
                <p><strong>Localização:</strong> {trabalho.localizacao}</p>
                <p><strong>Descrição:</strong> {trabalho.descricao}</p>
                <p><strong>Status:</strong> {statusTrabalho}</p>
                
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
