import '../TelaHome/parteHome.css'
import { Link } from 'react-router-dom';

function ParteHome() {
    return (
        <div className="homeContainer">

            <div className="navContainer">
                <div className="logoDiv">
                  <img src="/images/LogoRentWorkers.png" width={250} height={150}/>
                </div>
                <div className='buttonsNav'>
                 <Link className='buttonsHome' to="/login">Entrar</Link>
                </div>
            </div>
            <div className='bodyContainer'>

                <div className='bodyMsg'>
                    <div className='bodyMensagemContainer'>
                        <div className='tituloMsgBody'>
                           <h2>Bem-vindo à RentWorkers</h2>
                        </div>
                        <div className='descMsgBody'>
                           <label className='labelEditada'>Encontrar ajuda para o trabalho nunca foi tão fácil.
                           Conecte-se com profissionais qualificados para cuidar do seu lar com eficiência e confiança.</label>
                        </div>
                    </div>
                </div>

                <div className='div-imagem-home'>

                </div>
            </div>
            
            
        
                
        </div>

    )
}


export default ParteHome;