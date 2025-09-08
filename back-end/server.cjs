// server.cjs
const express = require("express");
const cors = require("cors");
const {
  registerUser,
  loginUser,
  createPost,
  getPosts,
} = require("./authController.cjs");

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.post("/register", registerUser);
app.post("/login", loginUser);
app.post("/posts", createPost);
app.get("/posts", getPosts);

// Inicializa o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
