import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import Work from './pages/Work';
import AboutPage from './pages/AboutPage';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';

import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import ProjectDetail from './pages/ProjectDetail';
import { ReactLenis } from 'lenis/react';

function App() {
  return (
    <ReactLenis root>
      <CustomCursor />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:id" element={<ProjectDetail />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </ReactLenis>
  );
}

export default App;