// EditBlogPost.js
import React, { useState, useEffect } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase'; // Adjust the path according to your folder structure
import { useAuth } from './AuthContext'; // Assuming you have an AuthContext
import { Button, TextField, Typography, Container } from '@mui/material';

const EditBlogPost = ({ post, onClose, onPostUpdated }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { user } = useAuth(); // Get the authenticated user

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setContent(post.content);
        }
    }, [post]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateDoc(doc(db, 'blogPosts', post.id), {
                title,
                content,
                updatedAt: new Date(),
            });
            onPostUpdated(); // Callback to refresh the list
            onClose(); // Close the modal after updating
        } catch (error) {
            console.error("Error updating document: ", error);
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
        </Container>
    );
};

export default EditBlogPost;
