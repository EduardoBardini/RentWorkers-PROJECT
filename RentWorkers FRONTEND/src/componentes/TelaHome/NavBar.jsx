
import '../TelaHome/NavBar.css';

function NavBar() {

    function indoParaLogin() {
        alert("To vendo sobre react router logo logo atualizo e boto isso aqui pra funcionar...");
    }

    return (
      <div className="navContainer">
        <div className="navLogo">
          <img src="/images/LogoRentWorkers.png" alt='' width={150} height={100}/>    
        </div>
        <div className='navButtons'>
          <p>Home</p>
          <p>Sobre nós</p>
          <p>Como funciona</p>
          <button className='entrarButton' onClick={ indoParaLogin }>Entrar</button>
        </div>

      </div>
    )
}

export default NavBar;