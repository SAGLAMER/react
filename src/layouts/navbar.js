import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, makeStyles } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

const Navbar = (props) => {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        localStorage.removeItem('user');
        props.setUserState();
        setAnchorEl(null);
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.menubackgroud}>
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        LOGIN
                    </Typography>
                    {auth && (
                        <div>
                            <IconButton
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
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem>PROFIL</MenuItem>
                                <MenuItem className={classes.logout} onClick={handleClose}>LOGOUT</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: { flexGrow: 1 },
    menubackgroud: { color: 'black', background: 'linear-gradient(45deg, #00ff80 30%, #00e8ff 90%)' },
    title: { flexGrow: 1, color: 'black' },
    logout: { color: 'red' },
}));

export default Navbar;
