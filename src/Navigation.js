// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import { useAuth } from './AuthContext';

const Navigation = () => {
    const { user, signout } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" component={Link} to="/">Home</Button>
                {!user ? (
                    <>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/register">Register</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/create">Create Post</Button>
                        <Button color="inherit" component={Link} to="/my-posts">My Posts</Button>
                        <Button color="inherit" onClick={signout}>Logout</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navigation;
