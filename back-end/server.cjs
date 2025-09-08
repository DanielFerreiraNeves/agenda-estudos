const express = require("express");
const cors = require("cors");
const db = require("./database.cjs");
const {
  registerUser,
  loginUser,
  createPost,
  getPosts,
} = require("./authController.cjs");

const app = express();
app.use(cors());
app.use(express.json());

// Rotas existentes
app.post("/register", registerUser);
app.post("/login", loginUser);
app.post("/posts", createPost);
app.get("/posts", getPosts);

// 🔹 Novas rotas de tarefas

// GET /tarefas?username=...
app.get("/tarefas", (req, res) => {
  const { username } = req.query;
  let tarefasUsuario = db.tarefas.filter((t) => t.username === username);

  if (tarefasUsuario.length === 0) {
    const tarefasPadrao = [
      {
        id: 1,
        titulo: "Áreas e Volumes",
        materia: "Matemática",
        prof: "Carla",
        imagem:
          "https://images.pexels.com/photos/6256066/pexels-photo-6256066.jpeg?_gl=1*1pxde8z*_ga*NjE2NjE4NTAyLjE3NTU1NjE1NzI.*_ga_8JE65Q40S6*czE3NTcwMDgwNDYkbzQkZzEkdDE3NTcwMDg3NTQkajU3JGwwJGgw",
        tipo: "Tarefa",
        data: "hoje",
        username,
      },
      {
        id: 2,
        titulo: "Revolução Industrial",
        materia: "História",
        prof: "Pedro",
        imagem:
          "https://images.pexels.com/photos/164268/pexels-photo-164268.jpeg?_gl=1*1xmrps7*_ga*NjE2NjE4NTAyLjE3NTU1NjE1NzI.*_ga_8JE65Q40S6*czE3NTcwMDgwNDYkbzQkZzEkdDE3NTcwMDg5MjYkajUzJGwwJGgw",
        tipo: "Tarefa",
        data: "amanha",
        username,
      },
      {
        id: 3,
        titulo: "Vocabulário",
        materia: "Espanhol",
        prof: "Marcos",
        imagem:
          "https://images.pexels.com/photos/54097/spain-flag-flutter-spanish-54097.jpeg?_gl=1*8w99d9*_ga*NjE2NjE4NTAyLjE3NTU1NjE1NzI.*_ga_8JE65Q40S6*czE3NTcwMDgwNDYkbzQkZzEkdDE3NTcwMDkxMTAkajU0JGwwJGgw",
        tipo: "Tarefa",
        data: "semana",
        username,
      },
    ];

    tarefasUsuario = tarefasPadrao.map((t) => ({
      ...t,
      id: Date.now() + Math.random(),
    }));
    db.tarefas.push(...tarefasUsuario);
  }

  res.json(tarefasUsuario);
});

// POST /tarefas
app.post("/tarefas", (req, res) => {
  const tarefa = { ...req.body, id: Date.now() }; // id único
  db.tarefas.push(tarefa);
  res.json(tarefa);
});

// DELETE /tarefas/:id?username=...
app.delete("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  const { username } = req.query;
  db.tarefas = db.tarefas.filter((t) => t.id !== id || t.username !== username);
  res.json({ ok: true });
});

// Inicializa o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
