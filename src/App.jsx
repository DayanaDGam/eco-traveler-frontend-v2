import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import MainResults from './components/Main/MainResults.jsx';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import api from './utils/ThirdPartyApi';

function App() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const savedFavs = localStorage.getItem('favorites');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    setIsLoading(true);
    setApiError("");
    
    api.getDestinations()
      .then((data) => {
        setDestinations(data);
      })
      .catch((err) => {
        console.error(err);
        setApiError("Lo sentimos, algo ha salido mal durante la solicitud. Es posible que haya un problema de conexión o que el servidor no funcione. Por favor, inténtalo más tarde.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const toggleFavorite = (destination) => {
    if (favorites.some(fav => fav.id === destination.id)) {
      setFavorites(favorites.filter(fav => fav.id !== destination.id));
    } else {
      setFavorites([...favorites, destination]);
    }
  };

  return (
    <div className="page">
      <Header onSearch={setSearchQuery} searchValue={searchQuery} />
      
      <main className="content" style={{ display: 'flex' }}>
        <Sidebar onFilterChange={setActiveFilter} currentFilter={activeFilter} />
        
        <div className="main-container" style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={
              <>
                <MainResults 
                  destinations={destinations}
                  isLoading={isLoading}
                  apiError={apiError}
                  activeFilter={activeFilter} 
                  searchQuery={searchQuery}
                  onToggleFavorite={toggleFavorite}
                  favorites={favorites}
                />
                <About />
              </>
            } />

            <Route path="/resultados" element={
              <MainResults 
                destinations={favorites} 
                isLoading={false}
                apiError=""
                activeFilter="Todos" 
                searchQuery={searchQuery}
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