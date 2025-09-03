import Sidebar from '../components/Sidebar';
import { Box, Button, TextField, FormControlLabel, Radio, RadioGroup, Select, MenuItem } from '@mui/material';

const NovaTarefa = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ marginLeft: '200px', padding: 4, width: '100%' }}>
        <Typography variant="h4">Nova Tarefa</Typography>
        <TextField label="Título" fullWidth margin="normal" />
        <Select label="Matéria" fullWidth>
          <MenuItem value="Matemática">Matemática</MenuItem>
          {/* Mais opções */}
        </Select>
        <RadioGroup row>
          <FormControlLabel value="Prova" control={<Radio />} label="Prova" />
          <FormControlLabel value="Trabalho" control={<Radio />} label="Trabalho" />
          <FormControlLabel value="Tarefa" control={<Radio />} label="Tarefa" />
        </RadioGroup>
        <TextField label="Data de entrega" placeholder="dd/mm/aaaa" fullWidth margin="normal" />
        <RadioGroup row>
          <FormControlLabel value="Baixa" control={<Radio />} label="Baixa" />
          <FormControlLabel value="Média" control={<Radio />} label="Média" />
          <FormControlLabel value="Alta" control={<Radio />} label="Alta" />
        </RadioGroup>
        <TextField label="Observações" multiline rows={4} fullWidth margin="normal" />
        <Button variant="contained" color="primary">Salvar</Button>
      </Box>
    </Box>
  );
};

export default NovaTarefa;