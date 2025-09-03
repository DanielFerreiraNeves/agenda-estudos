import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';

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

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Detalhes da tarefa</DialogTitle>
      <DialogContent>
        <TextField
          label="Nome tarefa"
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
        <RadioGroup row value={editedTarefa.tipo} onChange={handleTypeChange} name="tipo">
          <FormControlLabel value="Prova" control={<Radio />} label="Prova" />
          <FormControlLabel value="Trabalho" control={<Radio />} label="Trabalho" />
          <FormControlLabel value="Tarefa" control={<Radio />} label="Tarefa" />
        </RadioGroup>
        {editedTarefa.professor && (
          <Typography>Professor(a): {editedTarefa.professor}</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={onClose}>Editar</Button>
        <Button variant="contained" color="error" onClick={onClose}>Excluir</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDetalhes;