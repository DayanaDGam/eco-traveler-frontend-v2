import React, { useState } from 'react';
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
  // Estado para controlar cuántas tarjetas mostramos
  const [visibleCount, setVisibleCount] = useState(3);

  // Filtrado lógico
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

      {/* 1. Mostrar Preloader si está cargando */}
      {isLoading && (
        <div className="preloader">
          <i className="circle-preloader"></i>
          <p>Buscando destinos sostenibles...</p>
        </div>
      )}

      {/* 2. Mostrar Error de la API si existe */}
      {apiError && <p className="error-message">{apiError}</p>}

      {/* 3. Mostrar Resultados o "No se ha encontrado nada" */}
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

          {/* 4. Botón Mostrar más: Solo aparece si hay más elementos por mostrar */}
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