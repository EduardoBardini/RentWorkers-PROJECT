import React from 'react';
import { useNavigate } from 'react-router-dom';  
import './DadosPessoais.css';

function DadosPessoais(props) {
  const d = props.dado; 

  const navigate = useNavigate(); 

  function clickQuadrado() {
    navigate('/cliente');  
  }

  return (
    <div className="dadosPessoais-container" onClick={clickQuadrado}> {/* Chama a função de navegação ao clicar */}
      <img className='imgPerfilUm' src={d.imagemPerfil} alt={`Foto de ${d.nome}`} /> 
      <p>Nome: {d.nome}</p>
      <p>Função: {d.funcao}</p> 
      <p>Localização: {d.localizacao}</p>
      <p>id: {d.id}</p> 
    </div>
  );
}

export default DadosPessoais;
