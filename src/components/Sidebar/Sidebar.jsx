import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__filters">
        <h3 className="sidebar__title">Filtros de Viaje</h3>
        <nav className="sidebar__menu">
          <button className="sidebar__item">Presupuesto</button>
          <button className="sidebar__item">Eco Score</button>
          <button className="sidebar__item">Modo de Transporte</button>
          <button className="sidebar__item">Nivel de CO2</button>
        </nav>
      </div>
      
      <div className="sidebar__score-card">
        <p className="sidebar__score-label">Tu Impacto Medioambiental</p>
        <div className="sidebar__score-circle">
          <span className="sidebar__score-number">85%</span>
        </div>
        <p className="sidebar__score-text">Rendimiento Eco</p>
      </div>
    </aside>
  );
}

export default Sidebar;