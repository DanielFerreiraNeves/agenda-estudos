import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from '@mui/material';

interface ModalDetalhesProps {
  open: boolean;
  onClose: () => void;
  tarefa: {
    id: number;
    nomeTarefa: string;
    materia: string;
    tipo: 'Prova' | 'Trabalho' | 'Tarefa';
    professor?: string;
  };
}

const ModalDetalhes = ({ open, onClose, tarefa }: ModalDetalhesProps) => {
  const [editedTarefa, setEditedTarefa] = useState(tarefa);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTarefa({ ...editedTarefa, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTarefa({ ...editedTarefa, tipo: e.target.value as 'Prova' | 'Trabalho' | 'Tarefa' });
  };

  const handleSave = () => {
    // Lógica para salvar (simulada por agora)
    console.log('Tarefa editada:', editedTarefa);
    onClose();
  };

  const handleDelete = () => {
    // Lógica para excluir (simulada por agora)
    console.log('Tarefa excluída:', editedTarefa.id);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Detalhes da Tarefa</DialogTitle>
      <DialogContent>
        <TextField
          label="Nome da Tarefa"
          name="nomeTarefa"
          value={editedTarefa.nomeTarefa}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Matéria"
          name="materia"
          value={editedTarefa.materia}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <RadioGroup
          row
          value={editedTarefa.tipo}
          onChange={handleTypeChange}
          name="tipo"
        >
          <FormControlLabel value="Prova" control={<Radio />} label="Prova" />
          <FormControlLabel value="Trabalho" control={<Radio />} label="Trabalho" />
          <FormControlLabel value="Tarefa" control={<Radio />} label="Tarefa" />
        </RadioGroup>
        {editedTarefa.professor && (
          <Typography sx={{ mt: 1 }}>Professor(a): {editedTarefa.professor}</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Salvar
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDetalhes;