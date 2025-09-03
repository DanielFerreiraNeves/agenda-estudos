import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulação de login
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        height: '100vh', // Garante que ocupe toda a altura da viewport
        width: '100vw', // Garante que ocupe toda a largura da viewport
        position: 'relative', // Permite posicionamento relativo para o formulário
        overflow: 'hidden', // Evita overflow da imagem
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?_gl=1*wjrgl9*_ga*NjE2NjE4NTAyLjE3NTU1NjE1NzI.*_ga_8JE65Q40S6*czE3NTYzOTc5NjUkbzIkZzEkdDE3NTYzOTg5NjAkajU0JGwwJGgw)', // Substitua por imagem real
          backgroundSize: 'cover', // Faz a imagem cobrir toda a área
          backgroundPosition: 'center', // Centraliza a imagem
          backgroundRepeat: 'no-repeat', // Evita repetição
          zIndex: 0, // Coloca a imagem no fundo
        }}
      />
      <Box
        sx={{
          position: 'relative', // Posiciona o formulário sobre a imagem
          zIndex: 1, // Garante que o formulário fique acima da imagem
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%', // Ocupa toda a altura do container
          width: '100%', // Ocupa toda a largura do container
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fundo semitransparente
            padding: 4,
            borderRadius: 2,
            width: '100%', // Ocupa 100% da largura disponível
            maxWidth: '400px', // Limita a largura máxima
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra leve
          }}
        >
          <Typography variant="h4" sx={{ color: 'var(--text-dark)', mb: 3 }}>
            AgendaEstudos
          </Typography>
          <TextField label="Usuário" fullWidth margin="normal" />
          <TextField label="Senha" type="password" fullWidth margin="normal" />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            sx={{ mt: 2, mb: 1 }}
          >
            Entrar
          </Button>
          <Typography sx={{ color: 'var(--text-light)', mb: 1 }}>
            Esqueceu a senha?
          </Typography>
          <Link
            to="/cadastro"
            style={{ color: 'var(--primary-blue)', textDecoration: 'none' }}
          >
            Criar uma conta
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;