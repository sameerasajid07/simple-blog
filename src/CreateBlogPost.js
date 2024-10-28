import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';
import { useAuth } from './AuthContext';
import { Button, TextField, Typography, Container } from '@mui/material';

const CreateBlogPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
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

            setTitle('');
            setContent('');
        } catch (error) {
            console.error("Error adding document: ", error);
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
        </Container>
    );
};

export default CreateBlogPost;

