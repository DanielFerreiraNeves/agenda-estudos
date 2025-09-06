import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';

const Cadastro = () => {
  const navigate = useNavigate();

  const handleCadastro = () => {
    // Simulação de cadastro (pode adicionar validação real depois)
    console.log('Cadastro realizado com sucesso!');
    navigate('/'); // Redireciona para a tela de login
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'ur[](https://example.com/escola-background.jpg)', // Substitua por imagem real
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: 4,
            borderRadius: 2,
            width: '100%',
            maxWidth: '400px', // Ajuste conforme o protótipo
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h4" sx={{ color: 'var(--text-dark)', mb: 3 }}>
            Criar Conta
          </Typography>
          <TextField label="Nome Completo" fullWidth margin="normal" />
          <TextField label="E-mail" type="email" fullWidth margin="normal" />
          <TextField label="Senha" type="password" fullWidth margin="normal" />
          <TextField
            label="Confirmar Senha"
            type="password"
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCadastro}
            sx={{ mt: 2, mb: 1 }}
          >
            Criar Conta
          </Button>
          <Typography sx={{ color: 'var(--text-light)', mb: 1 }}>
            Já tem uma conta?
          </Typography>
          <Link to="/" style={{ color: 'var(--primary-blue)', textDecoration: 'none' }}>
            Entrar
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Cadastro;