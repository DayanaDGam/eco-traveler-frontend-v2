import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__logo">EcoTraveler</h1>
        <Navigation />
        <button className="header__button">Inscribirse</button>
      </div>
    </header>
  );
}

export default Header;