// src/pages/NovaTarefa.tsx
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import type { DataCategoria } from "../services/api";

import Sidebar from "../components/Sidebar";

const NovaTarefa = () => {
  const navigate = useNavigate();
  const username =
    JSON.parse(localStorage.getItem("user") || "{}").username || "Aluno";

  const [form, setForm] = useState({
    titulo: "",
    materia: "",
    prof: "",
    imagem: "",
    tipo: "Tarefa",
    data: "semana" as DataCategoria,
  });
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async () => {
    setErro("");
    if (!form.titulo || !form.materia) {
      setErro("Preencha pelo menos Título e Matéria.");
      return;
    }
    try {
      setSalvando(true);
      await api.createTarefa({
        ...form,
        username,
      });
      navigate("/dashboard", { replace: true });
    } catch (e: any) {
      setErro(e?.message || "Erro ao criar tarefa.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, marginLeft: "200px", p: 4 }}>
        <Typography variant="h4" sx={{ color: "var(--text-dark)", mb: 2 }}>
          Nova Tarefa
        </Typography>
        <Typography sx={{ color: "var(--text-light)", mb: 3 }}>
          Preencha os dados abaixo para cadastrar uma nova tarefa.
        </Typography>

        <Paper sx={{ p: 3, maxWidth: 640 }}>
          <TextField
            label="Título"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Matéria"
            name="materia"
            value={form.materia}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Professor (opcional)"
            name="prof"
            value={form.prof}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="URL da Imagem (opcional)"
            name="imagem"
            value={form.imagem}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tipo"
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            select
            fullWidth
            margin="normal"
          >
            <MenuItem value="Tarefa">Tarefa</MenuItem>
            <MenuItem value="Prova">Prova</MenuItem>
            <MenuItem value="Trabalho">Trabalho</MenuItem>
          </TextField>

          <TextField
            label="Quando"
            name="data"
            value={form.data}
            onChange={handleChange}
            select
            fullWidth
            margin="normal"
            helperText="Categoria usada no Dashboard"
          >
            <MenuItem value="hoje">Hoje</MenuItem>
            <MenuItem value="amanha">Amanhã</MenuItem>
            <MenuItem value="semana">Essa Semana</MenuItem>
          </TextField>

          {erro && (
            <Typography color="error" sx={{ mt: 1 }}>
              {erro}
            </Typography>
          )}

          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => navigate("/dashboard")}
              disabled={salvando}
            >
              Voltar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={salvando}
            >
              {salvando ? "Salvando..." : "Salvar"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default NovaTarefa;
