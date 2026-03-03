import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import MainResults from './components/Main/MainResults.jsx';
import About from './components/About/About';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="page">
      <Header />
      <main className="content" style={{ display: 'flex' }}>
        <Sidebar />
        <div className="main-container" style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={
              <>
                <MainResults />
                <About />
              </>
            } />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;