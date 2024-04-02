import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Footer = () => {
  const footerStyle = {
    position: 'fixed',
    bottom: 0,
    backgroundColor: '#1976d2',
    color: '#fff',
    width: '100%',
    transition: 'background-color 0.5s ease',
  };

  return (
    <AppBar position="static" style={footerStyle}>
      <Toolbar>
        <Typography variant="body1" sx={{ flexGrow: 1, cursor: "pointer" }}
          onMouseOver={(e) => {e.target.style.backgroundImage = "linear-gradient(to right, #1565c0, #42a5f5)"}}
          onMouseOut={(e) => {e.target.style.backgroundImage = "none"}}
        >
          © {new Date().getFullYear()} Banque Numérique. Tous droits réservés.
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;