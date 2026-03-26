import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Mi App TS</Typography>
        <Button color="inherit" onClick={() => navigate('/home')}>Inicio</Button>
        <Button color="inherit" onClick={() => navigate('/dashboard')}>Panel</Button>
        <Button 
          color="secondary" 
          variant="contained" 
          onClick={onLogout} 
          sx={{ ml: 2 }}
        >
          Salir
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
