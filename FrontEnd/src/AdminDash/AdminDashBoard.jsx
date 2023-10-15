import React, { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import UserDetails from '../DashBoard/UserDetails';
import { mainListItems } from './listItems';
import LogoutIcon from '@mui/icons-material/Logout';
import ApexChart from '../DashBoard/ApexChart';
import CustomerList from './CustomerList';
import { useNavigate } from 'react-router-dom';
import AdminLogin from '../AdminAuth/AdminLogin';

const Stats = () => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Statistics
      </Typography>
        
    </div>
  );
};

const UserCRUD = () => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        User CRUD
      </Typography>
      {/* Add content for user CRUD */}
    </div>
  );
};

const logout = () => {
    localStorage.clear();
    Nav("/")
}

export default function AdminDashboard() {
  const Nav = useNavigate();
  const [open] = React.useState(true);
  const [showUserDetails, setShowUserDetails] = useState(true); // Set this to true to show UserDetails by default
  const [showStats, setShowStats] = useState(false);
  const [showUserCRUD, setShowUserCRUD] = useState(false);

  const handleToggleView = (view) => {
    setShowUserDetails(view === 'details');
    setShowStats(view === 'stats');
    setShowUserCRUD(view === 'crud');
  };


  const logout = () => {
    localStorage.clear();
    Nav("/")
  }

  const isAdmin = localStorage.getItem('role') == 'ADMIN';
  return (
    <>
    {!isAdmin ? (
         <p>
            <AdminLogin/>
        </p>
      ) : (
    <ThemeProvider theme={createTheme()}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <MuiAppBar
          position="absolute"
          open={open}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            width: (theme) => (open ? `calc(100% - ${240}px)` : '100%'),
            transition: (theme) =>
              theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
          }}
        >
          <Toolbar
            sx={{
              pr: '24px',
              ...(open && {
                transition: (theme) =>
                  theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                  }),
              }),
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => {}}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Admin Dashboard
            </Typography>
            <IconButton color="inherit" onClick={logout}>
              <Badge color="secondary">
                <LogoutIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </MuiAppBar>
        <MuiDrawer
          variant="permanent"
          open={open}
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              ...(open && {
                transition: (theme) =>
                  theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
              }),
            },
          }}
        >
          <Toolbar>
            <Divider />
            <List component="nav">
              {mainListItems({ onToggleView: handleToggleView })}
            </List>
          </Toolbar>
        </MuiDrawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {showUserDetails && <UserDetails />}
              {showStats && <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <ApexChart />
                </Paper>
              </Grid>}
              {showUserCRUD && <CustomerList />}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
      )}
    </>
  );
}
