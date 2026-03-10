import './Sidebar.css';

function Sidebar({ onFilterChange, currentFilter }) {
  const budgetOptions = ["Todos", "Bajo", "Medio", "Alto"];

  return (
    <aside className="sidebar">
      <h2 className="sidebar__title">Filtros de Viaje</h2>
      
      <div className="sidebar__section">
        <h3 className="sidebar__subtitle">Presupuesto</h3>
        <ul className="sidebar__list">
          {budgetOptions.map((option) => (
            <li key={option}>
              <button 
                className={`sidebar__filter-btn ${currentFilter === option ? 'active' : ''}`}
                onClick={() => onFilterChange(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar__impact">
        <h3>Tu Impacto Medioambiental</h3>
        <p className="sidebar__percentage">85%</p>
        <p>Rendimiento Eco</p>
      </div>
    </aside>
  );
}

export default Sidebar;