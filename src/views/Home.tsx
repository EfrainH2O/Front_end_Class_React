import { Typography, Container } from '@mui/material';

export const Home: React.FC = () => (
  <Container sx={{ mt: 4 }}>
    <Typography variant="h4">Página de Inicio (Vista 1)</Typography>
    <Typography color="text.secondary">Estás autenticado correctamente.</Typography>
  </Container>
);
