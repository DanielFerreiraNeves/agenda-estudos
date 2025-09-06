import Sidebar from '../components/Sidebar';
import { Box, Button, Typography, Grid } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalDetalhes from '../components/ModalDetalhes';
import CardTarefa from '../components/CardTarefa';
import { tarefas } from '../data/mocks';

const Dashboard = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedTarefa, setSelectedTarefa] = useState({
    id: 0,
    nomeTarefa: '',
    materia: '',
    tipo: 'Tarefa' as const,
    professor: '',
  });

  const handleOpenModal = (tarefa: any) => {
    setSelectedTarefa({
      id: tarefa.id,
      nomeTarefa: tarefa.titulo,
      materia: tarefa.materia,
      tipo: 'Tarefa', // Ajuste conforme os dados reais
      professor: tarefa.prof || '',
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, marginLeft: '200px', padding: 4 }}>
        <Typography variant="h4" sx={{ color: 'var(--text-dark)', mb: 2 }}>
          Dashboard
        </Typography>
        <Typography sx={{ color: 'var(--text-light)', mb: 4 }}>
          Boas-Vindas, Nicolas!
        </Typography>
        <Grid container spacing={3}>
          {/* Seção Hoje */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ color: 'var(--text-dark)', mb: 2 }}>
              Hoje
            </Typography>
          </Grid>
          {tarefas
            .filter((t) => t.data === 'hoje')
            .map((tarefa) => (
              <Grid item xs={12} sm={6} md={4} key={tarefa.id}>
                <CardTarefa
                  materia={tarefa.materia}
                  titulo={tarefa.titulo}
                  prof={tarefa.prof}
                  imagem={tarefa.imagem}
                  onClick={() => handleOpenModal(tarefa)}
                />
              </Grid>
            ))}

          {/* Seção Amanhã */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ color: 'var(--text-dark)', mb: 2, mt: 4 }}>
              Amanhã
            </Typography>
          </Grid>
          {tarefas
            .filter((t) => t.data === 'amanha')
            .map((tarefa) => (
              <Grid item xs={12} sm={6} md={4} key={tarefa.id}>
                <CardTarefa
                  materia={tarefa.materia}
                  titulo={tarefa.titulo}
                  prof={tarefa.prof}
                  imagem={tarefa.imagem}
                  onClick={() => handleOpenModal(tarefa)}
                />
              </Grid>
            ))}

          {/* Seção Essa Semana */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ color: 'var(--text-dark)', mb: 2, mt: 4 }}>
              Essa Semana
            </Typography>
          </Grid>
          {tarefas
            .filter((t) => t.data === 'semana')
            .map((tarefa) => (
              <Grid item xs={12} sm={6} md={4} key={tarefa.id}>
                <CardTarefa
                  materia={tarefa.materia}
                  titulo={tarefa.titulo}
                  prof={tarefa.prof}
                  imagem={tarefa.imagem}
                  onClick={() => handleOpenModal(tarefa)}
                />
              </Grid>
            ))}
        </Grid>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/nova-tarefa')}
          >
            Nova Tarefa
          </Button>
        </Box>
        <ModalDetalhes
          open={openModal}
          onClose={handleCloseModal}
          tarefa={selectedTarefa}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;