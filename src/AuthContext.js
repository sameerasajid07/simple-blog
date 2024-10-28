// AuthContext.js
import React, { useContext, useState, useEffect, createContext } from 'react';
import { auth } from './firebase'; // Ensure 'auth' is exported correctly from firebase.js
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Create the AuthContext
const AuthContext = createContext();

// Custom Hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Listen to Firebase Auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return unsubscribe; // Cleanup subscription on unmount
    }, []);

    // Signup function
    const signup = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Signup Error:", error.message);
            throw error; // Rethrow the error to handle it in the component
        }
    };

    // Signin function
    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Signin Error:", error.message);
            throw error; // Rethrow the error to handle it in the component
        }
    };

    // Signout function
    const signout = async () => {
        try {
            await signOut(auth);
            setUser(null); // Reset user state
        } catch (error) {
            console.error("Signout Error:", error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Optional loading state
    }

    return (
        <AuthContext.Provider value={{ user, signup, login, signout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext; // Default export for the context
