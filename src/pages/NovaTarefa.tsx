import Sidebar from '../components/Sidebar';
import { Box, Button, TextField, RadioGroup, FormControlLabel, Radio, Select, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NovaTarefa = () => {
  const navigate = useNavigate();
  const [tarefa, setTarefa] = useState({
    titulo: '',
    materia: '',
    tipo: 'Tarefa' as const,
    dataEntrega: '',
    prioridade: 'Média' as const,
    observacoes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target as any;
    setTarefa({ ...tarefa, [name || '']: value });
  };

  const handleSave = () => {
    // Simulação de salvamento (pode integrar com um estado global ou API depois)
    console.log('Nova tarefa criada:', tarefa);
    // Adicione lógica para adicionar ao array de tarefas, se desejar
    navigate('/dashboard');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, marginLeft: '200px', padding: 4 }}>
        <Typography variant="h4" sx={{ color: 'var(--text-dark)', mb: 3 }}>
          Nova Tarefa
        </Typography>
        <Box
          component="form"
          sx={{
            maxWidth: '500px', // Ajuste conforme o protótipo (pode ser 400px ou outro valor)
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            padding: 3,
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <TextField
            label="Título"
            name="titulo"
            value={tarefa.titulo}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Select
            label="Matéria"
            name="materia"
            value={tarefa.materia}
            onChange={handleChange}
            fullWidth
            margin="normal"
            displayEmpty
            renderValue={(selected) => (selected ? selected : 'Selecione uma matéria')}
          >
            <MenuItem value="" disabled>
              Selecione uma matéria
            </MenuItem>
            <MenuItem value="Matemática">Matemática</MenuItem>
            <MenuItem value="História">História</MenuItem>
            <MenuItem value="Física">Física</MenuItem>
            <MenuItem value="Química">Química</MenuItem>
          </Select>
          <RadioGroup
            row
            name="tipo"
            value={tarefa.tipo}
            onChange={handleChange}
            sx={{ mb: 2, mt: 1 }}
          >
            <FormControlLabel value="Prova" control={<Radio />} label="Prova" />
            <FormControlLabel value="Trabalho" control={<Radio />} label="Trabalho" />
            <FormControlLabel value="Tarefa" control={<Radio />} label="Tarefa" />
          </RadioGroup>
          <TextField
            label="Data de Entrega"
            name="dataEntrega"
            value={tarefa.dataEntrega}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{ shrink: true }}
            required
          />
          <RadioGroup
            row
            name="prioridade"
            value={tarefa.prioridade}
            onChange={handleChange}
            sx={{ mb: 2, mt: 1 }}
          >
            <FormControlLabel value="Baixa" control={<Radio />} label="Baixa" />
            <FormControlLabel value="Média" control={<Radio />} label="Média" />
            <FormControlLabel value="Alta" control={<Radio />} label="Alta" />
          </RadioGroup>
          <TextField
            label="Observações"
            name="observacoes"
            value={tarefa.observacoes}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
            placeholder="Adicione notas ou detalhes..."
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            fullWidth
            sx={{ mt: 3, py: 1.5 }} // Ajuste de padding vertical para botão maior, se no protótipo
          >
            Salvar Tarefa
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NovaTarefa;