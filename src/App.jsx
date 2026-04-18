import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/Home';
import Listing from './pages/Listing';
import Detail from './pages/Detail';
import Gacha from './pages/Gacha';


const AppLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className={`min-h-screen text-white font-serif ${isHome ? '' : 'bg-gradient-to-b from-lotr-black to-lotr-green-soft'}`}>
      <Navbar />
      {isHome ? (
        <Outlet />
      ) : (
        <main className="container mx-auto px-4 py-8">
          <Outlet />
        </main>
      )}
    </div>
  );
};

function App() { //router için gerekli bağlantılar ve sayfa yönlendirmeleri
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Listing endpoint="/movie" title="Movies" type="movies" />} />
          <Route path="/books" element={<Listing endpoint="/book" title="Books" type="books" />} />
          <Route path="/characters" element={<Listing endpoint="/character" title="Characters" type="characters" />} />
          <Route path="/movies/:id" element={<Detail type="movie" />} />
          <Route path="/books/:id" element={<Detail type="book" />} />
          <Route path="/characters/:id" element={<Detail type="character" />} />
          <Route path="/gacha" element={<Gacha />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
