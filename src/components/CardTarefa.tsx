import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const CardTarefa = ({ materia, titulo, prof, imagem, onClick }: any) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 8, // Bordas arredondadas (ajuste conforme protótipo)
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Sombra leve
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)', // Efeito hover (opcional, se o protótipo tiver)
        },
      }}
      onClick={onClick}
    >
      <CardMedia component="img" height="140" image={imagem} alt={titulo} />
      <CardContent>
        <Typography variant="h6" sx={{ color: 'var(--text-dark)' }}>
          {materia}
        </Typography>
        <Typography>{titulo}</Typography>
        <Typography sx={{ color: 'var(--text-light)' }}>Prof.(a) {prof}</Typography>
      </CardContent>
    </Card>
  );
};

export default CardTarefa;