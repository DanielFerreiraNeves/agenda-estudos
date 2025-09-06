import Sidebar from '../components/Sidebar';
import { Box, Paper, Typography, Button } from '@mui/material';
import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, addMonths, subMonths, getDay, startOfWeek, endOfWeek } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

const Calendario = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 8, 1)); // Setembro 2025 como padrão
  
  // Pegar o início e fim da semana para incluir dias do mês anterior/próximo
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 }); // Domingo = 0
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });
  
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const getBackgroundColor = (day: Date) => {
    const dayNum = day.getDate();
    if (dayNum === 1) return 'var(--calendar-purple, #8B5CF6)'; // Início do mês
    if ([5, 10, 15].includes(dayNum)) return 'var(--calendar-green, #10B981)'; // Dias com tarefas
    if ([20].includes(dayNum)) return 'var(--calendar-red, #EF4444)'; // Dia especial
    return 'transparent';
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
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
        alignItems: 'center' // Centraliza todo o conteúdo
      }}>
        <Typography variant="h4" sx={{ color: 'var(--text-dark, #1F2937)', mb: 3 }}>
          Calendário
        </Typography>
        
        <Paper sx={{ p: 3, width: '100%', maxWidth: '800px' }}>
          {/* Header com navegação */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 3 
          }}>
            <Button 
              variant="outlined" 
              onClick={handlePrevMonth}
              sx={{ textTransform: 'none' }}
            >
              ANTERIOR
            </Button>
            <Typography variant="h6" sx={{ 
              color: 'var(--text-dark, #1F2937)',
              fontWeight: 'bold',
              textTransform: 'lowercase'
            }}>
              {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
            </Typography>
            <Button 
              variant="outlined" 
              onClick={handleNextMonth}
              sx={{ textTransform: 'none' }}
            >
              PRÓXIMO
            </Button>
          </Box>

          {/* Legenda dos eventos */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 4, 
            mt: 3,
            flexWrap: 'wrap'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ 
                width: '12px', 
                height: '12px', 
                backgroundColor: 'var(--calendar-purple, #8B5CF6)', 
                borderRadius: '3px' 
              }} />
              <Typography sx={{ fontSize: '12px', color: '#6B7280' }}>
                Início do mês
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ 
                width: '12px', 
                height: '12px', 
                backgroundColor: 'var(--calendar-green, #10B981)', 
                borderRadius: '3px' 
              }} />
              <Typography sx={{ fontSize: '12px', color: '#6B7280' }}>
                Tarefas
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ 
                width: '12px', 
                height: '12px', 
                backgroundColor: 'var(--calendar-red, #EF4444)', 
                borderRadius: '3px' 
              }} />
              <Typography sx={{ fontSize: '12px', color: '#6B7280' }}>
                Eventos especiais
              </Typography>
            </Box>
          </Box>

          {/* Grid do calendário */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 0,
            border: '1px solid #E5E7EB',
            borderRadius: 2,
            overflow: 'hidden'
          }}>
            {/* Cabeçalho dos dias da semana */}
            {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (
              <Box
                key={day + index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '40px',
                  backgroundColor: '#F9FAFB',
                  fontWeight: 'bold',
                  color: 'var(--text-dark, #1F2937)',
                  fontSize: '14px',
                  borderBottom: '1px solid #E5E7EB',
                  borderRight: index < 6 ? '1px solid #E5E7EB' : 'none'
                }}
              >
                {day}
              </Box>
            ))}

            {/* Dias do calendário */}
            {days.map((day, index) => {
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const backgroundColor = isCurrentMonth ? getBackgroundColor(day) : 'transparent';
              const hasSpecialColor = backgroundColor !== 'transparent';
              
              return (
                <Box
                  key={day.toISOString()}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '50px',
                    backgroundColor: backgroundColor,
                    color: isCurrentMonth 
                      ? (hasSpecialColor ? 'white' : 'var(--text-dark, #1F2937)')
                      : 'var(--text-light, #9CA3AF)',
                    cursor: 'pointer',
                    borderBottom: Math.floor(index / 7) < Math.floor((days.length - 1) / 7) ? '1px solid #E5E7EB' : 'none',
                    borderRight: (index + 1) % 7 !== 0 ? '1px solid #E5E7EB' : 'none',
                    fontSize: '14px',
                    fontWeight: isCurrentMonth ? '500' : '400',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: hasSpecialColor 
                        ? backgroundColor 
                        : 'var(--secondary-blue, #EBF4FF)',
                      transform: 'scale(0.95)',
                    },
                  }}
                  onClick={() => {
                    if (isCurrentMonth) {
                      console.log(`Clicou no dia ${format(day, 'd/MM/yyyy')}`);
                    }
                  }}
                >
                  {format(day, 'd')}
                </Box>
              );
            })}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Calendario;