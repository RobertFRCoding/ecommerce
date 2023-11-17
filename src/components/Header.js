import { Link } from 'react-router-dom';
import MetamaskButton from './MetamaskButton';

function Header() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/about">Acerca de</Link></li>
        <li><Link to="/contact">Contacto</Link></li>
        <li><Link to="/registroEmpresas">Registro Empresas</Link></li>
        
        <li><MetamaskButton /></li>
      </ul>
    </nav>
  );
}

export default Header;
