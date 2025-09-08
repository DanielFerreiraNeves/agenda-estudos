// authController.cjs
const bcrypt = require("bcryptjs");
const db = require("./database.cjs");

// Função para registrar um novo usuário
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Nome de usuário e senha são obrigatórios." });
  }

  // Checa se o usuário já existe
  if (db.users.find((user) => user.username === username)) {
    return res.status(409).json({ message: "Nome de usuário já existe." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };

    db.users.push(newUser); // Salva no "banco"
    console.log("Novo usuário cadastrado:", newUser);

    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao registrar o usuário." });
  }
};

// Função para login
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = db.users.find((u) => u.username === username);

  if (!user) {
    return res.status(400).json({ message: "Usuário ou senha incorretos." });
  }

  try {
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      res.status(200).json({
        message: "Login realizado com sucesso!",
        username: user.username,
      });
    } else {
      res.status(400).json({ message: "Usuário ou senha incorretos." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no login." });
  }
};

// Função para criar post
const createPost = (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res
      .status(400)
      .json({ message: "Título, conteúdo e autor são obrigatórios." });
  }

  const newPost = {
    id: db.posts.length + 1,
    title,
    content,
    author,
    createdAt: new Date(),
  };

  db.posts.push(newPost);
  console.log("Novo post criado:", newPost);

  res.status(201).json({ message: "Post criado com sucesso!", post: newPost });
};

// Função para listar posts
const getPosts = (req, res) => {
  res.status(200).json({ posts: db.posts });
};

// Exporta tudo em CommonJS
module.exports = { registerUser, loginUser, createPost, getPosts };
