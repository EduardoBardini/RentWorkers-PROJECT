import '../TelaDeBusca/NavBusca.css';

function NavBusca() {
  return(
    <div className="NavContainer">
      <div className='divLogo'>
         <img className='imgLogo' src='/images/LogoRentWorkers.png'/>
      </div>
      <div className='divAreaNavegacao'>
        <div className='divPainelNavegacao'>
         <div className='divSelectPainel'>
            <label>ORDENAR POR:</label>
            <select className='selectFiltro' name=''>
            <option value="">Nenhum</option>
            <option value=""></option>
            </select>
         </div>
         <div className="divBuscaPainel">
           <input className='inputStyle' placeholder='Buscar' />
         </div>
         
        </div>
    </div>


    </div>
  )
}

export default NavBusca;