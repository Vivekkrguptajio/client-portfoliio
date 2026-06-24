import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import Work from './pages/Work';
import AboutPage from './pages/AboutPage';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<Work />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;