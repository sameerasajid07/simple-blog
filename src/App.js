// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CreateBlogPost from './CreateBlogPost';
import UserBlogPosts from './UserBlogPosts';
import PublicBlogView from './PublicBlogView';
import Login from './Login';
import Register from './Register';
import { AuthProvider, useAuth } from './AuthContext';
import Navigation from './Navigation';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navigation />
                <Routes>
                    <Route path="/" element={<PublicBlogView />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/create" element={
                        <ProtectedRoute>
                            <CreateBlogPost />
                        </ProtectedRoute>
                    } />
                    <Route path="/my-posts" element={
                        <ProtectedRoute>
                            <UserBlogPosts />
                        </ProtectedRoute>
                    } />
                    {/* Redirect any unknown routes to home */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
