import React, { useState, useEffect, useContext } from 'react';
import '../TelaDeBusca/NavBusca.css';

import DadosPessoais from './DadosPessoais'
import IconBusca from './IconBusca';
import axios from 'axios';
import { listaTrabalhadores } from '../../config/axios';
import { UserContext } from '../../context/GlobalContext';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

function NavBusca() {
  const navigate = useNavigate();
  const { inputNome, setInputNome } = useState("");
  const { logout, usuario } = useContext(UserContext);
  const [trabalhadores, setTrabalhadores] = useState([]);
  const [inptSearch, setInptSearch] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trabalhadorSelecionado, setTrabalhadorSelecionado] = useState(null);
  const [descricaoProblema, setDescricaoProblema] = useState('');
  const [valorOferecido, setValorOferecido] = useState('');
  const [endereco, setEndereco] = useState('');
  const [id_trabalhador, setId_trabalhador] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [numeroCasa, setNumeroCasa] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [trabalhadoresPesquisados, setTrabalhadoresPesquisados] = useState([]);
  const [modoPesquisa, setModoPesquisa] = useState(false);

  useEffect(() => {
    listaTrabalhadores()
      .then((response) => setTrabalhadores(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSearchChange = (e) => {
    setInptSearch(e.target.value);
    if (trabalhadores.length > 0) {
      for (let i = 0; i < trabalhadores.length; i++) {
        if (trabalhadores[i].especialidade === e.target.value) {
          setTrabalhadoresPesquisados([...trabalhadoresPesquisados, trabalhadores[i]]);
        }
      }
    }
  };

  const abrirModal = (trabalhador) => {
    setTrabalhadorSelecionado(trabalhador);
    setId_trabalhador(trabalhador.id_usuario);
    setModalIsOpen(true);
    setLocalizacao(trabalhador.cep);
    obterCidadeEstado(trabalhador.cep);
  };

  const fecharModal = () => setModalIsOpen(false);

  const obterCidadeEstado = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        setLocalizacao('Localização não encontrada');
      } else if (response.data.localidade && response.data.uf) {
        setRua(response.data.logradouro);
        setBairro(response.data.bairro);
        setEstado(response.data.uf);
        setCidade(response.data.localidade);
        setLocalizacao(`${response.data.localidade} / ${response.data.uf}`);
      } else {
        setLocalizacao('Localização não encontrada');
      }
    } catch (error) {
      console.error('Erro ao buscar a localização:', error);
      setLocalizacao('Erro ao buscar localização');
    }
  };

  const enviarSolicitacao = async () => {
    const idUsuarioLogado = usuario.id_usuario;
    if (!idUsuarioLogado) {
      console.error('ID do usuário não encontrado');
      return;
    }

    const dadosSolicitacao = {
      id_cliente: idUsuarioLogado,
      id_trabalhador: id_trabalhador,
      id_usuario: idUsuarioLogado,
      tipo: trabalhadorSelecionado.especialidade,
      descricao: descricaoProblema,
      valor: parseFloat(valorOferecido),
      localizacao: `${rua} ${numeroCasa}, ${bairro}, ${cidade}, ${estado}`,
    };

    try {
      const response = await axios.post('http://localhost:8080/trabalhos', dadosSolicitacao);
      console.log('Solicitação enviada com sucesso:', response.data);
      fecharModal();
    } catch (error) {
      console.error('Erro ao enviar a solicitação:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      BuscarTrabalhador();
    }
  };

  // **Correção do erro - Adicione a definição da função BuscarTrabalhador**
  const BuscarTrabalhador = () => {
    console.log('Buscando trabalhador...');
    if (inptSearch) {
      const trabalhadoresEncontrados = trabalhadores.filter(
        (trabalhador) => trabalhador.especialidade === inptSearch
      );
      console.log('Trabalhadores encontrados:', trabalhadoresEncontrados);
      setTrabalhadoresPesquisados(trabalhadoresEncontrados);
    }
  };

  return (
    <>
      <div className='NavContainer'>
        <img className='imgLogo' src='/images/LogoRentWorkers.png' alt="Logo" />
        <div className='divSelectPainel'>
          <h1 className='TituloUm'>Inicio</h1>
        </div>

        <div className='divSelectPainelMeio'>
          <label className='ordernarpow'>ORDENAR POR:</label>
          <select className='selectFiltro'>
            <option value="">Nenhum</option>
          </select>
        </div>

        <div className='divSelectPainelDois'>
          <input
            className='inputStyle'
            placeholder='Buscar'
            value={inptSearch}
            onChange={(e) => setInptSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={BuscarTrabalhador} className="btnBuscar">
            <IconBusca style={{ width: '20px', height: '20px' }} />
          </button>
          <img className='imgPerfil' src='/images/download 46 (1).png' alt="Perfil" />
        </div>
      </div>

      <div className='cards'>
        {trabalhadoresPesquisados.map((d) => (
          <DadosPessoais
            key={d.id_usuario}
            username={d.username}
            localizacao={d.cep}
            especializacao={d.especialidade}
            onClick={() => abrirModal(d)}
          />
        ))}
            <Modal
        isOpen={modalIsOpen}
        onRequestClose={fecharModal}
        contentLabel="Solicitar Serviço"
        className="modal-container"
        overlayClassName="modal-overlay"
      >
        <h2>Solicitar Serviço</h2>
        {trabalhadorSelecionado && (
          <div>
            <h3>Informações do Trabalhador</h3>
            <p><strong>Nome:</strong> {trabalhadorSelecionado.username}</p>
            <p><strong>Localização:</strong> {localizacao}</p>
            <p><strong>Especialização:</strong> {trabalhadorSelecionado.especialidade}</p>
            <h3>Detalhes do Serviço</h3>
            <form>
              <label>Descrição do Problema:</label>
              <textarea
                value={descricaoProblema}
                onChange={(e) => setDescricaoProblema(e.target.value)}
                placeholder="Descreva o problema que precisa ser resolvido..."
              />
              <label>Valor Oferecido:</label>
              <input
                type="number"
                className="inputsModal"
                value={valorOferecido}
                onChange={(e) => setValorOferecido(e.target.value)}
                placeholder="Valor oferecido ao trabalhador"
              />
              <h3>Localização</h3>
              <label>Endereço (Rua):</label>
              <input
                type="text"
                className="inputsModal"
                value={rua}
                onChange={(e) => setRua(e.target.value)}
                placeholder="Rua"
              />
              <label>Bairro:</label>
              <input
                type="text"
                className="inputsModal"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                placeholder="Bairro"
              />
              <label>Cidade:</label>
              <input
                type="text"
                className="inputsModal"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                placeholder="Cidade"
              />
              <label>Estado:</label>
              <input
                type="text"
                className="inputsModal"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                placeholder="Estado"
              />
              <label>Número da Casa:</label>
              <input
                type="number"
                className="inputsModal"
                value={numeroCasa}
                onChange={(e) => setNumeroCasa(e.target.value)}
                placeholder="Número da casa"
              />
              <button type="button" onClick={enviarSolicitacao} className="btn-submit">
                Confirmar Solicitação
              </button>
            </form>
          </div>
        )}
        <button onClick={fecharModal} className="btn-close">Fechar</button>
      </Modal>
      </div>
    </>
  );
}

export default NavBusca;
