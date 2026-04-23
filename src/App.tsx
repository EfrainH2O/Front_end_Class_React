import { useState, useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './views/Login';
import { Home } from './views/Home';
import { Dashboard } from './views/Dashboard';
import Admin from './views/Admin';
import type { FullUserData, UserData } from './types';

const API_URL = "http://localhost:3200";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [users, setUsers] = useState<UserData[]>([]);

  const LogInFunction = async ({ username, password }: { username: string; password: string }) => {
    const res = await fetch(API_URL + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    return await res.json();
  };

  const fetchUsers = async () => {
    const res = await fetch(API_URL + "/users");
    const data = await res.json();
    setUsers(data);
  };

  const DelUser = async (idUser: string) => {
    const res = await fetch(API_URL + "/user", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: idUser })
    });
    await res.json();
    setUsers(users.filter((u) => u._id !== idUser));
  };

  const Adduser = async (newUser: FullUserData) =>{

    const realUser: UserData = {
                userName: newUser.username,
                name: newUser.name,
                _id : "1"
            };


    const res = await fetch(API_URL + "/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    });
    await res.json();
    setUsers([...users, realUser]);
    return newUser;
  }

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar onLogout={logout} />

      <Routes>
        <Route 
          path="/" 
          element={!isAuthenticated ? <Login onLogin={login} logInApi={LogInFunction} /> : <Navigate to="/home" />} 
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
          element={isAuthenticated ? <Admin users={users} delUser={DelUser} addUser={Adduser}/> : <Navigate to="/" />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;