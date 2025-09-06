import { Link, useLocation } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Box, Typography, Divider, IconButton, Tooltip } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SettingsIcon from '@mui/icons-material/Settings';
import BookIcon from '@mui/icons-material/Book';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      text: 'Tarefas',
      icon: <AssignmentIcon />,
      path: '/dashboard',
    },
    {
      text: 'Calendário',
      icon: <CalendarTodayIcon />,
      path: '/calendario',
    },
    {
      text: 'Configurações',
      icon: <SettingsIcon />,
      path: '/configuracoes',
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Box
      sx={{
        width: collapsed ? '60px' : '200px', // Reduzido de 240px para 200px expandido, 70px para 60px recolhido
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
        boxShadow: '4px 0 20px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
      }}
    >
      {/* Header da Sidebar */}
      <Box
        sx={{
          p: collapsed ? 1.5 : 2, // Reduzido padding para compactar
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          gap: 1, // Reduzido gap para compactar
          minHeight: '60px', // Reduzido de 70px para 60px
        }}
      >
        {!collapsed && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 32, // Reduzido de 40px
                height: 32, // Reduzido de 40px
                borderRadius: 2,
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
              }}
            >
              <BookIcon sx={{ color: 'white', fontSize: 20 }} /> {/* Reduzido de 24px */}
            </Box>
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                fontWeight: '700',
                fontSize: '18px', // Reduzido de 20px
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap',
              }}
            >
              AgendaEstudos
            </Typography>
          </Box>
        )}
        
        {collapsed && (
          <Box
            sx={{
              width: 32, // Reduzido de 40px
              height: 32, // Reduzido de 40px
              borderRadius: 2,
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
            }}
          >
            <BookIcon sx={{ color: 'white', fontSize: 20 }} /> {/* Reduzido de 24px */}
          </Box>
        )}
        
        <IconButton
          onClick={toggleSidebar}
          sx={{
            color: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
            width: 32, // Reduzido de 36px
            height: 32, // Reduzido de 36px
          }}
        >
          <MenuIcon sx={{ fontSize: 18 }} /> {/* Reduzido de 20px */}
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

      {/* Menu Items */}
      <Box sx={{ flex: 1, pt: 1 }}> {/* Reduzido padding-top */}
        <List sx={{ px: collapsed ? 0.5 : 1 }}> {/* Reduzido padding horizontal */}
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Tooltip 
                key={item.text}
                title={collapsed ? item.text : ''}
                placement="right"
                arrow
              >
                <ListItem
                  component={Link}
                  to={item.path}
                  sx={{
                    borderRadius: 2, // Reduzido de 3
                    mb: 0.5, // Reduzido de 1
                    px: collapsed ? 0.5 : 1, // Reduzido padding horizontal
                    py: 1, // Mantido, mas pode ajustar se necessário
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    backgroundColor: active 
                      ? 'rgba(255, 255, 255, 0.15)' 
                      : 'transparent',
                    backdropFilter: active ? 'blur(10px)' : 'none',
                    border: active 
                      ? '1px solid rgba(255, 255, 255, 0.2)' 
                      : '1px solid transparent',
                    '&:hover': {
                      backgroundColor: active 
                        ? 'rgba(255, 255, 255, 0.2)' 
                        : 'rgba(255, 255, 255, 0.1)',
                      transform: collapsed ? 'scale(1.1)' : 'translateX(4px)',
                      backdropFilter: 'blur(10px)',
                    },
                    cursor: 'pointer',
                    textDecoration: 'none',
                    minHeight: '40px', // Reduzido de 48px
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: 'white',
                      minWidth: collapsed ? 'auto' : 32, // Reduzido de 40px
                      justifyContent: 'center',
                      opacity: active ? 1 : 0.8,
                      transform: active ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!collapsed && (
                    <>
                      <ListItemText
                        primary={item.text}
                        sx={{
                          '& .MuiListItemText-primary': {
                            color: 'white',
                            fontWeight: active ? '600' : '500',
                            fontSize: '14px', // Reduzido de 16px
                            opacity: active ? 1 : 0.9,
                            transition: 'all 0.3s ease',
                            whiteSpace: 'nowrap',
                          },
                        }}
                      />
                      {active && (
                        <Box
                          sx={{
                            width: 3, // Reduzido de 4px
                            height: 20, // Reduzido de 24px
                            backgroundColor: 'white',
                            borderRadius: 2,
                            ml: 0.5, // Reduzido de 1
                          }}
                        />
                      )}
                    </>
                  )}
                  {collapsed && active && (
                    <Box
                      sx={{
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 2, // Reduzido de 3px
                        height: '70%', // Reduzido de 80%
                        backgroundColor: 'white',
                        borderRadius: '2px 0 0 2px',
                      }}
                    />
                  )}
                </ListItem>
              </Tooltip>
            );
          })}
        </List>
      </Box>

      {/* Footer da Sidebar */}
      {!collapsed && (
        <Box
          sx={{
            p: 2, // Reduzido de 3
            mt: 'auto',
            opacity: collapsed ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
        >
          <Box
            sx={{
              p: 1.5, // Reduzido de 2
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 2, // Reduzido de 3
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography
              sx={{
                color: 'white',
                fontSize: '11px', // Reduzido de 12px
                opacity: 0.8,
                textAlign: 'center',
                lineHeight: 1.3, // Reduzido de 1.4
                whiteSpace: 'nowrap',
              }}
            >
              Organize seus estudos
              <br />
              de forma eficiente
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;