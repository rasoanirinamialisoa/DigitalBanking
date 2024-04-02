import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Menu, MenuItem, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLeftSectionOpen, setIsLeftSectionOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleDrawerToggle = () => {
    setIsLeftSectionOpen(!isLeftSectionOpen);
  };

  const handleCloseLeftSection = () => {
    setIsLeftSectionOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Banque Numérique
          </Typography>
          <IconButton color="inherit" aria-label="notifications">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" aria-label="account" onClick={handleMenuOpen}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Mon Profil</MenuItem>
            <MenuItem onClick={handleMenuClose}>Paramètres</MenuItem>
            <MenuItem onClick={handleLoginLogout}>{isLoggedIn ? 'Déconnexion' : 'Connexion'}</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={isLeftSectionOpen}
        onClose={handleCloseLeftSection}
      >
        <List>
          <ListItem button>
            <ListItemIcon>
              <AccountBalanceIcon />
            </ListItemIcon>
            <ListItemText primary="Balance" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Faire un dépôt" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <TransferWithinAStationIcon />
            </ListItemIcon>
            <ListItemText primary="Faire un transfert" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary="Relevés de compte" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Mon Compte" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Header;
