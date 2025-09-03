import Sidebar from '../components/Sidebar';
import { Box, Button, Typography, Grid } from '@mui/material';
import CardTarefa from '../components/CardTarefa';
import { tarefas } from '../data/mocks';
// Importe ModalDetalhes e use state para abrir/fechar

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ marginLeft: '200px', padding: 4, width: '100%' }}>
        <Typography variant="h4">Dashboard</Typography>
        <Typography>Boas-Vindas, Nicolas!</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}><Typography variant="h5">Hoje</Typography></Grid>
          {/* Mapeie tarefas.filter(t => t.data === 'hoje').map(...) com CardTarefa */}
          {/* Similar para Amanhã e Essa Semana */}
        </Grid>
        <Button variant="contained" color="primary">Nova tarefa</Button>
      </Box>
    </Box>
  );
};

export default Dashboard;