import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../TelaPrincipal/TelaPrincipal.css';
import { listaUsuarios } from '../../services/api';
import { UserContext } from '../../context/GlobalContext';
import CardTrabalhador from './CardTrabalhador';

function TelaPrincipal() {
  const navigate = useNavigate();
  const { idUsuarioLogado } = useContext(UserContext);
  const [usuarios, setUsuarios] = useState([]);
  const [inptSearch, setInptSearch] = useState(""); 
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    listaUsuarios()
      .then((response) => {
        setUsuarios(response.data);
        const usuarioAtual = response.data.find(user => user.id_usuario === idUsuarioLogado);
        setUsuarioLogado(usuarioAtual); 
      })
      .catch((error) => {
        console.log("Erro ao carregar usuários:", error);
      });
  }, [idUsuarioLogado]);

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
                  if (e.target.value === "perfil") {
                    navigate('/perfil');
                  }
                }}
              >
                <option value="">
                  {usuarioLogado ? usuarioLogado.nome : "Carregando..."}
                </option>
                <option value="perfil">Ir para Perfil</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className='container-body'>
        <div className='div-card-trabalhador'>
          <CardTrabalhador />
        </div>
      </div>
    </div>
  );
}

export default TelaPrincipal;
