import { useState } from 'react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './views/Login';
import { Home } from './views/Home';
import { Dashboard } from './views/Dashboard';
import Admin from './views/Admin';
import UserDetail from './views/UserDetail';
import LifeCycle from './components/LifeCycle';
import { useAuth } from './hooks/useAuth';
import { useAdmin } from './hooks/useAdmin';

function App() {
  const [showComponent, setShow] = useState<boolean>(true);
  const { isAuthenticated, login, logout, logInApi } = useAuth();
  const { users, delUser, addUser } = useAdmin(isAuthenticated);

  return (
    <div>
      <BrowserRouter>
        <CssBaseline />
        <Navbar onLogout={logout} />

        <Routes>
          <Route 
            path="/" 
            element={!isAuthenticated ? <Login onLogin={login} logInApi={logInApi} /> : <Navigate to="/home" />} 
          />
          
          <Route 
            path="/home" 
            element={isAuthenticated ? <Home /> : <Navigate to="/" />} 
          />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} 
          />

          <Route 
            path="/admin" 
            element={isAuthenticated ? <Admin users={users} delUser={delUser} addUser={addUser}/> : <Navigate to="/" />} 
          />

          <Route 
            path="/user/:id" 
            element={isAuthenticated ? <UserDetail users={users} /> : <Navigate to="/" />} 
          />
        </Routes>
      </BrowserRouter>

      <div style={{ padding: '20px' }}>
        {showComponent && <LifeCycle/>}
        <button onClick={() => setShow(!showComponent)}>
          {showComponent ? "Ocultar Ciclo de Vida" : "Mostrar Ciclo de Vida"}
        </button>
      </div>
    </div>
  );
}

export default App;
