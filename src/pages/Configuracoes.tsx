import Sidebar from '../components/Sidebar';
import { Box, Button, TextField, Avatar } from '@mui/material';

const Configuracoes = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ marginLeft: '200px', padding: 4, width: '100%' }}>
        <Avatar sx={{ width: 56, height: 56, margin: 'auto' }} />
        <TextField label="Nome" fullWidth margin="normal" />
        <TextField label="E-mail" fullWidth margin="normal" />
        <TextField label="Senha" type="password" fullWidth margin="normal" />
        <TextField label="Data de nascimento" placeholder="dd/mm/aaaa" fullWidth margin="normal" />
        <Button variant="contained" color="primary">Salvar</Button>
        <Button variant="contained" color="error" sx={{ ml: 2 }}>Logout</Button>
      </Box>
    </Box>
  );
};

export default Configuracoes;