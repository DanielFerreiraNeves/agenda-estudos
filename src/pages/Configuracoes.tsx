import Sidebar from '../components/Sidebar';
import { Box, Button, TextField, Avatar, Typography, Paper } from '@mui/material';
import { useState } from 'react';

const Configuracoes = () => {
  const [userData, setUserData] = useState({
    nome: 'Nicolas',
    email: 'nicolas@example.com',
    senha: '',
    dataNascimento: '01/01/2000',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log('Dados salvos:', userData);
    // Lógica de salvamento (simulada)
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/'; // Redireciona para login
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ 
        flexGrow: 1, 
        marginLeft: '200px', 
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}>
        <Typography variant="h4" sx={{ 
          color: 'var(--text-dark, #1F2937)', 
          mb: 4,
          textAlign: 'center',
          width: '100%'
        }}>
          Configurações
        </Typography>

        <Paper sx={{
          p: 4,
          width: '100%',
          maxWidth: '500px',
          margin: '0 auto',
          boxShadow: '0 8px 25px -5px rgba(0, 0, 0, 0.1)',
          borderRadius: 3,
          backgroundColor: 'white'
        }}>
          {/* Avatar centralizado */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mb: 4 
          }}>
            <Avatar sx={{ 
              width: 100, 
              height: 100, 
              bgcolor: 'var(--primary-blue, #3B82F6)',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
            }}>
              N
            </Avatar>
          </Box>

          {/* Formulário */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Nome"
              name="nome"
              value={userData.nome}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#F9FAFB',
                  '&:hover fieldset': {
                    borderColor: '#3B82F6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3B82F6',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#6B7280',
                  '&.Mui-focused': {
                    color: '#3B82F6',
                  },
                },
              }}
            />

            <TextField
              label="E-mail"
              name="email"
              value={userData.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#F9FAFB',
                  '&:hover fieldset': {
                    borderColor: '#3B82F6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3B82F6',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#6B7280',
                  '&.Mui-focused': {
                    color: '#3B82F6',
                  },
                },
              }}
            />

            <TextField
              label="Senha"
              name="senha"
              type="password"
              value={userData.senha}
              onChange={handleChange}
              placeholder="Digite uma nova senha"
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#F9FAFB',
                  '&:hover fieldset': {
                    borderColor: '#3B82F6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3B82F6',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#6B7280',
                  '&.Mui-focused': {
                    color: '#3B82F6',
                  },
                },
              }}
            />

            <TextField
              label="Data de Nascimento"
              name="dataNascimento"
              value={userData.dataNascimento}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              placeholder="dd/mm/aaaa"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#F9FAFB',
                  '&:hover fieldset': {
                    borderColor: '#3B82F6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3B82F6',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#6B7280',
                  '&.Mui-focused': {
                    color: '#3B82F6',
                  },
                },
              }}
            />
          </Box>

          {/* Botões */}
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            mt: 4,
            flexDirection: { xs: 'column', sm: 'row' }
          }}>
            <Button 
              variant="contained" 
              onClick={handleSave} 
              sx={{ 
                flex: 1,
                py: 2,
                borderRadius: 2,
                backgroundColor: '#3B82F6',
                textTransform: 'none',
                fontWeight: '600',
                fontSize: '16px',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                '&:hover': {
                  backgroundColor: '#2563EB',
                  boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)',
                },
              }}
            >
              Salvar
            </Button>
            
            <Button 
              variant="contained" 
              onClick={handleLogout} 
              sx={{ 
                flex: 1,
                py: 1.5,
                borderRadius: 2,
                backgroundColor: '#EF4444',
                textTransform: 'none',
                fontWeight: '600',
                fontSize: '16px',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                '&:hover': {
                  backgroundColor: '#DC2626',
                  boxShadow: '0 6px 16px rgba(239, 68, 68, 0.4)',
                },
              }}
            >
              Logout
            </Button>
          </Box>

          {/* Informação adicional */}
          <Typography sx={{
            mt: 3,
            textAlign: 'center',
            fontSize: '14px',
            color: '#6B7280',
            fontStyle: 'italic'
          }}>
            Seus dados são mantidos seguros e privados
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Configuracoes;