import '../TelaHome/PaginaHome.css';

import NavBar from './NavBar';
import Body from './Body';


function PaginaHome() {
  return(
    <div className="container">
      <NavBar />
      <Body />
    </div>
  )
}

export default PaginaHome;