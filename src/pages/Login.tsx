import { useNavigate, Link } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Erro ao logar");
        return;
      }

      localStorage.setItem("user", JSON.stringify({ username: form.username }));
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError("Erro de conexão com servidor.");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Fundo */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage:
            "url(https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
      />
      {/* Conteúdo */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: 4,
            borderRadius: 2,
            width: "100%",
            maxWidth: "400px",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h4" sx={{ color: "var(--text-dark)", mb: 3 }}>
            AgendaEstudos
          </Typography>
          <TextField
            label="Usuário"
            name="username"
            value={form.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Senha"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mb: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            sx={{ mt: 2, mb: 1 }}
          >
            Entrar
          </Button>
          <Typography sx={{ color: "var(--text-light)", mb: 1 }}>
            Esqueceu a senha?
          </Typography>
          <Link
            to="/cadastro"
            style={{ color: "var(--primary-blue)", textDecoration: "none" }}
          >
            Criar uma conta
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
