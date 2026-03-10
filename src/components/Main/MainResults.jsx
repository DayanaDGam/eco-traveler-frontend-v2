import React, { useState } from 'react';
import './MainResults.css';

function DestinationCard({ name, image, price, score, isFavorite, onToggle }) {
  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=800&q=80";
    e.target.onerror = null; 
  };

  return (
    <article className="card">
      <img 
        src={image} 
        alt={name} 
        className="card__image" 
        onError={handleImageError} 
      />
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

function MainResults({ 
  destinations, 
  isLoading, 
  apiError, 
  activeFilter, 
  searchQuery, 
  favorites, 
  onToggleFavorite, 
  displayFavoritesOnly = false 
}) {
  const [visibleCount, setVisibleCount] = useState(3);

  const filteredDestinations = destinations.filter(dest => {
    const matchesCategory = activeFilter === 'Todos' || dest.category === activeFilter;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + 3);
  };

  return (
    <section className="main-content">
      <div className="main-content__header">
        <h2 className="main-content__title">
          {displayFavoritesOnly ? 'Mis Destinos Guardados' : 'Destinos Recomendados'}
        </h2>
      </div>

      {isLoading && (
        <div className="preloader">
          <i className="circle-preloader"></i>
          <p>Buscando destinos sostenibles...</p>
        </div>
      )}

      {apiError && <p className="error-message">{apiError}</p>}

      {!isLoading && !apiError && (
        <>
          <div className="main-content__grid">
            {filteredDestinations.length > 0 ? (
              filteredDestinations.slice(0, visibleCount).map((dest) => (
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
              <p className="no-results">No se ha encontrado nada</p>
            )}
          </div>

          {!displayFavoritesOnly && visibleCount < filteredDestinations.length && (
            <button className="show-more-btn" onClick={handleShowMore}>
              Mostrar más
            </button>
          )}
        </>
      )}
    </section>
  );
}

export default MainResults;