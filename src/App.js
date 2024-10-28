import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateBlogPost from './CreateBlogPost'; 
import UserBlogPosts from './UserBlogPosts'; 
import PublicBlogView from './PublicBlogView'; // Public view for all users
import Login from './Login'; // Your login component
import Register from './Register'; // Your register component
import { AuthProvider } from './AuthContext'; // Importing AuthProvider for authentication context
import Navigation from './Navigation'; // Optional: Create a Navigation component for easy navigation
import ProtectedRoute from './ProtectedRoute'; // ProtectedRoute for route protection

const App = () => {
    return (
        <AuthProvider>
            <Router>
                {/* Optional: Navigation component for better UX */}
                <Navigation />
                <Routes>
                    <Route path="/" element={<PublicBlogView />} /> {/* Home page with public blogs */}
                    <Route path="/login" element={<Login />} /> {/* Login page */}
                    <Route path="/register" element={<Register />} /> {/* Registration page */}
                    
                    {/* Protected routes for creating blog post and viewing user posts */}
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
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
