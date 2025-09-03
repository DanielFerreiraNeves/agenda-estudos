import { Box, Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Cadastro = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f2f5' }}>
      <Box sx={{ backgroundColor: 'white', padding: 4, borderRadius: 2, textAlign: 'center' }}>
        <Typography variant="h5">Tela de cadastro</Typography>
        <TextField label="Nome" fullWidth margin="normal" />
        <TextField label="E-mail" fullWidth margin="normal" />
        <TextField label="Senha" type="password" fullWidth margin="normal" />
        <TextField label="Confirmar senha" type="password" fullWidth margin="normal" />
        <Button variant="contained" color="primary" fullWidth>Cadastrar</Button>
        <Link to="/">Já tem conta? Faça login</Link>
      </Box>
    </Box>
  );
};

export default Cadastro;