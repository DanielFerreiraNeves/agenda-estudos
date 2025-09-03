import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>AgendaEstudos</h2>
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon><AssignmentIcon /></ListItemIcon>
          <ListItemText primary="Tarefas" />
        </ListItem>
        <ListItem button component={Link} to="/calendario">
          <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
          <ListItemText primary="Calendário" />
        </ListItem>
        <ListItem button component={Link} to="/configuracoes">
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Configurações" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;