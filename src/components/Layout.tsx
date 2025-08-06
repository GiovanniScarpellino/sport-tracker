
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button, CssBaseline } from '@mui/material';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Sport Tracker
            </RouterLink>
          </Typography>
          <Button color="inherit" component={RouterLink} to="/exercises">
            Exercises
          </Button>
          <Button color="inherit" component={RouterLink} to="/sessions">
            Sessions
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        {children}
      </Box>
    </>
  );
};

export default Layout;
