import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './views/Login';
import { Home } from './views/Home';
import { Dashboard } from './views/Dashboard';
import { CssBaseline } from '@mui/material';

function App() {
  // Estado tipado para la autenticación
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <BrowserRouter>
      {/* CssBaseline normaliza los estilos CSS entre navegadores */}
      <CssBaseline />

      {/* Solo se renderiza si hay sesión activa */}
      {isAuthenticated && <Navbar onLogout={logout} />}

      <Routes>
        {/* Lógica de redirección inicial */}
        <Route 
          path="/" 
          element={!isAuthenticated ? <Login onLogin={login} /> : <Navigate to="/home" />} 
        />
        
        {/* Rutas Privadas */}
        <Route 
          path="/home" 
          element={isAuthenticated ? <Home /> : <Navigate to="/" />} 
        />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} 
        />

        {/* Catch-all para rutas inexistentes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
