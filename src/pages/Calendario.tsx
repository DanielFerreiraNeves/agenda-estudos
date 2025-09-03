import Sidebar from '../components/Sidebar';
import { Box, Paper, Grid, Typography } from '@mui/material';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

const Calendario = () => {
  const currentMonth = new Date(2025, 7, 1); // Agosto 2025 como exemplo
  const days = eachDayOfInterval({ start: startOfMonth(currentMonth), end: endOfMonth(currentMonth) });

  const getBackgroundColor = (day: Date) => {
    const dayNum = day.getDate();
    if (dayNum === 1) return 'var(--calendar-purple)';
    if ([15, 20].includes(dayNum)) return 'var(--calendar-green)'; // Exemplo de dias destacados
    if ([11].includes(dayNum)) return 'var(--calendar-red)'; // Exemplo de outro dia
    return 'transparent';
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ marginLeft: '200px', padding: 4, width: '100%' }}>
        <Typography variant="h4" sx={{ color: 'var(--text-dark)' }}>Calendário</Typography>
        <Paper>
          <Typography sx={{ mb: 2 }}>{format(currentMonth, 'MMMM yyyy', { locale: ptBR })}</Typography>
          <Grid container spacing={1}>
            {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(day => (
              <Grid item xs={1.7} key={day}>
                <Typography sx={{ fontWeight: 'bold', color: 'var(--text-dark)' }}>{day}</Typography>
              </Grid>
            ))}
            {days.map(day => (
              <Grid item xs={1.7} key={day.toISOString()}>
                <Box
                  className={`calendar-day ${getBackgroundColor(day) ? 'highlight' : ''}`}
                  sx={{
                    backgroundColor: getBackgroundColor(day),
                    color: isSameMonth(day, currentMonth) ? 'var(--text-dark)' : 'var(--text-light)',
                  }}
                >
                  {format(day, 'd')}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default Calendario;