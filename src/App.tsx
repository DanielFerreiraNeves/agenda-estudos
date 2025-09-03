import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Dashboard from './pages/Dashboard';
import Calendario from './pages/Calendario';
import Configuracoes from './pages/Configuracoes';
import NovaTarefa from './pages/NovaTarefa';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/nova-tarefa" element={<NovaTarefa />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;