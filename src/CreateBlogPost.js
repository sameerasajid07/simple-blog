import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';
import { useAuth } from './AuthContext';
import { Button, TextField, Typography, Container, Snackbar } from '@mui/material';

const CreateBlogPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const { user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, 'blogPosts'), {
                title,
                content,
                userId: user.uid,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            // Reset form fields after successful submission
            setTitle('');
            setContent('');
            setSnackbarOpen(true); // Show success message
        } catch (error) {
            console.error("Error adding document: ", error);
            setErrorMessage("Error adding document: " + error.message);
            setSnackbarOpen(true); // Show error message
        }
    };

    return (
        <Container sx={{ marginTop: 4, backgroundColor: '#f9f9f9', padding: 4, borderRadius: '8px' }}>
            <Typography variant="h4" gutterBottom>Create a New Blog Post</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                    required
                    margin="normal"
                    sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Create Blog Post
                </Button>
            </form>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={errorMessage || "Blog post created successfully!"}
            />
        </Container>
    );
};

export default CreateBlogPost;

