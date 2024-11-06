import { useEffect, useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import '../TelaPrincipal/TelaPrincipal.css'
import CardTrabalhador from './CardTrabalhador.';
import { listaUsuarios } from '../../services/api';

function TelaPrincipal() {

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
      listaUsuarios().then((response) => {
        setUsuarios(response);
        console.log(response);
      }).catch((error) => {
        console.log(error);
      })
  })



  

  const [inptSearch, setInptSearch] = useState();


  return (
    <div className="div-container-tela-principal">
      <div className='div-nav'>
        <div className='div-logo'></div>
        <div className='div-select-nav'>
          <form className='div-search' >
            <div className='barra-search'>

              <div className='fundo-search'>
                <input
                  value={inptSearch}

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
             <select className='option-padrao'>
              
             </select>
            </div>
          </div>

        </div>
      </div>

    <div className='container-body'>
      <div className='div-card-trabalhador'>
        
      </div>
    </div>
    </div>
  )
}

export default TelaPrincipal;