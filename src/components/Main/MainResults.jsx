import React from 'react';
import './MainResults.css';

function DestinationCard({ name, image, price, score, isFavorite, onToggle }) {
  return (
    <article className="card">
      <img src={image} alt={name} className="card__image" />
      <button 
        className={`card__fav-btn ${isFavorite ? 'active' : ''}`} 
        onClick={onToggle}
      >
        {isFavorite ? '❤️ Guardado' : '🤍 Guardar'}
      </button>
      <div className="card__info">
        <h3>{name}</h3>
        <p>{price} / persona</p>
        <span className="card__tag">{score} Eco Score</span>
      </div>
    </article>
  );
}

function MainResults({ activeFilter, searchQuery, favorites, onToggleFavorite, displayFavoritesOnly = false }) {
  const allDestinations = [
    { id: 1, name: 'Kyoto, Japan', price: '$3,200', score: '95', category: 'Alto', img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80' },
    { id: 2, name: 'Oia, Greece', price: '$2,850', score: '88', category: 'Medio', img: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 3, name: 'Monteverde, Costa Rica', price: '$1,500', score: '98', category: 'Bajo', img: 'https://cdn.pixabay.com/photo/2017/01/14/12/59/iceland-1979445_1280.jpg' }
  ];

  const listToFilter = displayFavoritesOnly ? favorites : allDestinations;

  // Filtro combinado: Categoría + Nombre
  const filteredDestinations = listToFilter.filter(dest => {
    const matchesCategory = activeFilter === 'Todos' || dest.category === activeFilter;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="main-content">
      <div className="main-content__header">
        <h2 className="main-content__title">
          {displayFavoritesOnly ? 'Mis Destinos Guardados' : 'Destinos Recomendados'}
        </h2>
      </div>
      <div className="main-content__grid">
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((dest) => (
            <DestinationCard 
              key={dest.id}
              name={dest.name}
              image={dest.img}
              price={dest.price}
              score={dest.score}
              isFavorite={favorites.some(fav => fav.id === dest.id)}
              onToggle={() => onToggleFavorite(dest)}
            />
          ))
        ) : (
          <p className="no-results">No se encontraron resultados para tu búsqueda.</p>
        )}
      </div>
    </section>
  );
}

export default MainResults;