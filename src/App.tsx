import { useState } from 'react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './views/Login';
import { Home } from './views/Home';
import { Dashboard } from './views/Dashboard';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar onLogout={logout} />

      <Routes>
        <Route 
          path="/" 
          element={!isAuthenticated ? <Login onLogin={login} /> : <Navigate to="/home" />} 
        />
        
        <Route 
          path="/home" 
          element={isAuthenticated ? <Home /> : <Navigate to="/" />} 
        />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
