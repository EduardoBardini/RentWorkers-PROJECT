import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../TelaPrincipal/TelaPrincipal.css';
import { listaTrabalhadores, listaUsuarios } from '../../config/axios';
import { UserContext } from '../../context/GlobalContext';
import CardTrabalhador from './CardTrabalhador';

function TelaPrincipal() {
  const navigate = useNavigate();
  const { idUsuarioLogado, logout } = useContext(UserContext);
  const [trabalhadores, setTrabalhadores] = useState([]);
  const [inptSearch, setInptSearch] = useState(""); 
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    listaTrabalhadores().then((response) => {
      console.log(response.data);
      setTrabalhadores(response.data);
    }).catch((error) => {
      console.log(error);
    })
  })

  const handleSearchChange = (e) => {
    setInptSearch(e.target.value); 
  };

  return (
    <div className="div-container-tela-principal">
      <div className='div-nav'>
        <div className='div-logo'></div>
        <div className='div-select-nav'>
          <form className='div-search'>
            <div className='barra-search'>
              <div className='fundo-search'>
                <input
                  value={inptSearch} 
                  onChange={handleSearchChange} 
                  type='text'
                  placeholder='Qual serviço você procura?'
                  className='input-tela-principal'
                />
                <div className='div-button-search'>
                  <button type='submit' className='div-img' />
                  <div />
                </div>
              </div>
            </div>
          </form>

          <div className='div-conta-perfil'>
            <div className='div-select-perfil'>
              <select
                className='option-padrao'
                onChange={(e) => {
                  if (e.target.value == "perfil") {
                    navigate('/perfil');
                  }else if(e.target.value == "sair") {
                    navigate('/login');
                    logout();
                  }
                }}
              >
                <option value="">
                  {usuarioLogado ? usuarioLogado.nome : "Carregando..."}
                </option>
                <option value="perfil">Ir para Perfil</option>
                <option value="sair">Sair</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className='container-body'>
        {trabalhadores.map((trabalhador) => (
          <CardTrabalhador username={trabalhador.username}/>
        ))}
      </div>
    </div>
  );
}

export default TelaPrincipal;
