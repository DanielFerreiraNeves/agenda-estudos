// src/pages/Dashboard.tsx
import Sidebar from "../components/Sidebar";
import {
  Box,
  Button,
  Typography,
  Grid,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ModalDetalhes from "../components/ModalDetalhes";
import CardTarefa from "../components/CardTarefa";
import { tarefas as tarefasPadrao } from "../data/mocks";
import { api } from "../services/api";
import type { TarefaDTO } from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string>("");
  const [selectedTarefa, setSelectedTarefa] = useState({
    id: 0,
    nomeTarefa: "",
    materia: "",
    tipo: "Tarefa" as const,
    professor: "",
  });

  const [tarefas, setTarefas] = useState<TarefaDTO[]>([]);

  const username =
    JSON.parse(localStorage.getItem("user") || "{}").username || "Aluno";

  const mapServerToLocal = useCallback(
    (arr: any[]): TarefaDTO[] => {
      return (arr || []).map((t: any) => ({
        id: Number(t.id),
        titulo: t.titulo ?? t.nomeTarefa ?? "",
        materia: t.materia ?? "",
        prof: t.prof ?? t.professor ?? "",
        imagem: t.imagem ?? "",
        tipo: t.tipo ?? "Tarefa",
        data: t.data ?? "semana",
        username: t.username ?? username,
      }));
    },
    [username]
  );

  const seedComMocksSeVazio = useCallback(async () => {
    // 🔹 Só faz seed se ainda não foi feito para este usuário
    if (localStorage.getItem(`seeded_${username}`)) return [];

    const promises = tarefasPadrao.map((t) =>
      api.createTarefa({
        titulo: t.titulo || "",
        materia: t.materia || "",
        prof: t.prof || "",
        imagem: t.imagem || "",
        tipo: t.tipo || "Tarefa",
        data: (t.data as TarefaDTO["data"]) || "semana",
        username,
      })
    );
    const criadas = await Promise.all(promises);
    localStorage.setItem(`seeded_${username}`, "true"); // marca como seedado
    return mapServerToLocal(criadas);
  }, [username, mapServerToLocal]);

  const carregarTarefas = useCallback(async () => {
    setLoading(true);
    setErro("");
    try {
      const lista = await api.getTarefas(username);
      setTarefas(lista);
    } catch (e: any) {
      setErro(e?.message || "Erro ao carregar tarefas.");
      setTarefas([]);
    } finally {
      setLoading(false);
    }
  }, [username]);
  useEffect(() => {
    carregarTarefas();
  }, [carregarTarefas]);

  const handleOpenModal = (tarefa: TarefaDTO) => {
    setSelectedTarefa({
      id: tarefa.id || 0,
      nomeTarefa: tarefa.titulo,
      materia: tarefa.materia,
      tipo: (tarefa.tipo as any) || "Tarefa",
      professor: tarefa.prof || "",
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleDelete = async (id?: number) => {
    if (!id) return;
    const ok = window.confirm("Tem certeza que deseja excluir esta tarefa?");
    if (!ok) return;
    try {
      await api.deleteTarefa(id, username);
      setTarefas((prev) => prev.filter((t) => t.id !== id));
    } catch (e: any) {
      alert(e?.message || "Erro ao excluir tarefa.");
    }
  };

  const renderSecao = (titulo: string, filtro: TarefaDTO["data"]) => (
    <>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          sx={{
            color: "var(--text-dark)",
            mb: 2,
            mt: titulo !== "Hoje" ? 4 : 0,
          }}
        >
          {titulo}
        </Typography>
      </Grid>
      {tarefas
        .filter((t) => t.data === filtro)
        .map((tarefa) => (
          <Grid item xs={12} sm={6} md={4} key={tarefa.id ?? Math.random()}>
            <Box
              sx={{ position: "relative" }}
              onClick={() => handleOpenModal(tarefa)}
            >
              <Tooltip title="Excluir tarefa">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(tarefa.id);
                  }}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: "rgba(255,255,255,0.85)",
                    "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                    zIndex: 2,
                  }}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <CardTarefa
                materia={tarefa.materia || ""}
                titulo={tarefa.titulo || ""}
                prof={tarefa.prof || ""}
                imagem={tarefa.imagem || ""}
                onClick={() => handleOpenModal(tarefa)}
              />
            </Box>
          </Grid>
        ))}
    </>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, marginLeft: "200px", padding: 4 }}>
        <Typography variant="h4" sx={{ color: "var(--text-dark)", mb: 2 }}>
          Dashboard
        </Typography>
        <Typography sx={{ color: "var(--text-light)", mb: 4 }}>
          Boas-Vindas, {username || "Aluno"}!
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <CircularProgress size={24} />
            <Typography>Carregando suas tarefas…</Typography>
          </Box>
        ) : (
          <>
            {erro && (
              <Typography color="error" sx={{ mb: 2 }}>
                {erro}
              </Typography>
            )}
            <Grid container spacing={3}>
              {renderSecao("Hoje", "hoje")}
              {renderSecao("Amanhã", "amanha")}
              {renderSecao("Essa Semana", "semana")}
            </Grid>
          </>
        )}

        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/nova-tarefa")}
          >
            Nova Tarefa
          </Button>
        </Box>

        <ModalDetalhes
          open={openModal}
          onClose={handleCloseModal}
          tarefa={selectedTarefa}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
