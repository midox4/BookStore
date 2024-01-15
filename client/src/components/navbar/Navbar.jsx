import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useContext, useState } from 'react';
import Api from '../../Api/axios';
import { Link } from 'react-router-dom';
import { Context } from '../../CONTEXT_API/ContextApi';

const pages = ['Profile', 'Books', 'Github'];
const Navbar = () => {

  const {user} = useContext(Context)
  const logout = async() => {
    Api.post('/USER/LOGOUT').then((res)=> {
    console.log(res.data)
    window.location.href = "/"
    }
    )
  }

    
      const [anchorElNav, setAnchorElNav] = useState(null);
      const [anchorElUser, setAnchorElUser] = useState(null);

    
      const handleCloseNavMenu = () => {
        setAnchorElNav(null);
      };
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };

    
      return (
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <MenuBookIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                BOOK STORE
              </Typography>
    
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                //   onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <MenuBookIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                LOGO
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Link to={`/profile/${user._id}`}>
                    <Button
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {pages[0]}
                  </Button>
                </Link>
                <Link to='/book'>
                    <Button
                    sx={{ my: 2, color: 'white', display: 'block',textDecoration: 'none' }}
                  >
                    {pages[1]}
                  </Button>
                </Link>
                <Link to='https://github.com/midox4'>
                    <Button
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {pages[2]}
                  </Button>
                </Link>
              </Box>
    
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                   <Typography sx={{display:'flex' ,gap:'10px', flexDirection:'row', alignItems:'center'}}>
                    <Typography>Hi,{user?.FirstName} {user?.LastName}</Typography>
                     <Button sx={{color:'white',fontWeight:'700'}} onClick={logout}>
                        Logout
                        </Button >
                        <Link to={`/profile/${user?._id}`} >
                    <IconButton
                  sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp"
                     src={user ? `http://localhost:5001/images/${user?.Photo}` 
                     : 
                     "http://localhost:5001/images/userphoto.png" }
                   />
                  </IconButton>
                        </Link>
                    </Typography> 
               
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      );
    }

export default Navbar



