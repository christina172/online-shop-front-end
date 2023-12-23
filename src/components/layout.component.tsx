import React, {ReactNode, useState} from 'react';
import { NavLink } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';

import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LoginIcon from '@mui/icons-material/Login';
import CategoryIcon from '@mui/icons-material/Category';

import BrandIconSvg from './brand-icon-svg.component';

import { useAuthSelector } from 'app/auth/store/auth.selectors';


type Props = {children: ReactNode;}

const Layout = ({children}: Props) => {
  const categories = ['Acrylics', 'Oils', 'Tempera', 'Watercolours', 'Watercolour pencils', 'Graphite pencils'];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const {tokens} = useAuthSelector();

  const toggleCategoriesOpen = () => {
    setCategoriesOpen(!categoriesOpen);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setDrawerOpen(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
    >
      <List sx={{pt: 0}} disablePadding>
        <ListItem 
          key={'Artistic Touch'} 
          disablePadding 
          sx={{
            bgcolor: 'primary.main', 
            justifyContent: 'flex-start', 
            gap: '0',
            height: 48
          }}
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <ListItemButton>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, color: 'common.white' }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <BrandIconSvg />
            <Typography variant="h6" component={NavLink} to='/products?page=1' sx={{color: 'common.white', textDecoration: 'none'}}>
              Artistic Touch
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem key='Categories' disablePadding >
          <ListItemButton onClick={toggleCategoriesOpen}>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary={'Categories'} />
            {categoriesOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={categoriesOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem 
            key={'View all products'} 
            disablePadding
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
              <ListItemButton component={NavLink} to='/products?page=1'>
                <ListItemText primary={'View all products'} />
              </ListItemButton>
          </ListItem>
          <Divider />
          {categories.map((text) => (
          <ListItem 
            key={text} 
            disablePadding
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <ListItemButton component={NavLink} to={`/products?category=${encodeURIComponent(text)}&page=1`}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        </List>
        </Collapse>
      </List>
      <Divider />
        <List
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <ListItem key={"sign_up"} disablePadding>
            <ListItemButton component={NavLink} to='/auth/sign_up'>
              <ListItemIcon>
                <PersonAddAlt1Icon />
              </ListItemIcon>
              <ListItemText primary={"Sign up"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"log_in"} disablePadding>
            <ListItemButton component={NavLink} to='/auth/log_in'>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary={"Log in"} />
            </ListItemButton>
          </ListItem>
        </List>
    </Box>
  );

  return (
    <div className="root">
      <AppBar position="sticky">
        <Toolbar variant="dense">
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          {list()}
        </Drawer>
        <BrandIconSvg />
        <Typography 
          variant="h6" 
          component={NavLink} 
          to='/products?page=1' 
          sx={{ flexGrow: 1, color: 'common.white', textDecoration: 'none' }}
        >
          Artistic Touch
        </Typography>
          {localStorage.getItem('os_access_token')
          ? 
          (<div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={NavLink} to='/user/cart'>Cart</MenuItem>
              <MenuItem onClick={handleClose} component={NavLink} to='/user/order_history'>Order History</MenuItem>
              <Divider />
              <MenuItem onClick={handleClose} component={NavLink} to='/auth/log_out'>Log out</MenuItem>
            </Menu>
          </div>)
          : <></>
          }
        </Toolbar>
      </AppBar>
      <Box component='main' sx={{p: '20px'}}>
      {children}
      </Box>
    </div>
    
  )
};

export default Layout;