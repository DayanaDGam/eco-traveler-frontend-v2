import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import MainResults from './components/Main/MainResults.jsx';
import About from './components/About/About';
import Footer from './components/Footer/Footer';

function App() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Nuevo estado para búsqueda

  const toggleFavorite = (destination) => {
    if (favorites.some(fav => fav.id === destination.id)) {
      setFavorites(favorites.filter(fav => fav.id !== destination.id));
    } else {
      setFavorites([...favorites, destination]);
    }
  };

  return (
    <div className="page">
      {/* Pasamos searchQuery y setSearchQuery al Header */}
      <Header onSearch={setSearchQuery} searchValue={searchQuery} />
      
      <main className="content" style={{ display: 'flex' }}>
        <Sidebar onFilterChange={setActiveFilter} currentFilter={activeFilter} />
        
        <div className="main-container" style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={
              <>
                <MainResults 
                  activeFilter={activeFilter} 
                  searchQuery={searchQuery} // Pasamos la búsqueda
                  onToggleFavorite={toggleFavorite}
                  favorites={favorites}
                />
                <About />
              </>
            } />

            <Route path="/resultados" element={
              <MainResults 
                activeFilter="Todos" 
                searchQuery={searchQuery} // También filtramos en favoritos
                displayFavoritesOnly={true} 
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            } />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;