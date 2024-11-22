import React from 'react';
import '../TelaPrincipal/DadosPessoais.css';

function CardTrabalhador(props) {
 

  return (
    <div className="card-container">
       <img className='imgPerfilUm' src={props.imagemPerfil} alt={`Foto de ${props.username}`} /> 

      <p>Nome: {props.username}</p>
      <p>Localização: {props.cep}</p>
      <p>Especialização: {props.especializacao}</p> 
    </div>
  );
}

export default CardTrabalhador;
