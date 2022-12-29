import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';


function ResponsiveAppBar() {


    const { user, logout } = React.useContext(AuthContext);

    const handleLogout = () => {
        logout()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
   
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
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
                        STMT
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
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
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="left">
                                    {
                                        user?.uid ?
                                            <>
                                                <li><Link to={`/add-task`}  >Add Task</Link></li>
                                                <li><Link to={`/my-tasks`}  >My Tasks</Link></li>
                                                <li><Link to={`/completed-tasks`} >Completed Tasks</Link></li>
                                                <li><button onClick={handleLogout}>Logout</button></li>

                                            </>
                                            :
                                            <>
                                                <li><Link to='/' >Login</Link></li>
                                                <li><Link to='/signup'>Sign Up</Link></li>
                                            </>
                                    }
                                </Typography>
                            </MenuItem>

                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
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
                        STMT
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            {
                                user?.uid ?
                                    <>
                                        <Link to={`/add-task`} className='mx-2' >Add Task</Link>
                                        <Link to={`/my-tasks`} className='mx-2' >My Tasks</Link>
                                        <Link to={`/completed-tasks`} className='mx-2' >Completed Tasks</Link>
                                        <button onClick={handleLogout}>LOGOUT</button>

                                    </>
                                    :
                                    <>
                                        <Link to='/' className='mx-2'>Login</Link>
                                        <Link to='/signup'>Sign Up</Link>
                                    </>
                            }

                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;