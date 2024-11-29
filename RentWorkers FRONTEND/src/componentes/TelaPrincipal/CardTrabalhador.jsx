import React from 'react';
import '../TelaPrincipal/DadosPessoais.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');


function CardTrabalhador(props) {
 
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function abrirModal() {
    setIsOpen(true);
  }
  function fecharModal() {
    setIsOpen(false)
  }
  return (
    <div className="card-container" onClick={abrirModal}>
       <img className='imgPerfilUm' src={props.imagemPerfil} alt={`Foto de ${props.username}`} /> 
       <Modal
        isOpen={modalIsOpen}
        onRequestClose={fecharModal}
        contentLabel="Modal de exemplo"
      />
      <p>Nome: {props.username}</p>
      <p>Localização: {props.cep}</p>
      <p>Especialização: {props.especializacao}</p> 
    </div>
  );
}

export default CardTrabalhador;
