import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const CardTarefa = ({ materia, titulo, prof, imagem }: any) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={imagem} />
      <CardContent>
        <Typography variant="h6">{materia}</Typography>
        <Typography>{titulo}</Typography>
        <Typography>Prof.(a) {prof}</Typography>
      </CardContent>
    </Card>
  );
};

export default CardTarefa;