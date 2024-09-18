
import { Link } from 'react-router-dom';
import '../TelaHome/NavBar.css';

function NavBar() {


    return (
      <div className="navContainer">
        <div className="navLogo">
          <img src="/images/LogoRentWorkers.png" alt='' width={150} height={100}/>    
        </div>
        <div className='navButtons'>
          <p>Home</p>
          <p>Sobre nós</p>
          <p>Como funciona</p>
          <Link to="/login">Entrar</Link>
        </div>

      </div>
    )
}

export default NavBar;