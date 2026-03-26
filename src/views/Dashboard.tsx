import { Typography, Container } from '@mui/material';

export const Dashboard: React.FC = () => (
  <Container sx={{ mt: 4 }}>
    <Typography variant="h4">Panel de Control (Vista 2)</Typography>
    <Typography color="text.secondary">Aquí irían tus estadísticas o datos secundarios.</Typography>
  </Container>
);
