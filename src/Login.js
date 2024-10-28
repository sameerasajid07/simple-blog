// Login.js
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate(); // For redirection

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            await login(email, password);
            navigate('/'); // Redirect to home after successful login
        } catch (error) {
            console.error("Login Error:", error.message);
            alert("Login failed: " + error.message); // Show error message
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;


