import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Page components
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Search from './pages/search/Search';
import Recipe from './pages/recipe/Recipe';
import ThemeSelector from './components/ThemeSelector';

// styles
import './App.css';
import { useTheme } from './hooks/useTheme';

function App() {

  const { mode } = useTheme();

  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recipes/:id" element={<Recipe />} />   {/* id route parameter */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
