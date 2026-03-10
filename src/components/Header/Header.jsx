import { Link } from 'react-router-dom';
import './Header.css';

function Header({ onSearch, searchValue }) {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <h1 className="header__title">EcoTraveler🌍</h1>
        </div>
        
        <nav className="header__nav">
          <Link to="/" className="header__link">Inicio</Link>
          
          <div className="header__search-container">
            <input 
              type="text" 
              placeholder="¿A dónde quieres viajar?" 
              className="header__search-input"
              value={searchValue} // Valor ligado al estado
              onChange={(e) => onSearch(e.target.value)} // Actualiza al escribir
            />
          </div>
        </nav>

        <Link to="/resultados">
          <button className="header__button">Mis Favoritos</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;