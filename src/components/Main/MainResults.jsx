import React from 'react';
import './MainResults.css';

function MainResults() {
  const destinations = [
    { id: 1, name: 'Kyoto, Japan', price: '$3,200', score: '95', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=500' },
    { id: 2, name: 'Oia, Greece', price: '$2,850', score: '88', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=500' }
  ];

  return (
    <section className="main-content">
      <div className="main-content__header">
        <h2 className="main-content__title">Destinos Recomendados</h2>
      </div>
      <div className="main-content__grid">
        {destinations.map((dest) => (
          <article key={dest.id} className="card">
            <img src={dest.img} alt={dest.name} className="card__image" />
            <div className="card__info">
              <h3>{dest.name}</h3>
              <p>{dest.price} / persona</p>
              <span className="card__tag">{dest.score} Eco Score</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default MainResults;