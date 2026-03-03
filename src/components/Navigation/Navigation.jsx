import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink to="/" className="navigation__link">
            Inicio
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink to="/eco-results" className="navigation__link">
            Resultados
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;