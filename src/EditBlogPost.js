// EditBlogPost.js
import React, { useState, useEffect } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { useAuth } from './AuthContext';
import { Button, TextField, Typography, Container, Snackbar } from '@mui/material';

const EditBlogPost = ({ post, onClose, onPostUpdated }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setContent(post.content);
        }
    }, [post]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (post.userId !== user.uid) {
            setErrorMessage("You are not authorized to edit this post.");
            setSnackbarOpen(true);
            return;
        }

        try {
            await updateDoc(doc(db, 'blogPosts', post.id), {
                title,
                content,
                updatedAt: new Date(),
            });
            const updatedPost = { ...post, title, content }; // Create updated post object
            onPostUpdated(updatedPost); // Call the callback with the updated post
        } catch (error) {
            console.error("Error updating document: ", error);
            setErrorMessage("Error updating document: " + error.message);
            setSnackbarOpen(true);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Edit Blog Post</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
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
                />
                <Button type="submit" variant="contained" color="primary">
                    Update Blog Post
                </Button>
                <Button onClick={onClose} color="secondary" style={{ marginLeft: '10px' }}>
                    Cancel
                </Button>
            </form>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={errorMessage}
            />
        </Container>
    );
};

export default EditBlogPost;
